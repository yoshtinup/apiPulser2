
import express from 'express';

import { BoletoController } from '../../../adapters/controllers/BoletoController.js';
import { BoletoRepository } from '../../../adapters/repositories/BoletoRepository.js';

export const BoletoRouter = express.Router();

const boletoRepository = new BoletoRepository();
const boletoController = new BoletoController(boletoRepository);

// Definir la ruta POST /clients

BoletoRouter.get('/boletos', (req, res) => boletoController.getAllboleto(req, res));
BoletoRouter.get("/boleto/:id", (req, res) => boletoController.getBoletoById(req, res));
BoletoRouter.post("/boleto",(req, res) => boletoController.createBoleto(req, res));
BoletoRouter.put("/boleto/:id",(req, res) => boletoController.updateBoletoById(req, res));
BoletoRouter.delete("/boleto/:id" ,(req, res) => boletoController.deleteBoletoById(req, res));
