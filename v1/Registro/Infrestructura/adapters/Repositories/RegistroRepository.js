

import { IRegistroRepository } from '../../../domain/ports/IRegistroRepository.js';
import { db } from '../../../../../database/mysql.js';

export class RegistroRepository extends IRegistroRepository {
  // Método para crear un nuevo cliente en la base de datos
  async getAllClients() {
    const sql = "SELECT * FROM usuario";
    try {
      const [data] = await db.query(sql);
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error retrieving clients');
    }
  }

  async createNewClient(client) {
    const sql = "INSERT INTO usuario(nombre, apellido, telefono, gmail, codigo) VALUES (?, ?, ?, ?, ?)";
  
    // Convertir valores undefined a null
    const params = [
      client.nombre ?? null,
      client.apellido ?? null,
      client.telefono ?? null,
      client.gmail ?? null,
      client.codigo ?? null,
    ];
  
    try {
      const [resultado] = await db.query(sql, params);
      return {
        id: resultado.insertId,
        nombre: client.nombre,
        apellido: client.apellido,
        telefono: client.telefono,
        gmail: client.gmail,
        codigo: client.codigo,
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error creating new client');
    }
  }

}
