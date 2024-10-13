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

export class RetroalimentacionModel {
  static async create (input){
    const {
      retroalimentacionid,
      usuarioId,
      productoId,
      calificacion,
      comentario,
      fecha
    }= input

    try {
      await connection.query(
        `INSERT INTO retroalimentacion (retroalimentacion_id, usuario_id, producto_id, calificacion, comentario, fecha)
        VALUES (?,?,?,?,?,?)`,
        [retroalimentacionid, usuarioId, productoId, calificacion, comentario, fecha]
      )
    } catch (e) {
      console.log(e)
      throw new Error('Error creating retroalimentacion')
    }
  }

  static async findRetroalimentacion (input){
    const { retroalimentacion_id } = input
    try {
      const [rows] = await connection.query('SELECT * FROM retroalimentacion WHERE retroalimentacion_id = ?', [retroalimentacion_id])
      return rows[0]
    } catch (e) {
      console.log(e)
      throw new Error('Error finding retroalimentacion')
    }
  }

  static async findAll (){
    try {
      const [rows] = await connection.query('SELECT * FROM retroalimentacion')
      return rows
    } catch (e) {
      console.log(e)
      throw new Error('Error finding all retroalimentaciones')
    }
  }

  static async update (input){
    const {
      retroalimentacionid,
      usuarioId,
      productoId,
      calificacion,
      comentario,
      fecha
    } = input

    try {
      await connection.query(
        `UPDATE retroalimentacion
        SET usuario_id = ?, producto_id = ?, calificacion = ?, comentario = ?, fecha = ?
        WHERE retroalimentacion_id = ?`,
        [usuarioId, productoId, calificacion, comentario, fecha, retroalimentacionid]
      )
    } catch (e) {
      console.log(e)
      throw new Error('Error updating retroalimentacion')
    }
  }

  static async delete (input){
    const { retroalimentacion_id } = input
    try {
      await connection.query('DELETE FROM retroalimentacion WHERE retroalimentacion_id = ?', [retroalimentacion_id])
    } catch (e) {
      console.log(e)
      throw new Error('Error deleting retroalimentacion')
    }
  }

  static async deleteAll (input){
    try {
      await connection.query('DELETE FROM retroalimentacion')
    } catch (e) {
      console.log(e)
      throw new Error('Error deleting retroalimentacion')
    }
  }
}