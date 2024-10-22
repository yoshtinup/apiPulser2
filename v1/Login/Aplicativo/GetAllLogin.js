export class GetAllLogin {
    constructor(loginRepository) {
      this.loginRepository = loginRepository; // Inyección del puerto (repositorio)
    }
  
    /**
     * Ejecutar la obtención de todos los clientes.
     * @returns {Promise<Array>} - Lista de todos los clientes registrados.
     */
    async execute() {
      return await this.loginRepository.getAllLogins();
    }
  }
  