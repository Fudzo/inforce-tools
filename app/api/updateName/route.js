import { NextResponse } from "next/server";
import { runQuery } from "@/app/actions/db";


export async function POST(request, res) {

    const { firstName, lastName, email } = await request.json();

    try {
        await runQuery(`UPDATE users SET first_name = '${firstName}', last_name = '${lastName}' WHERE email = '${email}'`)
        return NextResponse.json({ success: true })

    } catch (error) {
        return NextResponse.json({ success: false })
    }

}