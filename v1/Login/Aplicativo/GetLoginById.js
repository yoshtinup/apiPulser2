export class GetLoginById {
    constructor(loginRepository) {
      this.loginRepository = loginRepository; // Inyección del puerto (repositorio)
    }
  
    /**
     * Ejecutar la obtención de un cliente por su ID.
     * @param {number} id - El ID del cliente.
     * @returns {Promise<Object>} - Los datos del cliente encontrado.
     */
    async execute(id) {
      return await this.loginRepository.getLoginById(id);
    }
  }
  