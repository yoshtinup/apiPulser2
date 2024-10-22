import { HistoryUser } from "../Dominio/models/HistoryUser";

export class CreateHistory {
  constructor(historyRepository) {
    this.historyRepository = historyRepository; // Inyección del puerto (repositorio)
  }

  /**
   * Método para ejecutar la creación de un nuevo cliente.
   * @param {Object} historyData - Datos del cliente.
   * @returns {Promise<HistoryUser>} - El cliente creado.
   */
  async execute(historyData) {
    // Crear una instancia de la entidad RegistroCliente (aplica validaciones)
    const { id, hora_entrada, hora_salida, fecha } = historyData;
    const history = new HistoryUser(id, hora_entrada, hora_salida, fecha );
    // Guardar el cliente en el repositorio
    return await this.historyRepository.createNewHistory(history);
  }
}
