export class HistoryUser {
    constructor(id, hora_entrada, hora_salida, fecha) {
      this.id = id;
      this.hora_entrada = this.validateTime(hora_entrada);
      this.hora_salida = this.validateTime(hora_salida);
      this.fecha = this.validateDate(fecha);
    }
  
    // Método para validar una fecha
    validateDate(date) {
        // Si la fecha es una cadena, intenta convertirla a formato ISO
        if (typeof date === 'string') {
          // Intenta parsear la fecha en un formato más consistente
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
    // Método para validar la hora
    validateTime(time) {
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  
      if (!timeRegex.test(time)) {
        throw new Error('Invalid time value. Format must be HH:MM');
      }
  
      return time;
    }
  
    // Método para obtener el resumen del registro de entrada y salida
    getEntrySummary() {
      return `ID: ${this.id}, Fecha: ${this.fecha.toLocaleDateString()}, Hora de Entrada: ${this.horaEntrada}, Hora de Salida: ${this.horaSalida}`;
    }
  }