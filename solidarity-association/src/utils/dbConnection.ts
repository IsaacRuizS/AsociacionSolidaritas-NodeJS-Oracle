import oracledb from 'oracledb';
import dotenv from 'dotenv';
dotenv.config();


export default async function dbConnection() {

    const connection = await oracledb.getConnection ({
        user          : process.env.DB_USER,
        password      : process.env.DB_PASS,
        connectString : process.env.DB_HOST
    });

    const result = await connection.execute(
        `SELECT * FROM ESPECIES`,
    );

    console.log(result.rows);
    await connection.close();
}