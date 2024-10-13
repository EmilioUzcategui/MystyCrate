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

export class SuscripcionesModel {
    static async create(input){
        const{
            suscripcionid,
            usuarioId,
            fechaInicio,
            fechaFin,
            estadoSuscripcion
        } = input

        try{
            await connection.query(
                `INSERT INTO suscripciones (suscripcion_id, usuario_id, fecha_inicio, fecha_renovacion, estado)
                VALUES (?,?,?,?,?)`,
                [suscripcionid, usuarioId, fechaInicio, fechaFin, estadoSuscripcion]
            )
        } catch (e){
            console.log(e)
            throw new Error('Error creating suscripcion')
        }
    }

    static async findSuscripcion(input){
        const { suscripcion_id } = input
        try{
            const [rows] = await connection.query('SELECT * FROM suscripciones WHERE suscripcion_id = ?', [suscripcion_id])
            return rows[0]
        } catch (e){
            console.log(e)
            throw new Error('Error finding suscripcion')
        }
    }

    static async findAll(){
        try{
            const [rows] = await connection.query('SELECT * FROM suscripciones')
            return rows
        } catch (e){
            console.log(e)
            throw new Error('Error finding all suscripciones')
        }
    }

    static async update(input){
        const{
            suscripcionid,
            usuarioId,
            fechaInicio,
            fechaFin,
            estadoSuscripcion
        } = input

        try{
            await connection.query(
                `UPDATE suscripciones SET usuario_id = ?, fecha_inicio = ?, fecha_renovacion = ?, estado = ?
                WHERE suscripcion_id = ?`,
                [usuarioId, fechaInicio, fechaFin, estadoSuscripcion, suscripcionid]
            )
        } catch (e){
            console.log(e)
            throw new Error('Error updating suscripcion')
        }
    }

    static async delete(input){
        const { suscripcion_id } = input
        try{
            await connection.query('DELETE FROM suscripciones WHERE suscripcion_id = ?', [suscripcion_id])
        } catch (e){
            console.log(e)
            throw new Error('Error deleting suscripcion')
        }
    }

    
}