import nodemailer from 'nodemailer';
import Seller from "@/models/sellerModel";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }) => {
    try {
        // create a hased token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if (emailType === "sVERIFY") {
            await Seller.findByIdAndUpdate(userId,
                { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "sRESET") {
            await Seller.findByIdAndUpdate(userId,
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
                emailType === "sVERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN
                }/${emailType === "sVERIFY" ? "SellerVerifyEmail" : "SellerForgotPassword"}?token=${hashedToken}">here</a> to ${emailType === "sVERIFY" ? "verify your email" : "reset your password"
                }
                  or copy and paste the link below in your browser. <br> ${process.env.DOMAIN
                }/${emailType === "sVERIFY" ? "SellerVerifyEmail" : "SellerForgotPassword"}?token=${hashedToken}
                  </p>`,
        };

        const mailresponse = await transport.sendMail
            (mailOptions);
        return mailresponse;

    } catch (error) {
        throw new Error(error.message);
    }
}