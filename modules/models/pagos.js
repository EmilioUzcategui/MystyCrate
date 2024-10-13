import mysql from 'mysql2/promise'
import 'dotenv/config'

const DBConfig = {
  host: '127.0.0.1' || process.env.DB_HOST,
  user: 'root' || process.env.DB_USERNAME,
  port: 3306 || process.env.DB_PORT,
  password: '1234' || process.env.DB_PASSWORD,
  database: 'MystyCrate' || process.env.DB_DATABASE
}
const connection = await mysql.createConnection(DBConfig)
console.log('hola desde el modelo')

export class PagosModel {
    static async create (input){
        const {
            pagoid,
            usuarioId,
            suscripcionId,
            monto,
            fechaPago,
            metodoPago,
            estadoPago
        } = input

        try {
            await connection.query(
                `INSERT INTO pagos (pago_id, usuario_id, suscripcion_id, monto, fecha_pago, metodo_pago, estado)
                VALUES (?,?,?,?,?,?,?)`,
                [pagoid, usuarioId, suscripcionId, monto, fechaPago, metodoPago, estadoPago]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error creating pago')
        }
    }

    static async findPago (input){
        const { pago_id } = input
        try {
            const [rows] = await connection.query('SELECT * FROM pagos WHERE pago_id = ?', [pago_id])
            return rows[0]
        } catch (e) {
            console.log(e)
            throw new Error('Error finding pago')
        }
    }

    static async findAll (){
        try {
            const [rows] = await connection.query('SELECT * FROM pagos')
            return rows
        } catch (e) {
            console.log(e)
            throw new Error('Error finding all pagos')
        }
    }

    static async update (input){
        const {
            pagoid,
            usuarioId,
            suscripcionId,
            monto,
            fechaPago,
            metodoPago,
            estadoPago
        } = input

        try {
            await connection.query(
                `UPDATE pagos SET usuario_id = ?, suscripcion_id = ?, monto = ?, fecha_pago = ?, metodo_pago = ?, estado = ?
                WHERE pago_id = ?`,
                [usuarioId, suscripcionId, monto, fechaPago, metodoPago, estadoPago, pagoid]
            )
        } catch (e) {
            console.log(e)
            throw new Error('Error updating pago')
        }
    }

    static async delete (input){
        const { pago_id } = input
        try {
            await connection.query('DELETE FROM pagos WHERE pago_id = ?', [pago_id])
        } catch (e) {
            console.log(e)
            throw new Error('Error deleting pago')
        }
    }
    
}