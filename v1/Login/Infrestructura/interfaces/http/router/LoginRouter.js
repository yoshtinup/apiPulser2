
import express from 'express';

import { LoginRepository } from '../../../adapters/Repositories/LoginRepository.js';
import { LoginController } from '../../../adapters/Controllers/LoginController.js';

export const LoginRouter = express.Router();

const loginRepository = new LoginRepository();
const loginController = new LoginController(loginRepository);

// Definir la ruta POST /clients
LoginRouter.put('/login/:id',(req, res) => loginController.updateLoginById(req, res));
LoginRouter.post('/loginNew', (req, res) => loginController.verifyLogin(req, res));
LoginRouter.get('/login',(req, res) => loginController.getAllLogins(req, res));
LoginRouter.get("/login/:id",(req, res) => loginController.getLoginById(req, res));
LoginRouter.delete("/login/:id",(req, res) => loginController.deleteLoginById(req, res));
LoginRouter.post("/login", (req, res) => loginController.createLogin(req, res));

