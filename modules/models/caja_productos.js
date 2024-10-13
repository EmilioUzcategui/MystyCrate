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

export class CajaProductosModel {

    static async create (input){
        const {
            idcajas,
            productoId,
        } = input

        try {
            await connection.query(
                `INSERT INTO caja_productos (caja_id, producto_id)
                VALUES (?,?)`,
                [idcajas, productoId]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error creating caja productos')
        }
    }

    static async findCajaProductos (input){
        const { caja_id } = input
        try {
            const [rows] = await connection.query('SELECT * FROM caja_productos WHERE caja_id = ?', [caja_id])
            return rows[0]
        } catch (e) {
            console.log(e)
            throw new Error('Error finding caja productos')
        }
    }

    static async findAll (){
        try {
            const [rows] = await connection.query('SELECT * FROM caja_productos')
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error finding all cajas productos')
        }
    }

    static async update (input){
        const {
            idcajas,
            productoId,
        } = input

        try {
            await connection.query(
                `UPDATE caja_productos SET producto_id = ? WHERE caja_id = ?`,
                [productoId, idcajas]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error updating caja productos')
        }
    }

    static async delete (input){
        const { caja_id } = input
        try {
            await connection.query('DELETE FROM caja_productos WHERE caja_id = ?', [caja_id])
        } catch (e) {
            console.log(e)
            throw new Error('Error deleting caja productos')
        }
    }

    static async deleteAll (input){
        try {
            await connection.query('DELETE FROM caja_productos')
        } catch (e) {
            console.log(e)
            throw new Error('Error deleting all caja productos')
        }
    }

    static async findCajaProductosByProductoId (input){
        const { productoId } = input
        try {
            const [rows] = await connection.query('SELECT * FROM caja_productos WHERE producto_id = ?', [productoId])
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error finding caja productos by producto id')
        }
    }

}