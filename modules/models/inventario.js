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

export class InventarioModel {
    static async create (input){
        const{
            productoId,
            cantidad,
            ultimaModificacion
        }= input

        try {
            await connection.query(
                `INSERT INTO inventario (producto_id, cantidad_disponible, ultima_actualizacion)
                VALUES (?,?,?)`,
                [productoId, cantidad, ultimaModificacion]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error creating inventario')
        }
    }

    static async findInventario (input){
        const { producto_id } = input
        try {
            const [rows] = await connection.query('SELECT * FROM inventario WHERE producto_id = ?', [producto_id])
            return rows[0]
        } catch (e) {
            console.log(e)
            throw new Error('Error finding inventario')
        }
    }

    static async findAll (){
        try {
            const [rows] = await connection.query('SELECT * FROM inventario')
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error finding all inventarios')
        }
    }

    static async update (input){
        const {
            productoId,
            cantidad,
            ultimaModificacion
        } = input

        try {
            await connection.query(
                `UPDATE inventario
                SET cantidad_disponible = ?,
                ultima_actualizacion = ?
                WHERE producto_id = ?`,
                [cantidad, ultimaModificacion, productoId]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error updating inventario')
        }
    }

    static async delete (input){
        const { producto_id } = input
        try {
            await connection.query('DELETE FROM inventario WHERE producto_id = ?', [producto_id])
        } catch (e) {
            console.log(e)
            throw new Error('Error deleting inventario')
        }
    }
}