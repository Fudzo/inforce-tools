import { NextResponse } from "next/server";
import validator from "validator";
import { totp, authenticator } from 'otplib'
import { sendEmail } from '../../actions/email'

export const revalidate = 0;

export async function POST(request, res) {

    const queryParams = request.nextUrl.searchParams;
    const email = queryParams.get('email');

    if(!email) {
        return NextResponse.json({ success: false, message: 'Please provide an email address!'})
    }

    const isEmail = validator.isEmail(email);

    let response;

    if(!isEmail) {
        response = {
            success: false,
            message: 'Please enter an email address!'
        }
    } else {
        const otp = totp.generate(process.env.OTP_SECRET);
        const emailRes = await sendEmail(email, otp)
        response = {
            success: true,
            email: emailRes
        }
    }

    return NextResponse.json(response)
}