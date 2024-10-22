export class UpdateLoginById {
    constructor(loginRepository) {
      this.loginRepository = loginRepository; // Inyección del puerto (repositorio)
    }
  
    /**
     * Ejecutar la actualización del login de un cliente por su ID.
     * @param {number} id - El ID del cliente.
     * @param {Object} loginData - Los datos de login para actualizar.
     * @returns {Promise<Object>} - Resultado de la operación de actualización.
     */
    async execute(id, loginData) {
      return await this.loginRepository.updateLoginById(id, loginData);
    }
  }
  