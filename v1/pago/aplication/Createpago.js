
import { PagoUser } from "../domian/models/PagoUser.js";

export class Createpago {
  constructor(pagoRepository) {
    this.pagoRepository = pagoRepository; // Inyección del puerto (repositorio)
  }

  /**
   * Método para ejecutar la creación de un nuevo cliente.
   * @param {Object} pagoData - Datos del cliente.
   * @returns {Promise<PagoUser>} - El cliente creado.
   */
  async execute(pagoData) {
    // Crear una instancia de la entidad RegistroCliente (aplica validaciones)
    const { id, hora_entrada, hora_salida, fecha } = pagoData;
    const history = new HistoryUser(id, hora_entrada, hora_salida, fecha );
    // Guardar el cliente en el repositorio
    return await this.pagoRepository.getAllPayments(history);
  }
}