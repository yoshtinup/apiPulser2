export class UpdateHistoryById {
    constructor(historyRepository) {
      this.historyRepository = historyRepository; // Inyección del puerto (repositorio)
    }
  
    /**
     * Ejecutar la actualización de un cliente por su ID.
     * @param {number} id - El ID del cliente.
     * @param {Object} historyData - Los datos del cliente para actualizar.
     * @returns {Promise<Object>} - Los datos del cliente actualizado.
     */
    async execute(id, historyData) {
      return await this.historyRepository.updateHistoryById(id, historyData);
    }
  }
  