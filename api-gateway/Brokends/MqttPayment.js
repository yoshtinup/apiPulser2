import mqtt from 'mqtt';

export class MqttPayment {
    constructor() {
        this.options = {
            protocol: 'Payment',
            port: 1883,
            username: process.env.MQTT_USERNAME || 'guest',
            password: process.env.MQTT_PASSWORD || 'guest',
        };

        this.brokerUrl = process.env.MQTT_BROKER_URL || 'mqtt://54.235.133.98';
        this.defaultTopic = 'Payment.pay';

        this.client = mqtt.connect(this.brokerUrl, this.options);

        this.initialize();
    }

    initialize() {
        this.client.on('connect', () => {
            console.log('MQTT Client Connected');
        });

        this.client.on('error', (error) => {
            console.error('MQTT Client Error:', error);
        });

        this.client.on('reconnect', () => {
            console.log('Attempting to reconnect...');
        });

        this.client.on('disconnect', (packet) => {
            console.warn('MQTT Client Disconnected:', packet.reasonCode);
        });

        this.client.on('message', (topic, message) => {
            console.log(`Message received on topic "${topic}": ${message.toString()}`);
        });
    }

    publishMessage(topic, message) {
        this.client.publish(
            topic,
            message,
            { qos: 0, retain: false },
            (error) => {
                if (error) {
                    console.error('Publish Error:', error);
                } else {
                    console.log(`Message sent to topic "${topic}": ${message}`);
                }
            }
        );
    }

    subscribeToTopic(topic) {
        this.client.subscribe(topic, { qos: 0 }, (error) => {
            if (error) {
                console.error('Subscription Error:', error);
            } else {
                console.log(`Subscribed to topic: ${topic}`);
            }
        });
    }

    disconnect() {
        this.client.end(false, () => {
            console.log('MQTT Client Disconnected');
        });
    }
}
