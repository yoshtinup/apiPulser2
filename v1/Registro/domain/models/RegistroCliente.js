import { v4 as uuidv4 } from 'uuid';

export class RegistroCliente {
  constructor(id, nombre = '', apellido = '', telefono, gmail, codigo = null) {
    this.id = id ?? null;
    this.nombre = nombre ? this.validateString(nombre) : '';
    this.apellido = apellido ? this.validateString(apellido) : '';
    this.telefono = this.validatePhoneNumber(telefono);
    this.gmail = this.validateEmail(gmail);
    this.codigo = codigo ? this.validateCodigo(codigo) : this.generateCodigo(); // Genera código si no se proporciona
  }

  // Método para validar un número de teléfono
  validatePhoneNumber(phoneNumber) {
    const normalizedPhoneNumber = String(phoneNumber).trim();
    const phoneRegex = /^\+?[1-9]\d{1,14}$/; // Permite números internacionales con un máximo de 15 dígitos
  
    if (!phoneRegex.test(normalizedPhoneNumber)) {
      throw new Error('Invalid phone number');
    }
  
    return normalizedPhoneNumber;
  }
  

  // Método para validar una cadena
  validateString(value) {
    if (typeof value !== 'string') {
      throw new Error('Invalid string value');
    }
    return value.trim();
  }

  // Método para validar un correo electrónico
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address');
    }

    return email.trim();
  }

  // Método para validar un código (si es necesario)
  validateCodigo(codigo) {
    if (typeof codigo !== 'string' || codigo.trim() === '') {
      throw new Error('Invalid code value');
    }
    return codigo.trim();
  }

  // Método para generar un código automáticamente
  generateCodigo() {
    return uuidv4(); // Genera un código único basado en UUID v4
  }

  // Método para obtener el nombre completo del cliente
  getFullName() {
    return `${this.nombre} ${this.apellido}`;
  }
}
