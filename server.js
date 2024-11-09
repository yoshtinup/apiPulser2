import express from "express";
import signale from "signale";
import cors from "cors";
import { pagoRouter } from "./v1/pago/infrastructure/interfaces/http/router/pagoRouter.js";
import { clientRouter } from "./v1/Registro/Infrestructura/interfaces/http/router/RegistroRouter.js";
import { BoletoRouter } from "./v1/Boleto/Infrestructura/interfaces/http/router/BoletoRouter.js";

const app = express();

// Configuración del rate limiting

app.use(cors());
app.use(express.json());

// Rutas de la API

app.use("/api/v1", pagoRouter);
app.use("/api/v1", clientRouter);
app.use("/api/v1", BoletoRouter);


const PORT = 3002;
app.listen(PORT, () => {
    signale.success(`Server online on port ${PORT}`);
});

