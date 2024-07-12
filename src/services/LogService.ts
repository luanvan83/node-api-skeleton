import { Service } from "typedi";
import winston from "winston";
import { appConfig } from "../config/config";

const { combine, timestamp, printf, uncolorize, colorize } = winston.format;

@Service()
export class LogService {
	logger: winston.Logger;
  constructor() {
    // Determine the environment (e.g., 'development', 'production')
    const environment = appConfig.app_env || 'development';
		const loggerOptions: winston.LoggerOptions = {
			level: 'info',
      format: combine(
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A', // 2022-01-25 03:23:10.350 PM
        }),
        printf(info => {
          const { timestamp, level, message, ...rest } = info;
          const datetime = timestamp;
          const logData = { datetime, level, message, ...rest };
          return JSON.stringify(logData);
        }),
        // Conditionally apply colorization based on the environment
        (environment === 'development' || environment === 'production' ) ? uncolorize() : colorize({all: true})
      ),
			transports: [
				new winston.transports.Console()
			]
		};
		this.logger = winston.createLogger(loggerOptions);
	}

	log(message: any, ...optionalParams: any) {
    this.logger.info(message, optionalParams);
  }
  info(message: any, ...optionalParams: any) {
    this.logger.info(message, optionalParams);
  }
  debug(message: any, ...optionalParams: any) {
    this.logger.debug(message, optionalParams);
  }
  warn(message: any, ...optionalParams: any) {
    this.logger.warn(message, optionalParams);
  }
  error(message: any, ...optionalParams: any) {
    this.logger.error(message, optionalParams);
  }
  fatal(message: any, ...optionalParams: any) {
    this.logger.crit(message, optionalParams);
  }
  verbose(message: any, ...optionalParams: any) {
    this.logger.verbose(message, optionalParams);
  }
  profile(id: string | number, meta?: Record<string, any>) {
    this.logger.profile(id, meta);
  }
}