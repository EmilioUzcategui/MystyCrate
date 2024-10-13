import mysql from 'mysql2/promise'
import 'dotenv/config'
console.log('hola desde el modelo')
const DBConfig = {
  host: '127.0.0.1' || process.env.DB_HOST,
  user: 'root' || process.env.DB_USERNAME,
  port: 3306 || process.env.DB_PORT,
  password: '1234' || process.env.DB_PASSWORD,
  database: 'MystyCrate' || process.env.DB_DATABASE
}

const connection = await mysql.createConnection(DBConfig)

export class CajaMisteriosaModel {
    static async create (input){
        const {
            idcajas,
            suscripcionid,
            fechaEnvio,
            estadoEnvio
        } = input

        try {
            await connection.query(
                `INSERT INTO caja_misteriosa (idcajas, suscripcion_id, fecha_envio, estado_envio)
                VALUES (?,?,?,?)`,
                [idcajas, suscripcionid, fechaEnvio, estadoEnvio]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error creating caja misteriosa')
        }
    }

    static async findCajaMisteriosa (input){
        const { idcajas } = input
        try {
            const [rows] = await connection.query('SELECT * FROM caja_misteriosa WHERE idcajas = ?', [idcajas])
            return rows[0]
        } catch (e) {
            console.log(e)
            throw new Error('Error finding caja misteriosa')
        }
    }

    static async findAll (){
        try {
            const [rows] = await connection.query('SELECT * FROM caja_misteriosa')
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error finding all cajas misteriosas')
        }
    }

    static async update (input){
        const {
            idcajas,
            suscripcionid,
            fechaEnvio,
            estadoEnvio
        } = input

        try {
            await connection.query(
                `UPDATE caja_misteriosa SET suscripcion_id = ?, fecha_envio = ?, estado_envio = ? WHERE idcajas = ?`,
                [suscripcionid, fechaEnvio, estadoEnvio, idcajas]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error updating caja misteriosa')
        }
    }

    static async delete (input){
        const { idcajas } = input
        try {
            await connection.query('DELETE FROM caja_misteriosa WHERE idcajas = ?', [idcajas])
        } catch (e) {
            console.log(e)
            throw new Error('Error deleting caja misteriosa')
        }
    }

    static async findCajaMisteriosaBySuscripcionId (input){
        const { suscripcionid } = input
        try {
            const [rows] = await connection.query('SELECT * FROM caja_misteriosa WHERE suscripcion_id = ?', [suscripcionid])
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error finding caja misteriosa by suscripcion id')
        }
    }

    static async findCajaMisteriosaByFechaEnvio (input){
        const { fechaEnvio } = input
        try {
            const [rows] = await connection.query('SELECT * FROM caja_misteriosa WHERE fecha_envio = ?', [fechaEnvio])
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error finding caja misteriosa by fecha envio')
        }
    }

    static async findCajaMisteriosaByEstadoEnvio (input){
        const { estadoEnvio } = input
        try {
            const [rows] = await connection.query('SELECT * FROM caja_misteriosa WHERE estado_envio = ?', [estadoEnvio])
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error finding caja misteriosa by estado envio')
        }
    }
}
