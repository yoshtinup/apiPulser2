import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

// Variables de entorno
const PORT = process.env.GATEWAY_PORT || 3001;
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3002';
const NOTIFICATION_SERVICE_URL = process.env.NOTIFICATION_SERVICE_URL || 'http://localhost:3003';

const app = express();

// Proxy para el servicio de usuarios
app.use('/user', createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true
}));

// Proxy para el servicio de notificaciones
app.use('/notification', createProxyMiddleware({
    target: NOTIFICATION_SERVICE_URL,
    changeOrigin: true
}));

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada en el Gateway' });
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`API Gateway ejecutándose en http://localhost:${PORT}`);
});
