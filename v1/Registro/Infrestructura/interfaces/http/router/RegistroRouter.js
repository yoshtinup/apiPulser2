
import express from 'express';

import { RegistroRepository } from '../../../adapters/Repositories/RegistroRepository.js';

import { RegistroController } from '../../../adapters/controllers/RegistroController.js';

export const clientRouter = express.Router();

const clientRepository = new RegistroRepository();
const clientController = new RegistroController(clientRepository);

// Definir la ruta POST /clients
clientRouter.post('/register', (req, res) => clientController.createClient(req, res));
clientRouter.get("/clientes", (req, res) => clientController.getAllClients(req, res));

