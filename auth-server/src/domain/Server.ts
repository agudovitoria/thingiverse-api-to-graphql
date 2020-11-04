import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosDebugLog from 'axios-debug-log';
import compression from 'compression';
import { Debugger } from 'debug';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import express, { Express } from 'express';
import listEndpoints, { Endpoint } from 'express-list-endpoints';
import morgan from 'morgan';
import winston from 'winston';

import { loginRouter } from '../route/LoginRoutes';

export default class Server {
  app: Express;
  server: any;
  logger: any;

  constructor() {
    this.app = express();

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({ filename: 'log/error.log', level: 'error' }),
        new winston.transports.File({ filename: 'log/combined.log' }),
      ]
    });

    const { NODE_ENV: environment } = process.env;

    if (environment === 'development') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple(),
      }));
    }

    this.initEnvironmentVariables();

    const port = this.readPortFromEnv();

    this.initApplicationConfiguration();
    this.initRoutes();
    this.startApplication(port);
    this.listConfiguredEndpoints();
  }

  private initApplicationConfiguration() {
    this.initMorganLogger();
    this.initAxiosLogger();
    this.initParsers();
    this.initCompression();
  }

  private initEnvironmentVariables() {
    const { error }: DotenvConfigOutput = dotenv.config();

    if (!!error) {
      throw new Error(`Invalid .env file: ${error.message}`);
    }
  }

  private readPortFromEnv(): string {
    const { PORT: port } = process.env;

    if (!port) {
      throw new Error('Invalid port value retrieved from environment');
    }

    return port;
  }

  private startApplication(port: string) {
    this.logger.debug(`🏁  Starting application`);
    this.server = this.app.listen({ port }, () => {
      this.logger.debug(`🚀  Server ready on http://localhost:${process.env.PORT}[/graphql]`);
    });
  }

  private initRoutes() {
    this.logger.debug('🚦  Defining route');
    this.app.use('/api', loginRouter);
  }

  private listConfiguredEndpoints() {
    this.logger.debug('🚪  Configured endpoints');
    listEndpoints(this.app)
      .map(({ path, methods }: Endpoint) => `[${methods.join(',')}] ${path}`)
      .forEach(it => this.logger.debug(`\t→  ${it}`));
  }

  private initCompression() {
    this.logger.debug('🗜  Enabling compression');
    this.app.use(compression());
  }

  private initParsers() {
    this.logger.debug('🔛  Enabling parsers');
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initAxiosLogger() {
    this.logger.debug('📝  Enabling axios logging');
    axiosDebugLog({
      request: (debug: Debugger, { method, headers, url, params }: AxiosRequestConfig) => {
        debug(`(Request) method [${method}] content-type [${headers['content-type']}] url [${url}]  parameters [${params}]`);
      },
      response: (debug: Debugger, { headers, config }: AxiosResponse) => {
        debug(`(Response) content-type [${headers['content-type']}] url [${config?.url}]`);
      },
      error: (debug: Debugger, { code, message }: AxiosError) => {
        debug(`(Error) code [${code}] message [${message}]`);
      }
    });
  }

  private initMorganLogger() {
    this.logger.debug('📝  Enabling morgan logging');
    this.app.use(morgan('dev'));
  }
}




