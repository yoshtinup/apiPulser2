
import { GetHistoryById } from "../../../Aplicativo/GetHistoryById.js";
import { CreateHistory } from "../../../Aplicativo/CreateHistory.js";
import { UpdateHistoryById } from "../../../Aplicativo/UpdateHistoryById.js";
import { DeleteHistoryById } from "../../../Aplicativo/DeleteHistory.js";
import { GetAllHistory } from "../../../Aplicativo/GetAllHistory.js";

export class HistoryController {
  constructor(historyRepository) {
    this.getHistoryByIdUseCase = new GetHistoryById(historyRepository);
    this.getAllHistoryUseCase = new GetAllHistory(historyRepository);
    this.createHistoryUseCase = new CreateHistory(historyRepository);
    this.updateHistoryByIdUseCase = new UpdateHistoryById(historyRepository);
    this.deleteHistoryByIdUseCase = new DeleteHistoryById(historyRepository);
    
  }
  // Método para manejar la solicitud HTTP POST /clients
  async deleteHistoryById(req, res) {
    try {
      const { id } = req.params;
      const deleted = await this.deleteHistoryByIdUseCase.execute(id);
      if (deleted) {
        res.status(200).json({ message: 'Client deleted successfully' });
      } else {
        res.status(404).json({ message: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateHistoryById(req, res) {
    try {
      const { id } = req.params;
      const historyData = req.body;

      // Validar que los datos estén presentes y no sean undefined
      if (!historyData.hora_entrada || !historyData.hora_salida || !historyData.fecha) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      const updatedHistory = await this.updateHistoryByIdUseCase.execute(id, historyData);
      res.status(200).json({ message: 'Client updated successfully', updatedHistory });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async createHistory(req, res) {
    try {
      const { hora_entrada, hora_salida, fecha} = req.body;
  
      // Validar que los campos obligatorios estén presentes y no sean undefined

      const historyData = { hora_entrada: hora_entrada ?? '', hora_salida: hora_salida ?? '', fecha: fecha ?? ''};
      const newHistory = await this.createHistoryUseCase.execute(historyData);
      res.status(201).json(newHistory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getHistoryById(req, res) {
    try {
      const { id } = req.params;
      const client = await this.getHistoryByIdUseCase.execute(id);
      if (client) {
        res.status(200).json(client);
      } else {
        res.status(404).json({ message: 'Client not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async getAllHistory(req, res) {
    try {
      const history = await this.getAllHistoryUseCase.execute();
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


}

