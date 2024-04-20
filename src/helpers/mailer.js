import nodemailer from 'nodemailer';
import Manufacturer from "@/models/manufacturerModel";
import Seller from "@/models/sellerModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "mVERIFY") {
            await Manufacturer.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "mRESET") {
            await Manufacturer.findByIdAndUpdate(userId,
                { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });


        const mailOptions = {
            from: "parampreetham@gmail.com",
            to: email,
            subject:
                emailType === "mVERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN
                }/${emailType === "mVERIFY" ? "ManufacturerVerifyEmail" : "ManufacturerForgotPassword"}?token=${hashedToken}">here</a> to ${emailType === "mVERIFY" ? "verify your email" : "reset your password"
                }
                  or copy and paste the link below in your browser. <br> ${process.env.DOMAIN
                }/${emailType === "mVERIFY" ? "ManufacturerVerifyEmail" : "ManufacturerForgotPassword"}?token=${hashedToken}
                  </p>`,
        };

        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}