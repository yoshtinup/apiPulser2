export class PagoUser {
  constructor(id, codigo = '', monto, moneda, pieza, fecha) {
    this.id = id;
    this.codigo = codigo;
    this.monto = monto;
    this.moneda = moneda;
    this.pieza = pieza;
    this.fecha = this.validateDate(fecha);
  }

  // Método para validar un código (en este caso, un UUID)


  // Método para validar una fecha
  validateDate(date) {
    // Si la fecha es una cadena, intenta convertirla a formato ISO
    if (typeof date === 'string') {
      const parsedDate = new Date(date);

      // Verifica si la fecha es inválida
      if (isNaN(parsedDate.getTime())) {
        throw new Error('Invalid date value');
      }

      return parsedDate;
    }

    // Si ya es una instancia de Date, verifica su validez
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Invalid date value');
    }

    return date;
  }

  // Método para obtener el resumen del pago
  getPaymentSummary() {
    return `ID: ${this.id}, Código: ${this.codigo}, Monto: ${this.monto}, Moneda: ${this.moneda}, Pieza: ${this.pieza}, Fecha: ${this.fecha.toLocaleDateString()}`;
  }
}
