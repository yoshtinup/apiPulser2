
import { GetBoletoById } from "../../../Aplicativo/GetBoletoById.js";
import { CreateBoleto } from "../../../Aplicativo/CreateBoleto.js";
import { UpdateBoletoById } from "../../../Aplicativo/UpdateBoletoById.js";
import { DeleteBoletoById } from "../../../Aplicativo/DeleteBoletoById.js";
import { GetAllboleto } from "../../../Aplicativo/GetAllboleto.js";
export class BoletoController {
  constructor(boletoRepository) {
    this.getHistoryByIdUseCase = new GetBoletoById(boletoRepository);
    this.getAllHistoryUseCase = new GetAllboleto(boletoRepository);
    this.createBoletoUseCase = new CreateBoleto(boletoRepository);
    this.updateHistoryByIdUseCase = new UpdateBoletoById(boletoRepository);
    this.deleteHistoryByIdUseCase = new DeleteBoletoById(boletoRepository); 
  }
  // Método para manejar la solicitud HTTP POST /clients
  async deleteBoletoById(req, res) {
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
  async updateBoletoById(req, res) {
    try {
      const { id } = req.params;
      const boletoData = req.body;
  
      // Validar que los datos estén presentes y no sean undefined o vacíos
      if (!boletoData.tipo || !boletoData.codigo || !boletoData.telefonoTaxi || !boletoData.evento || !boletoData.lugar || !boletoData.nombre || !boletoData.status){
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Opcional: puedes agregar validaciones adicionales, por ejemplo, verificar longitud o formato del código, etc.
  
      // Ejecutar el caso de uso para actualizar el boleto
      const updatedBoleto = await this.updateHistoryByIdUseCase.execute(id, boletoData);
  
      // Verificar si el boleto fue actualizado correctamente
      if (!updatedBoleto) {
        return res.status(404).json({ message: 'Boleto not found' });
      }
  
      res.status(200).json({ message: 'Boleto updated successfully', updatedBoleto });
    } catch (error) {
      // Manejo de errores
      res.status(500).json({ message: error.message });
    }
  }
  
  async createBoleto(req, res) {
    try {
      // Extraer los campos del cuerpo de la solicitud (body)
      const { tipo, codigo, telefonoTaxi, evento, lugar, url, nombre, status} = req.body;
  
      // Validar que los campos obligatorios estén presentes (puedes personalizar según tu lógica)
      if (!tipo || !codigo || !telefonoTaxi || !evento || !lugar || !url || !nombre || !status) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      // Crear el objeto que será pasado al caso de uso para crear el boleto
      const boletoData = {
        tipo: tipo ?? '',
        codigo: codigo ?? '',
        telefonoTaxi: telefonoTaxi ?? '',
        evento: evento ?? '',
        lugar: lugar ?? '',
        url: url ?? '', 
        nombre: nombre ?? '',
        status: status ?? '',
      };
  
      // Ejecutar el caso de uso para crear el boleto
      const newBoleto = await this.createBoletoUseCase.execute(boletoData);
  
      // Enviar la respuesta con el boleto creado
      res.status(201).json(newBoleto);
    } catch (error) {
      // En caso de error, responder con el mensaje de error
      res.status(500).json({ message: error.message });
    }
  }
  

  async getBoletoById(req, res) {
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
  async getAllboleto(req, res) {
    try {
      const history = await this.getAllHistoryUseCase.execute();
      res.status(200).json(history);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }


}

