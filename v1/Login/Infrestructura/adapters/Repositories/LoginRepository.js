import { ILoginRepository } from '../../../Dominio/ports/ILoginRepository.js';
import { db } from '../../../../../database/mysql.js';

export class LoginRepository extends ILoginRepository {
  // Método para crear un nuevo cliente en la base de datos
  async createNewLogin(login) {
    const sql = "INSERT INTO login(usuario, contrasena, gmail) VALUES (?, ?, ?)";
  
    // Convertir valores undefined a null
    const params = [
      login.usuario ?? null,
      login.contrasena ?? null,
      login.gmail ?? null,
    ];
  
    try {
      const [resultado] = await db.query(sql, params);
      return {
        id: resultado.insertId,
        usuario: login.usuario,
        contrasena: login.contrasena,
        gmail: login.gmail,
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error creating new login');
    }
  }
  async getAllLogins() {
    const sql = "SELECT * FROM login";
    try {
      const [data] = await db.query(sql);
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error retrieving logins');
    }
  }
  async getLoginById(id) {
    const sql = "SELECT * FROM login WHERE id=?";
    const params = [id];
    try {
      const [result] = await db.query(sql, params);
      return result[0]; // Devolvemos el primer resultado ya que la búsqueda es por ID
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error retrieving login by ID');
    }
  }
  async updateLoginById(id, login) {
    const sql = "UPDATE login SET usuario = ?, contrasena = ?, gmail = ? WHERE id = ?";
    const params = [
      login.usuario ?? null,
      login.contrasena ?? null,
      login.gmail ?? null,
      id
    ];
    try {
      const [result] = await db.query(sql, params);
      if (result.affectedRows === 0) {
        throw new Error('Login not found');
      }
      return result;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error updating login information');
    }
  }
  async findLoginByUsername(usuario) {
    const sql = "SELECT * FROM login WHERE usuario = ?";
    const params = [usuario];
    try {
      const [result] = await db.query(sql, params);
      if (result.length === 0) {
        return null; // Usuario no encontrado
      }
      return result[0]; // Devolver el primer resultado (el usuario encontrado)
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error finding login information');
    }
  }
  async deleteLoginById(id) {
    const sql = 'DELETE FROM login WHERE id = ?';
    const params = [id];
    try {
      const [result] = await db.query(sql, params);
      return result.affectedRows > 0; // Devuelve `true` si se eliminó un registro, `false` si no
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error deleting login');
    }
  }
}
