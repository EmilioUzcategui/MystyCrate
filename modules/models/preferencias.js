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

export class PreferenciasModel {
    static async create (input){
        const{
            preferenciaid,
            categoria,
            nivelpreferencia,
            usuarioId
        } = input

        try {
            await connection.query(
                `INSERT INTO preferencias (preferencia_id, categoria, nivel_preferencia, usuario_id)
                VALUES (?,?,?,?)`,
                [preferenciaid, categoria, nivelpreferencia, usuarioId]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error creating preferencia')
        }
    }

    static async findPreferencia (input){
        const { preferencia_id } = input
        try {
            const [rows] = await connection.query('SELECT * FROM preferencias WHERE preferencia_id = ?', [preferencia_id])
            return rows[0]
        } catch (e) {
            console.log(e)
            throw new Error('Error finding preferencia')
        }
    }

    static async findAll (){
        try {
            const [rows] = await connection.query('SELECT * FROM preferencias')
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error finding all preferencias')
        }
    }

    static async update (input){
        const {
            preferenciaid,
            categoria,
            nivelpreferencia,
            usuarioId
        } = input

        try {
            await connection.query(
                `UPDATE preferencias SET categoria = ?, nivel_preferencia = ?, usuario_id = ?
                WHERE preferencia_id = ?`,
                [categoria, nivelpreferencia, usuarioId, preferenciaid]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error updating preferencia')
        }
    }

    static async delete (input){
        const { preferencia_id } = input
        try {
            await connection.query('DELETE FROM preferencias WHERE preferencia_id = ?', [preferencia_id])
        } catch (e) {
            console.log(e)
            throw new Error('Error deleting preferencia')
        }
    }
}