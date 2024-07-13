import { NextResponse } from "next/server";
import { runQuery, updateQuery } from "@/app/actions/db";

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

    // console.log(tool)

    let response;

    try {

        const [{id: platformId}] = await runQuery(`Select id from platforms where platform_name = '${tool.platform_name}'`)

        console.log(tool)

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

        console.log(updateStatement)
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