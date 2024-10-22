
import { GetAllPago } from "../../../aplication/GetAllPago.js";
import { Createpago } from "../../../aplication/Createpago.js";
//import { PaymentRepository } from "../../../../Services/Infrestructura/adapters/Services/PaymentRepository.js";
//import { PaymentController } from "../../../../Services/Infrestructura/adapters/Controllers/PaymentController.js";

export class PagoController {
  constructor(pagoRepository) {
    this.getAllHistoryUseCase = new GetAllPago(pagoRepository);
    this.createHistoryUseCase = new Createpago(pagoRepository);

  }

  async createPayment(req, res) {
    try {
      const { codigo, monto, moneda, pieza, fecha} = req.body;
  
      // Validar que los campos obligatorios estén presentes y no sean undefined

      const pagoData = { codigo: codigo ?? '', monto: monto ?? '', moneda:moneda ?? '', pieza:pieza ?? '' , fecha: fecha ?? ''};
      const newPago = await this.createHistoryUseCase.execute(pagoData);
      res.status(201).json(newPago);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getAllPayments(req, res) {
    try {
      const history = await this.getAllHistoryUseCase.execute();
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
