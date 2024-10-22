export class LoginModel {
    constructor(id, usuario, contrasena, gmail) {
      this.id = id;
      this.usuario = this.validateString(usuario);
      this.contrasena = this.validatePassword(contrasena);
      this.gmail = this.validateEmail(gmail);
    }
  
    // Método para validar un nombre de usuario (cadena no vacía)
    validateString(value) {
      if (typeof value !== 'string' || value.trim() === '') {
        throw new Error('Invalid username');
      }
      return value.trim();
    }
  
    // Método para validar la contraseña (mínimo 8 caracteres, por ejemplo)
    validatePassword(password) {
      if (typeof password !== 'string' || password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }
      return password;
    }
  
    // Método para validar un correo electrónico
    validateEmail(email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email address');
      }
      return email.trim();
    }
  
    // Método para obtener el nombre de usuario
   /* getUsername() {
      return this.usuario;
    }
  
    // Método para obtener el correo electrónico
    getEmail() {
      return this.gmail;
    }*/
  }