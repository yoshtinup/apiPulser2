export class GetHistoryById {
    constructor(historyRepository) {
      this.historyRepository = historyRepository; // Inyección del puerto (repositorio)
    }
  
    /**
     * Ejecutar la obtención de un cliente por su ID.
     * @param {number} id - El ID del cliente.
     * @returns {Promise<Object>} - Los datos del cliente encontrado.
     */
    async execute(id) {
      return await this.historyRepository.getHistoryById(id);
    }
  }
  