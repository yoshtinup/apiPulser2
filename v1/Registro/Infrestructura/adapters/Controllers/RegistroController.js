import axios from "axios";
import { CreateClient }  from "../../../application/CreateClient.js";
import { GetAllClients } from "../../../application/GetAllClients.js";
import { MensajeController } from "../../../../Services/Infrestructura/adapters/Controllers/MensajeController.js";
import { MessageRepository } from "../../../../Services/Infrestructura/adapters/Services/MessageRepository.js";
export class RegistroController {
  constructor(clientRepository) {
    this.createClientUseCase = new CreateClient(clientRepository);
    this.getAllClientsUseCase = new GetAllClients(clientRepository);
    this.mensajeController = new MensajeController(new MessageRepository());
  }
  // Método para manejar la solicitud HTTP POST /clients
  async createClient(req, res) {
    try {
      const { nombre, apellido, telefono, gmail, codigo } = req.body;

      // Crear los datos del cliente y ejecutar el caso de uso para crear al cliente
      const clientData = {
        nombre: nombre ?? '',
        apellido: apellido ?? '',
        telefono: telefono ?? '',
        gmail: gmail ?? '',
        codigo: codigo ?? ''
      };

      const newClient = await this.createClientUseCase.execute(clientData);

      // Responder con los datos del cliente creado
      res.status(201).json(newClient);

      // Preparar el mensaje para el cliente
      const mensaje = `Hola ${newClient.nombre} ${newClient.apellido}, tu código de verificación es: ${newClient.codigo}`;

      // Intentar enviar el mensaje sin bloquear la respuesta principal
      try {
        await this.mensajeController.sendMessageUseCase.execute(newClient.telefono, mensaje);
      } catch (smsError) {
        console.error('Error al enviar el SMS:', smsError.message);
      }

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


  async getAllClients(req, res) {
    try {
      const clients = await this.getAllClientsUseCase.execute();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

