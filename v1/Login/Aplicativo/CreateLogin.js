import { LoginModel } from "../Dominio/models/LoginModel.js";

export class CreateLogin {
  constructor(loginRepository) {
    this.loginRepository = loginRepository; // Inyección del puerto (repositorio)
  }

  /**
   * Método para ejecutar la creación de un nuevo cliente.
   * @param {Object} loginData - Datos del cliente.
   * @returns {Promise<LoginModel>} - El cliente creado.
   */
  async execute(loginData) {
    // Crear una instancia de la entidad RegistroCliente (aplica validaciones)
    const { id, usuario, contrasena, gmail} = loginData;
    const login = new LoginModel(id, usuario, contrasena, gmail);

    // Guardar el cliente en el repositorio
    return await this.loginRepository.createNewLogin(login);
  }
}
