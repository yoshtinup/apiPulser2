
import express from 'express';

import { HistoryController } from '../../../adapters/controllers/HistoryController.js';
import { HistoryRepository } from '../../../adapters/repositories/HistoryRepository.js';
export const historyRouter = express.Router();

const historyRepository = new HistoryRepository();
const historyController = new HistoryController(historyRepository);

// Definir la ruta POST /clients

historyRouter.get('/history', (req, res) => historyController.getAllHistory(req, res));
historyRouter.get("/history/:id", (req, res) => historyController.getHistoryById(req, res));
historyRouter.post("/history",(req, res) => historyController.createHistory(req, res));
historyRouter.put("/history/:id",(req, res) => historyController.updateHistoryById(req, res));
historyRouter.delete("/history/:id" ,(req, res) => historyController.deleteHistoryById(req, res));
