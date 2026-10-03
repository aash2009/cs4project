import { setupAPI } from './backend/api.mjs';
import exp from 'express';
import winston from 'winston';
import { readFileSync } from 'fs';

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console()
    ]
});

const app = exp();

const host = '127.0.0.1';
const port = 8080;

// Backend
setupAPI(app, logger);

// Frontend
app.use('/', exp.static('frontend'));

app.listen(port, host, () => {
    logger.info(`Listening on ${host}:${port}`);
})