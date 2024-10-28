
import express from 'express';

import { RegistroRepository } from '../../../adapters/Repositories/RegistroRepository.js';

import { RegistroController } from '../../../adapters/Controllers/RegistroController.js';
import { VerifyToken } from '../middlewares/verifyToken.js';
export const clientRouter = express.Router(); 

const clientRepository = new RegistroRepository();
const clientController = new RegistroController(clientRepository);

// Definir la ruta POST /clients
clientRouter.post('/register', (req, res) => clientController.createClient(req, res));
clientRouter.get("/clientes", VerifyToken,(req, res) => clientController.getAllClients(req, res));
clientRouter.post('/loginNew', (req, res) => clientController.verifyLogin(req, res));
clientRouter.get("/cliente/:id", VerifyToken,(req, res) => clientController.getClientById(req, res));
clientRouter.put("/cliente/:id",VerifyToken,(req, res) => clientController.updateClientById(req, res));
clientRouter.delete("/cliente/:id",VerifyToken,(req, res) => clientController.deleteClientById(req,res));
