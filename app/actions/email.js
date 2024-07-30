
import nodemailer from 'nodemailer';
import { generateBody, generateHTML } from './utils';

export async function sendEmail(receiver, otp, user = {
    newUser: true,
    name: ''
}) {

    return new Promise((resolve, reject) => {
        let html = '';
        let body = '';

        if (user.newUser) {
            body = generateBody({ otp, newUser: true });
        } else {
            body = generateBody({ otp, newUser: false, userName: user.name });
        }

        html = generateHTML(body);

        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                // Do not fail on invalid certs
                rejectUnauthorized: false,
            },
        });

        let mailOptions = {
            from: `"Inforce Tools" ${process.env.EMAIL}`,
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
