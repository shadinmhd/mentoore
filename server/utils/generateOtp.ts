import otpModel from "../models/otpModel";
import nodemailer from "nodemailer"

function generateOTP() {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits[randomIndex];
    }

    return otp;
}

const getOtp = (email: string) => {
    try {
        const otp = new otpModel({
            otp: generateOTP()
        })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "shadinmhd97@gmail.com",
                pass: "njjmojfmbbacjnay"
            }
        })

        const mail = {
            from: "shadin@gmail.com",
            to: email,
            subject: "otp for mentoore",
            text:
                `\n
                otp for registering to mentoore\n
                ${otp}
            `
        }

        transporter.sendMail(mail, (err, inf) => {
            if (err) {
                console.log(err)
            } else {
                console.log(inf)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export default generateOTP
