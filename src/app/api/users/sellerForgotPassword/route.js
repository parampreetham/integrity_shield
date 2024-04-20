import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/sellerModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/sellerMailer";
import bcryptjs from "bcryptjs"


connect();



export async function POST(request) {
  

  const reqBody = await request.json();
  const { email, token, password } = reqBody;

  if (email) {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return NextResponse.json({ error: "User not Found" }, { status: 400 });
      }

      await sendEmail({
        email,
        emailType: "sRESET",
        userId: user._id,
      });
      return NextResponse.json({
        message: "Password Reset Email Sent Successfully",
        success: true,
        user,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }else if (token) {
    try {
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        const salt = await bcryptjs.genSalt(10);
        const newHashedPassword = await bcryptjs.hash(password,salt);

        user.password = newHashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined; 
        await user.save();
        
        return NextResponse.json({
            message: "password reset successful",
            success: true
        })


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
  }
}