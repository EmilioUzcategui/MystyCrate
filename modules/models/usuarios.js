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

export class UsuarioModel {
  static async create (input) {
    const {
      usuarioId, // Debe coincidir con el nombre del campo en el formulario HTML
      nombre,
      correo,
      contraseña,
      direccion,
      telefono,
      fechaNacimiento,
      estadoSuscripcion
      // Asegúrate de que este nombre coincida con el esperado
    } = input

    try {
      console.log('hola desde el modelo')
      await connection.query(
            `INSERT INTO usuarios (usuario_id,nombre, correo, contraseña, direccion, telefono, fecha_nacimiento, estado_suscripcion,)
            VALUES (?,?,?,?,?,?,?,?)`,
            // eslint-disable-next-line camelcase
            [usuarioId, nombre, correo, contraseña, direccion, telefono, fechaNacimiento, estadoSuscripcion]
      )
    } catch (e) {
      console.log(e)
      throw new Error('Error creating usuario')
    }
  }

  static async findUser (input) {
    const { user } = input
    try {
      const [rows] = await connection.query('SELECT * FROM usuarios WHERE user = ?', [user])
      return rows[0]
    } catch (e) {
      console.log(e)
      throw new Error('Error finding user')
    }
  }

  static async findAll () {
    try {
      const [rows] = await connection.query('SELECT * FROM usuarios')
      return rows
    } catch (e) {
      console.log(e)
      throw new Error('Error finding all users')
    }
  }

  static async update (input) {
    const {
      usuarioId, // Debe coincidir con el nombre del campo en el formulario HTML
      nombre,
      correo,
      contraseña,
      direccion,
      telefono,
      fechaNacimiento,
      estadoSuscripcion
      // Asegúrate de que este nombre coincida con el esperado
    } = input

    try {
      await connection.query(
        'UPDATE usuarios SET nombre = ?, correo = ?, contraseña = ?, direccion = ?, telefono = ?, fecha_nacimiento = ?, estado_suscripcion = ? WHERE usuario_id = ?',
        [nombre, correo, contraseña, direccion, telefono, fechaNacimiento, estadoSuscripcion, usuarioId]
      )
    } catch (e) {
      console.log(e)
      throw new Error('Error updating usuario')
    }
  }

    static async delete (input) {
        const { usuarioId } = input
        try {
        await connection.query('DELETE FROM usuarios WHERE usuario_id = ?', [usuarioId])
        } catch (e) {
        console.log(e)
        throw new Error('Error deleting usuario')
        }
    }

    static async findUserById (input) {
        const { usuarioId } = input
        try {
        const [rows] = await connection.query('SELECT * FROM usuarios WHERE usuario_id = ?', [usuarioId])
        return rows[0]
        } catch (e) {
        console.log(e)
        throw new Error('Error finding user by id')
        }
    }
 
}
