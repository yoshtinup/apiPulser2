export class DeleteHistoryById {
    constructor(historyRepository) {
      this.historyRepository = historyRepository; // Inyección del puerto (repositorio)
    }
  
    /**
     * Ejecutar la eliminación de un cliente por su ID.
     * @param {number} id - El ID del cliente.
     * @returns {Promise<boolean>} - `true` si el cliente fue eliminado, `false` si no se encontró.
     */
    async execute(id) {
      return await this.historyRepository.deleteHistoryById(id);
    }
  }
  