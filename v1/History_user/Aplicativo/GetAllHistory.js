export class GetAllHistory {
    constructor(historyRepository) {
      this.historyRepository = historyRepository; // Inyección del puerto (repositorio)
    }
  
    /**
     * Ejecutar la obtención de todos los clientes.
     * @returns {Promise<Array>} - Lista de todos los clientes registrados.
     */
    async execute() {
      return await this.historyRepository.getAllHistory();
    }
  }
  