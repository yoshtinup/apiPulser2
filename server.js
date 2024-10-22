import express from "express";
import signale from "signale";
import { clientRouter } from "./v1/Registro/Infrestructura/interfaces/http/router/RegistroRouter.js";
import { LoginRouter } from "./v1/Login/Infrestructura/interfaces/http/router/LoginRouter.js";
import { MessageRouter } from "./v1/Services/Infrestructura/interfaces/http/router/MenssageRouter.js";
import { CorreoRouter } from "./v1/Services/Infrestructura/interfaces/http/router/CorreoRouter.js";
import { PaymentRouter } from "./v1/Services/Infrestructura/interfaces/http/router/PaymentRouter.js";
import { pagoRouter } from "./v1/pago/infrastructure/interfaces/http/router/pagoRouter.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1", clientRouter);
app.use("/api/v1", MessageRouter);
app.use("/api/v1", CorreoRouter);
app.use("/api/v1", PaymentRouter);
app.use("/api/v1", LoginRouter);
app.use("/api/v1", pagoRouter)
// Usar el router de pago

app.listen(3002, () => {
    signale.success("Server online in port 3002");
});
