import {connect} from "@/dbConfig/dbConfig";
import User from "@models/sellerModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/sellerMailer";


connect()


export async function POST(request){
    try {
        const reqBody = await request.json()
        const {mId,name,email,phoneNumber,brand,manager,sCode,address, password} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({sCode})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            mId,
            name,
            email,
            phoneNumber,
            brand,
            manager,
            sCode,
            address,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email

        await sendEmail({email, emailType: "sVERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })
        
        


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}