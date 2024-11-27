import express from "express";
import signale from "signale";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import { clientRouter } from "./v1/Registro/Infrestructura/interfaces/http/router/RegistroRouter.js";
import { BoletoRouter } from "./v1/Boleto/Infrestructura/interfaces/http/router/BoletoRouter.js";
import { MessageRouter } from "./v1/Services/Infrestructura/interfaces/http/router/MenssageRouter.js";
import { CorreoRouter } from "./v1/Services/Infrestructura/interfaces/http/router/CorreoRouter.js";
import { PaymentRouter } from "./v1/Services/Infrestructura/interfaces/http/router/PaymentRouter.js";
import { pagoRouter } from "./v1/pago/infrastructure/interfaces/http/router/pagoRouter.js";
import { clientVerific } from "./v1/Registro/Infrestructura/interfaces/http/router/vericadorRouter.js";
const app = express();

app.use(express.static('public'));


// Configuración del rate limiting
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors());
app.use(express.json());

// Rutas de la API Usuarios
app.use("/api/v1", clientRouter);
app.use("/api/v1", pagoRouter);
app.use("/api/v1", BoletoRouter);
// Ruats de Api Services 
app.use("/api/v1", MessageRouter);
app.use("/api/v1", CorreoRouter);
app.use("/api/v1", PaymentRouter);
// Endpoint para servir el archivo HTML
app.use("/api/v1", clientVerific);

app.get('/mostrar-html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    signale.success(`Server online on port ${PORT}`);
});

