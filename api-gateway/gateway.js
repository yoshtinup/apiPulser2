import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import { MqttClient } from './Brokends/MqttClient.js';
import { MqttNotificate } from './Brokends/MqttNotificate.js';
import { MqttPayment } from './Brokends/MqttPayment.js'; // Importa tu clase MqttClient

dotenv.config();

const app = express();

const mqttClient = new MqttClient(); 
const mqttNotificate = new MqttNotificate();
const mqttPayment =  new MqttPayment();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para publicar en MQTT y redirigir al microservicio
const mqttAndProxy = (topic, proxyOptions) => {
    return (req, res, next) => {
        const message = JSON.stringify(req.body); // Enviar solo el cuerpo de la solicitud

        console.log('Publicando al broker MQTT:', { topic, message });

        // Publicar el mensaje en el broker MQTT
        mqttClient.publishMessage(topic, message);

        // Continuar con el proxy hacia el microservicio
        next();
    };
};
const mqttAndProxy2 = (topic, proxyOptions) => {
  return (req, res, next) => {
      const message = JSON.stringify(req.body); // Enviar solo el cuerpo de la solicitud

      console.log('Publicando al broker MQTT:', { topic, message });

      // Publicar el mensaje en el broker MQTT
      mqttNotificate.publishMessage(topic, message);

      // Continuar con el proxy hacia el microservicio
      next();
  };
};

const mqttAndProxy3 = (topic, proxyOptions) => {
  return (req, res, next) => {
      const message = JSON.stringify(req.body); // Enviar solo el cuerpo de la solicitud

      console.log('Publicando al broker MQTT:', { topic, message });

      // Publicar el mensaje en el broker MQTT
      mqttPayment.publishMessage(topic, message);

      // Continuar con el proxy hacia el microservicio
      next();
  };
};

app.use('/usuario', mqttAndProxy('client.mqtt', {
  target: process.env.USER_SERVICE_URL, // URL del servicio de usuario
  changeOrigin: true
}));
// Rutas para cada microservicio
app.use('/notificacion', mqttAndProxy2('services.serv', {
  target: process.env.NOTIFICATION_SERVICE_URL, // URL del servicio de usuario
  changeOrigin: true
}));

app.use('/payment', mqttAndProxy3('Payment.pay', {
  target: process.env.MAIN_SERVICE_URL, // URL del servicio de usuario
  changeOrigin: true
}));

// Agrega cualquier otra ruta de proxy según tus necesidades

// Puerto de la API Gateway
const PORT = process.env.GATEWAY_PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
