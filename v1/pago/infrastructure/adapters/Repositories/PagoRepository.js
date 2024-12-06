
import { IPagoRepository } from '../../../domian/ports/IPagoRepository.js';

import { db } from '../../../../../database/mysql.js';

export class PagoRepository extends IPagoRepository {
  async createPayment(pago) {
    const sql = "INSERT INTO pago( codigo , monto, moneda, pieza, fecha) VALUES (?, ?, ?, ?, ?)";
  
    // Convertir valores undefined a null
    const params = [
      pago.codigo?? null,
      pago.monto?? null,
      pago.moneda?? null,
      pago.pieza?? null,
      pago.fecha?? null,
    ];
  
    try {
      const [resultado] = await db.query(sql, params);
      return {
        id: resultado.insertId,
        codigo: pago.codigo,
        monto: pago.monto,
        moneda: pago.moneda,
        pieza: pago.pieza,
        fecha: pago.fecha
      };
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error creating new pago');
    }
  }
  async getAllPayments() {
    const sql = "SELECT * FROM pago";
    try {
      const [data] = await db.query(sql);
      return data;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Error retrieving clients');
    }
  }

}

