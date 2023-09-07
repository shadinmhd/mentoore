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

const getOtp = (email: any) => {
    try {
        const otp = generateOTP()

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "shadinmhd97@gmail.com",
                pass: "jmchhyeeffduhqmx"
            }
        })

        const mail = {
            from: "shadin@gmail.com",
            to: email,
            subject: "otp for mentoore",
            html: `<!DOCTYPE html>
            <html>
            
            <head>
                <title>Mentoore</title>
            </head>
            
            <body style="display:flex ; align-items: center; justify-content: center;">
                <div style="font-family: sans-serif;" class="container">
                    <h1>Mentoore</h1>
                    <p>Your one-time password is: </p>
                    <button id="otp">${otp}</button>
                    <p>Please use this code to verify your account.</p>
                    <p>This code will expire in 5 minutes.</p>
                </div>
                <script>
                    document.getElementById("id").addEventListener("click", function () {
                        let otp = this.textContent
                        navigator.clipboard.writeText(otp)
                    })
                </script>
            </body>
            
            </html>`
        }

        transporter.sendMail(mail, (err, inf) => {
            if (err) {
                console.log(err)
            }
        })

        return otp
    } catch (err) {
        console.log(err)
    }
}

export default getOtp 
