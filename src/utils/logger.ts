import winston from 'winston';
import process from 'node:process';
import * as Transport from 'winston-transport';

const transports: Transport[] = [
  new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
  new winston.transports.File({ filename: 'log/std.log' })
];
const LOG_CONSOLE = process.env.LOG_CONSOLE || 'yes';
if (['yes', 'true', 'on'].includes(LOG_CONSOLE.toLowerCase())) {
  transports.push(new winston.transports.Console());
}

const logger = winston.createLogger({
  format: winston.format.json(),
  transports
});

export default logger;
