import express from "express";
import signale from "signale";
import cors from "cors";

import { PaymentRouter } from "./v1/Services/Infrestructura/interfaces/http/router/PaymentRouter.js";
import { pagoRouter } from "./v1/pago/infrastructure/interfaces/http/router/pagoRouter.js";

const app = express();

// Configuración del rate limiting

app.use(cors());
app.use(express.json());

// Rutas de la API

app.use("/api/v1", PaymentRouter);
app.use("/api/v1", pagoRouter);


const PORT = 3002;
app.listen(PORT, () => {
    signale.success(`Server online on port ${PORT}`);
});

