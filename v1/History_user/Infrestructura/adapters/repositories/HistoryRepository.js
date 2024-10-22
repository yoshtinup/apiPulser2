import { IHistoryRepository } from '../../../Dominio/ports/IHistoryRepository.js';
import { db } from '../../database/mysql.js';

export class HistoryRepository extends IHistoryRepository {
  // Método para crear un nuevo cliente en la base de datos
  async deleteHistoryById(id) {
    const sql = 'DELETE FROM historial_usuario WHERE id = ?';
    const params = [id];
    try {
      const [result] = await db.query(sql, params);
      return result.affectedRows > 0; // Devuelve `true` si se eliminó un registro, `false` si no
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error deleting client');
    }
  }
  
  async updateHistoryById(id, history) {
    const sql = "UPDATE historial_usuario SET hora_entrada = ?, hora_salida = ?, fecha = ? WHERE id = ?";
    const params = [
      history.hora_entrada ?? null,
      history.hora_salida ?? null,
      history.fecha ?? null,
      id
    ];
    try {
      const [result] = await db.query(sql, params);
      if (result.affectedRows === 0) {
        throw new Error('Client not found');
      }
      return result;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error updating history');
    }
  }
  
  async getAllHistory() {
    const sql = "SELECT * FROM historial_usuario";
    try {
      const [data] = await db.query(sql);
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error retrieving clients');
    }
  }
  async getHistoryById(id) {
    const sql = "SELECT * FROM historial_usuario WHERE id=?";
    const params = [id];
    try {
      const [result] = await db.query(sql, params);
      return result[0]; // Devolvemos el primer resultado ya que la búsqueda es por ID
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error retrieving History by ID');
    }
  }
  async createNewHistory(History) {
    const sql = "INSERT INTO historial_usuario( hora_entrada, hora_salida, fecha) VALUES (?, ?, ?)";
  
    // Convertir valores undefined a null
    const params = [
      History.hora_entrada?? null,
      History.hora_salida?? null,
      History.fecha ?? null,
    ];
  
    try {
      const [resultado] = await db.query(sql, params);
      return {
        id: resultado.insertId,
        hora_entrada: History.hora_entrada,
        hora_salida: History.hora_salida,
        fecha: History.fecha,
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error creating new History');
    }
  }
}


