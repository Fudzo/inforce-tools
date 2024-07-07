import { NextResponse } from "next/server";
import validator from "validator";
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../actions/email'

export const revalidate = 0;

const SECRET = 'Hfious3344OISDJK20dfjkwsuf2';

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
        const token = jwt.sign({
            email
        }, SECRET, { expiresIn: '30d' })
        response = {
            success: true,
            message: 'User login successful',
            token
        }
    }

    return NextResponse.json(response)
}

export async function GET(request, response) {

    return NextResponse.json({radiii: true })
}