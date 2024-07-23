import { NextResponse } from "next/server";
import { runQuery, updateQuery } from "@/app/actions/db";
import { cookies } from "next/headers";
import { jwtVerify } from 'jose';

export const revalidate = 0;

// Used for getting all tools
export async function GET(request, res) {

    let response;

    try {
        const tools = await runQuery('SELECT * FROM VW_TOOLS');
        response = {
            success: true,
            tools
        }
    } catch (error) {
        response = {
            success: false,
            message: error.message
        }
    }

    return NextResponse.json(response)
}

// Used for updating tools
export async function POST(request, res) {
    
    const tool = await request.json();
    const cookieStore = cookies();
    const jwtToken = cookieStore.get('jwt_token')?.value;

    let response;

    try {
        const { payload } = await jwtVerify(jwtToken, new TextEncoder().encode(process.env.JWT_SECRET));
        if(!payload.role.includes('ADMIN')) {
            return NextResponse.json({
                success: false,
                message: 'Not authorized!'
            })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Your session has expired, please login!'
        })
    }

    try {

        const [{ id: platformId }] = await runQuery(`Select id from platforms where platform_name = '${tool.platform_name}'`)

        const updateStatement = `
        UPDATE tools SET
            name = ?,
            description = ?,
            developer = ?,
            platform = ?,
            stack = ?,
            \`usage\` = ?,
            download_url = ?
        WHERE id = ?
        `
        const values = [,
            tool.name,
            tool.description,
            tool.developer,
            platformId,
            tool.stack,
            tool.usage,
            tool.download_url,
            tool.id
        ]

        await updateQuery(updateStatement, values)

        response = {
            success: true,
            message: `${tool.name} has been updated!`
        }
    } catch (error) {
        console.log(error.message)
        response = {
            success: false,
            message: 'Something went wrong!',
            error: error.message
        }
    }

    return NextResponse.json(response)
}


// Used for deleting tools
export async function DELETE(request, res) {
    
    const toolId = await request.json();
    const cookieStore = cookies();
    const jwtToken = cookieStore.get('jwt_token')?.value;

    try {
        const { payload } = await jwtVerify(jwtToken, new TextEncoder().encode(process.env.JWT_SECRET));
        console.log(payload)
        if(!payload.role.includes('ADMIN')) {
            return NextResponse.json({
                success: false,
                message: 'Not authorized!'
            })
        }
        await runQuery(`DELETE from TOOLS where id = ${toolId?.id}`)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }

    return NextResponse.json({ success: true })
}