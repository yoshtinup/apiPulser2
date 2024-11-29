import { v4 as uuidv4 } from 'uuid';

export class BoletoUser {
  constructor(id, tipo, codigo, telefonoTaxi, evento, lugar, url, nombre, status, idcodigo = null) {
    this.id = id;
    this.tipo = this.validateTipo(tipo);
    this.codigo = this.validateCodigo(codigo);
    this.telefonoTaxi = this.validateTelefono(telefonoTaxi);
    this.evento = evento;
    this.lugar = lugar;
    this.url = url;
    this.nombre = nombre;
    this.status = status;
    this.idcodigo = idcodigo ? this.validateCodigo(idcodigo) : this.generateCodigo(); 
  }

  // Validación para el campo 'tipo' (puedes ajustar esto según tu lógica de negocio)
  validateTipo(tipo) {
    const validTypes = ['VIP', 'Normal', 'Estudiante']; // Ejemplo de tipos válidos
    if (!validTypes.includes(tipo)) {
      throw new Error('Invalid tipo value. Must be one of: VIP, Normal, Estudiante');
    }
    return tipo;
  }

  // Validación para el campo 'codigo' (puedes ajustar esto según tus requisitos)
  validateCodigo(codigo) {
    if (!codigo || codigo.length < 5 || codigo.length > 50) {
      throw new Error('Invalid codigo value. Must be between 10 and 50 characters');
    }
    return codigo;
  }
  
  
  // Validación para el campo 'telefonoTaxi' (puedes ajustar esto según tu formato de teléfono)
  validateTelefono(telefonoTaxi) {
    const phoneRegex = /^[0-9]{10}$/; // Ejemplo de formato de número telefónico de 10 dígitos
    if (!phoneRegex.test(telefonoTaxi)) {
      throw new Error('Invalid telefonoTaxi value. Must be a valid 10-digit phone number');
    }
    return telefonoTaxi;
  }

  validateCodigo(idcodigo) {
    if (typeof idcodigo !== 'string' || idcodigo.trim() === '') {
      throw new Error('Invalid code value');
    }
    return idcodigo.trim();
  }


  generateCodigo() {
    return uuidv4(); 
  }

  // Método para obtener el resumen del boleto
  getBoletoSummary() {
    return `ID: ${this.id}, Tipo: ${this.tipo}, Código: ${this.codigo}, Teléfono: ${this.telefonoTaxi}, Evento: ${this.evento}, Lugar: ${this.lugar}, Url: ${this.url}`;
  }
}
