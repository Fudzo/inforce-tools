import mysql from 'mysql2/promise';

export async function runQuery(query) {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'core2quad',
            database: 'inftools'
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

