import express from "express";
import signale from "signale";
import cors from "cors";

import { clientRouter } from "./v1/Registro/Infrestructura/interfaces/http/router/RegistroRouter.js";
import { BoletoRouter } from "./v1/Boleto/Infrestructura/interfaces/http/router/BoletoRouter.js";
const app = express();

// Configuración del rate limiting

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use("/api/v1", clientRouter);
app.use("/api/v1", BoletoRouter);

app.listen(3004, () => {
    signale.success(`Server online on port ${3004}`);
});

