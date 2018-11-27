import { createLogger, transports, format } from 'winston';

const {
  combine, timestamp, colorize, printf,
} = format;

const myFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

export default createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
      format: combine(
        timestamp(),
        colorize(),
        myFormat,
      ),
    }),
    new transports.File({
      colorize: true,
      filename: 'logs.log',
      format: combine(
        timestamp(),
        myFormat,
      ),
    }),
  ],
});
