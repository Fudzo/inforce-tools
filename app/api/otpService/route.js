import { NextResponse } from "next/server";
import validator from "validator";
import { authenticator, totp } from 'otplib';
import { sendEmail } from '../../actions/email';
import { runQuery } from "@/app/actions/db";
import { generateOTP } from "@/app/actions/utils";

export const revalidate = 0;

totp.options = {
    step: 600
}

async function checkDomain(email = 'example@example.com') {
    try {
        const domain = email.split('@')[1].toLowerCase().trim();
        const queryDomain = await runQuery(`Select name from allowed_domains where name = '${domain}'`)
        return queryDomain.length > 0
    } catch (error) {
        throw new Error(error)
    }
}

export async function POST(request, res) {

    const queryParams = request.nextUrl.searchParams;
    const email = queryParams.get('email');

    if (!email) {
        return NextResponse.json({ success: false, message: 'Please provide an email address!' })
    }

    const isEmail = validator.isEmail(email);

    let response;

    if (!isEmail) {
        response = {
            success: false,
            message: 'Please enter an email address!'
        }
    } else {
        try {
            if (!await checkDomain(email)) {
                response = {
                    success: false,
                    message: 'That domain is now allowed!'
                }
            } else {
                const secret = authenticator.generateSecret();
                const newUser = await runQuery(`SELECT first_name, last_name FROM users where email = '${email}'`);
                const otp = generateOTP();

                if (newUser.length === 0) { // if lenght is 0, it's a new user. Generate OTP SECRET key and store it in DB.
                    await runQuery(`INSERT INTO users (email, otp, otp_valid_until) VALUES ('${email}', '${otp}', DATE_ADD(NOW(), INTERVAL 10 MINUTE))`);
                    await sendEmail(email, otp);
                } else {
                    await runQuery(`UPDATE USERS SET otp = '${otp}', otp_valid_until =  DATE_ADD(NOW(), INTERVAL 10 MINUTE) WHERE email = '${email}'`);
                    await sendEmail(email, otp, {
                        newUser: false,
                        name: `${newUser[0].first_name} ${newUser[0].last_name}`
                    });
                }
                response = {
                    success: true,
                    message: `An OTP has been sent to ${email}`
                }
            }
        } catch (error) {
            response = {
                success: false,
                message: 'Something went wrong!'
            }
        }
    }

    return NextResponse.json(response)
}