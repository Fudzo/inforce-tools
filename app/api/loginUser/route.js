import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { runQuery } from "@/app/actions/db";
import { generateOTP } from "@/app/actions/utils";



export const revalidate = 0;


export async function POST(request, res) {
    try {
        let response;

    const { email, otp } = await request.json()

    const user = await runQuery(`SELECT * FROM users WHERE email = '${email}'`)

    const { otp: otp_number, status, role, otp_valid_until, first_name, last_name } = user[0];

    if (status !== 'ACTIVE') {
        return NextResponse.json({
            success: false,
            message: 'User does not have an access to this page!'
        })
    }

    // const otpValid = authenticator.check(otp, otp_secret)
    const otpExpired = new Date(otp_valid_until).getTime() - new Date().getTime() < 0;
    const otpValid = otp_number === otp && !otpExpired;
    await runQuery(`UPDATE users set otp = '${generateOTP()}' where email = '${email}'`);
    if (otpValid) {
        const token = jwt.sign({ email, role }, process.env.JWT_SECRET, { expiresIn: '30d', algorithm: 'HS256' });
        response = {
            success: true,
            message: 'User login successful',
            token,
            role,
            email,
            first_name,
            last_name
        } 
    } else {
        response = {
            success: false,
            message: 'OTP has expired, please request a new one!'
        }
    }
    return NextResponse.json(response)
    } catch (error) {
        response = {
            success: false,
            message: 'Something went wrong!'
        }
        return NextResponse.json(response)
    }
}

export async function GET(request, response) {

    return NextResponse.json({ radiii: true })
}