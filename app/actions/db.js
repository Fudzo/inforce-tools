import mysql from 'mysql2/promise';

export async function runQuery(query) {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        const runQuery = await connection.execute(query);
        return runQuery[0];
    } catch (error) {
        throw new Error(error)
    } finally {
        try {
            if(connection) {
                await connection.end()
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export async function updateQuery(updateQuery, values) {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        })
        await connection.execute(updateQuery, values);
    } catch (error) {
        throw new Error(error)
    } finally {
        try {
            if(connection) {
                await connection.end()
            }
        } catch (error) {
            console.log(error)
        }
    }
}