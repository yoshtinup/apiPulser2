
import { IBoletoRepository } from '../../../Dominio/ports/IBoletoRepository.js';

import { db } from '../../../../../database/mysql.js';

export class BoletoRepository extends IBoletoRepository {
  // Método para crear un nuevo cliente en la base de datos
  async deleteBoletoById(id) {
    const sql = 'DELETE FROM registropass WHERE id = ?';
    const params = [id];
    try {
      const [result] = await db.query(sql, params);
      return result.affectedRows > 0; // Devuelve `true` si se eliminó un registro, `false` si no
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error deleting client');
    }
  }
  
  async updateBoletoById(id, boleto) {
    const sql = "UPDATE registropass SET tipo = ?, codigo = ?, telefonoTaxi = ?, evento = ?, lugar = ?, nombre = ?, status = ? WHERE id = ?";
    const params = [
      boleto.tipo ?? null,
      boleto.codigo ?? null,
      boleto.telefonoTaxi ?? null,
      boleto.evento ?? null,
      boleto.lugar ?? null,
      boleto.nombre ?? null,
      boleto.status ?? null,
      id
    ];
  
    try {
      const [result] = await db.query(sql, params);
      
      // Verificar si se actualizó algún registro
      if (result.affectedRows === 0) {
        throw new Error('Boleto not found');
      }
      
      return result;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error updating boleto');
    }
  }  
  
  async getAllboleto() {
    const sql = "SELECT * FROM registropass";
    try {
      const [data] = await db.query(sql);
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error retrieving clients');
    }
  }
  async getBoletoById(id) {
    const sql = "SELECT * FROM registropass WHERE id=?";
    const params = [id];
    try {
      const [result] = await db.query(sql, params);
      return result[0]; // Devolvemos el primer resultado ya que la búsqueda es por ID
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error retrieving History by ID');
    }
  }
  
  async createNewBoleto(boleto) {
    // Cambié la tabla y los campos para reflejar un sistema de boletos
    const sql = "INSERT INTO registropass (tipo, codigo, telefonoTaxi, evento, lugar, url, nombre, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
    // Convertir valores undefined a null y obtener valores de la instancia `boleto`
    const params = [
      boleto.tipo ?? null,
      boleto.codigo ?? null,
      boleto.telefonoTaxi ?? null,
      boleto.evento ?? null,
      boleto.lugar ?? null,
      boleto.url ?? null,
      boleto.nombre ?? null,
      boleto.status ?? null
    ];
  
    try {
      // Ejecutar la consulta SQL con los parámetros
      const [resultado] = await db.query(sql, params);
  
      // Devolver los datos del boleto creado, incluyendo el ID generado
      return {
        id: resultado.insertId,
        tipo: boleto.tipo,
        codigo: boleto.codigo,
        telefonoTaxi: boleto.telefonoTaxi,
        evento: boleto.evento,
        lugar: boleto.lugar,
        url: boleto.url,
        nombre: boleto.nombre,
        status: boleto.status
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error creating new Boleto');
    }
  }

}


