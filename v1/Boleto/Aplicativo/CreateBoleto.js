
import { BoletoUser } from "../Dominio/models/BoletoUser.js";

export class CreateBoleto {
  constructor(boletoRepository) {
    this.boletoRepository = boletoRepository; // Inyección del puerto (repositorio)
  }

  /**
   * Método para ejecutar la creación de un nuevo boleto.
   * @param {Object} boletoData - Datos del boleto.
   * @returns {Promise<BoletoUser>} - El boleto creado.
   */
  async execute(boletoData) {
    // Extraer los campos de los datos proporcionados
    const { id, tipo, codigo, telefonoTaxi, evento, lugar, url, nombre, status, idcodigo} = boletoData;

    // Crear una instancia de la entidad Boleto con los datos (aplica validaciones si es necesario)
    const boleto = new BoletoUser(id, tipo, codigo, telefonoTaxi, evento, lugar, url, nombre, status, idcodigo);
    
    // Guardar el boleto en el repositorio
    return await this.boletoRepository.createNewBoleto(boleto);
  }
}
