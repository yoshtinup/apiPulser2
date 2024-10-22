import { GetAllPago } from "../../../aplication/GetAllPago.js";
import { Createpago } from "../../../aplication/Createpago.js";
import { PaymentRepository } from "../../../../Services/Infrestructura/adapters/Services/PaymentRepository.js";
import { PaymentController } from "../../../../Services/Infrestructura/adapters/Controllers/PaymentController.js";
import { CorreoRepository } from "../../../../Services/Infrestructura/adapters/Services/CorreoRepository.js";
import { CorreoController } from "../../../../Services/Infrestructura/adapters/Controllers/CorreoController.js";

export class PagoController {
  constructor(pagoRepository) {
    this.getAllHistoryUseCase = new GetAllPago(pagoRepository);
    this.createHistoryUseCase = new Createpago(pagoRepository);
    this.pagoController = new PaymentController(new PaymentRepository());
    this.correoController = new CorreoController(new CorreoRepository());
  }

  async createPayment(req, res) {
    try {
      const { codigo, monto, moneda, pieza, fecha } = req.body;

      // Validar que los campos obligatorios estén presentes y sean válidos
      if (!codigo || !monto || !moneda || !pieza || !fecha) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      const pagoData = { 
        codigo, 
        monto: Number(monto), 
        moneda, 
        pieza: Number(pieza), 
        fecha 
      };

      // Crear un nuevo pago
      const newPago = await this.createHistoryUseCase.execute(pagoData);

      // Generar el item para la solicitud de pago
      const item = {
        title: "Bienvenido",
        unit_price: pagoData.monto,
        quantity: pagoData.pieza || 1,
      };

      // Intentar generar el link de pago
      let paymentLink;
      try {
        paymentLink = await this.pagoController.createPaymentUseCase.execute(item);
        
        // Enviar el link de pago por correo
        const mensaje = `Hola, te envío tu link de pago: ${paymentLink}`;
        
        // Si 'paymentLink' es un objeto, usar JSON.stringify() para evitar [object Object]
        const mensajeFormateado = `Hola, te envío tu link de pago: ${JSON.stringify(paymentLink)}`;

        // Enviar el mensaje con el link de pago al correo proporcionado
        this.sendPaymentLinkByEmail("yoshtingutierrez@gmail.com", mensajeFormateado); // Manejado en segundo plano
      } catch (paymentError) {
        console.error('Error al generar el link de pago:', paymentError.message);
        return res.status(500).json({ message: 'Error al generar el link de pago.' });
      }

      // Responder con el pago creado y el link de pago
      res.status(201).json({ newPago, paymentLink });
    } catch (error) {
      console.error('Error al crear el pago:', error.message);
      res.status(500).json({ message: 'Error en el servidor al procesar el pago.' });
    }
  }

  async getAllPayments(req, res) {
    try {
      const history = await this.getAllHistoryUseCase.execute();
      res.status(200).json(history);
    } catch (error) {
      console.error('Error al obtener el historial de pagos:', error.message);
      res.status(500).json({ message: 'Error en el servidor al obtener los pagos.' });
    }
  }

  // Método que envía el correo asincrónicamente
  async sendPaymentLinkByEmail(email, mensaje) {
    try {
      await this.correoController.sendMessageUseCase.execute(email, mensaje);
      console.log(`Correo enviado a ${email} con el link de pago.`);
    } catch (error) {
      console.error(`Error al enviar el correo a ${email}:`, error.message);
    }
  }
}
