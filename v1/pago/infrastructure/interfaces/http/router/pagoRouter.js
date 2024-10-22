
import express from 'express';
import { PagoController } from '../../../adapters/Controllers/PagoController.js';
import { PagoRepository } from '../../../adapters/Repositories/PagoRepository.js';
// Crear el router para manejar pagos
export const pagoRouter = express.Router();

// Instanciar el repositorio y el controlador de pagos
const pagoRepository = new PagoRepository();
const pagoController = new PagoController(pagoRepository);

// Definir la ruta POST para registrar un pago
pagoRouter.post('/pago', (req, res) => pagoController.createPayment(req, res));

// Definir la ruta GET para obtener todos los pagos (si es necesario)
pagoRouter.get('/pagos', (req, res) => pagoController.getAllPayments(req, res));
