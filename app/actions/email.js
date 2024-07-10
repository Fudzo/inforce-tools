
import nodemailer from 'nodemailer';

export async function sendEmail(receiver, otp, user = {
    newUser: true,
    name: ''
}) {

    return new Promise((resolve, reject) => {
        const myEmail = 'no-reply@inforcetools.store';
        let html;
        const footer = `
            <div class="footer">
            <p>&copy; 2024 Inforce Tools. All rights reserved.</p>
        </div>
    `
        const head = `
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your OTP Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            // background-color: #f4f4f4;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .content {
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #666666;
        }
    </style>
</head>
    `

        if (user.newUser) {
            html = `
        <!DOCTYPE html>
<html lang="en">
${head}
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome to Inforce Tools</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>Your OTP is: <strong>${otp}</strong> and it is valid for 10 minutes!</p>
            <p>For the first time you log in, you will be asked to enter your First and Last name. This is a one-time requirement.</p>
            <p>Your session will be valid for 30 days. After 30 days, you will be required to log in again using an OTP.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
        </div>
        ${footer}
    </div>
</body>
</html>
        `
        } else {
            html = `
<!DOCTYPE html>
<html lang="en">
${head}
<body>
    <div class="email-container">
        <div class="header">
            <h1>Welcome back!</h1>
        </div>
        <div class="content">
            <p>Hello ${user.name},</p>
            <p>Your OTP is: <strong>${otp}</strong> and it is valid for 10 minutes!</p>
            <p>Your session is valid for 30 days. After 30 days, you will be required to log in again using an OTP.</p>
            <p>If you did not request this OTP, please ignore this email.</p>
        </div>
        ${footer}
    </div>
</body>
</html>
        `
        }

        let transporter = nodemailer.createTransport({
            host: 'mail.inforcetools.store',
            port: 587,
            secure: false,
            auth: {
                user: myEmail,
                pass: 'core2quad',
            },
            tls: {
                // Do not fail on invalid certs
                rejectUnauthorized: false,
            },
        });

        let mailOptions = {
            from: `"Inforce Tools" ${myEmail}`,
            to: receiver,
            subject: 'Inforce tools - Authentication required!',
            html: html,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject({
                    success: false,
                    message: error
                });
            } else {
                resolve({
                    success: true,
                    message: `Message sent: %s, ${info.messageId}`
                });
            }
        });
    })

}
