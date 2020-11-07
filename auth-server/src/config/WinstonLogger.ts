import { createLogger, format, Logger, transports } from 'winston';
import EnvironmentVariablesManager from '../shared/EnvironmentVariablesManager';

const mainLogPath = 'log/combined.log';
const errorLogPath = 'log/error.log';

export default class WinstonLogger {

  logger: Logger;
  envs: EnvironmentVariablesManager;

  constructor() {
    this.envs = new EnvironmentVariablesManager();

    const fileLogFormat = format.combine(
      format.timestamp(),
      format.simple()
    );
    
    const consoleLogFormat = format.combine(
      format.timestamp(),
      format.colorize(),
      format.simple()
    );

    this.logger = createLogger({
      level: 'info',
      format: fileLogFormat,
      defaultMeta: { service: 'user-service' },
      transports: [
        // TODO: Logs path in config?
        new transports.File({ filename: errorLogPath, level: 'error' }),
        new transports.File({ filename: mainLogPath }),
      ]
    });

    if (this.envs.isDev()) {
      this.logger.add(new transports.Console({
        format: consoleLogFormat,
      }));
    }
  }
}
