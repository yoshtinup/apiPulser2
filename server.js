import express from "express";
import signale from "signale";
import cors from "cors";

import { clientRouter } from "./v1/Registro/Infrestructura/interfaces/http/router/RegistroRouter.js";
import { BoletoRouter } from "./v1/Boleto/Infrestructura/interfaces/http/router/BoletoRouter.js";
import { MessageRouter } from "./v1/Services/Infrestructura/interfaces/http/router/MenssageRouter.js";
import { CorreoRouter } from "./v1/Services/Infrestructura/interfaces/http/router/CorreoRouter.js";
import { PaymentRouter } from "./v1/Services/Infrestructura/interfaces/http/router/PaymentRouter.js";
import { pagoRouter } from "./v1/pago/infrastructure/interfaces/http/router/pagoRouter.js";

const app = express();

// Configuración del rate limiting

app.use(cors());
app.use(express.json());

// Rutas de la API
app.use("/api/v1", clientRouter);
app.use("/api/v1", MessageRouter);
app.use("/api/v1", CorreoRouter);
app.use("/api/v1", PaymentRouter);
app.use("/api/v1", pagoRouter);
app.use("/api/v1", BoletoRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    signale.success(`Server online on port ${PORT}`);
});

