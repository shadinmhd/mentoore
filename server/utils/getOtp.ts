import nodemailer from "nodemailer"
import { User } from "../models/userModel";

function generateOTP() {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }

    return otp;
}

const getOtp = async (email: any) => {
    try {
        const otp = generateOTP()
        const user = await User.findOne({ email })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "shadinmhd97@gmail.com",
                pass: "qvnedkaiaeyjrpme"
            }
        })

        const mail = {
            from: "shadin@gmail.com",
            to: "shadinmhd97@gmail.com",
            subject: "otp for mentoore",
            html: `<!DOCTYPE html>
            <html>
            
            <head>
                <title>Mentoore</title>
            </head>
            
            <body style="display:flex ; align-items: center; justify-content: center;">
                <div style="font-family: sans-serif;" class="container">
                    <h1>Mentoore</h1>
                    <p>Your one-time for mentoore account verification </p>
                    <p>for user ${user?.name}</p>
                    <button id="otp">${otp}</button>
                    <p>Please use this code to verify your account.</p>
                    <p>This code will expire in 5 minutes.</p>
                </div>
                <script>
                    document.getElementById("otp").addEventListener("click", function () {
                        let otp = this.textContent
                        navigator.clipboard.writeText(otp)
                    })
                </script>
            </body>
            
            </html>`
        }

        let success: boolean = true
        transporter.sendMail(mail, (err, inf) => {
            if (err) {
                console.log(err)
                success = false
            }
        })

        return { otp, success }
    } catch (err) {
        console.log(err)
    }
}

export default getOtp 
