import oracledb from 'oracledb';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectString: process.env.DB_HOST
}
  
const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT, // devuelve resultados como objetos JS
    autoCommit: true                       // aplica automáticamente cambios (INSERT, UPDATE, etc.)
}
  
export async function runQuery(script: string, binds = {}) {
    let connection
  
    try {
      connection = await oracledb.getConnection(dbConfig)
      const result = await connection.execute(script, binds, options)
      return result
    } catch (error) {
      console.error('Error ejecutando script:', error)
      throw error
    } finally {
      if (connection) {
        try {
          await connection.close()
        } catch (closeErr) {
          console.error('Error cerrando conexión:', closeErr)
        }
      }
    }
}