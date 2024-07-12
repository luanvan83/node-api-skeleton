import { config } from "dotenv";
config({path: (__dirname + '/.env')});

import 'reflect-metadata';
import { Container } from 'typedi';
import express from 'express';
import { useExpressServer, useContainer as rcUseContainer } from 'routing-controllers';
import { AppDataSource } from './typeorm-data-source';
import { registerRepositories } from './repositories/Index';

async function initApp() {
  const app = express();

  rcUseContainer(Container);

  registerRepositories();

  try {
    await AppDataSource
      .initialize();
    console.log("Data Source has been initialized!")
  } catch (err) {
    console.error("Error during Data Source initialization:", err)
  }

  // Remove the X-Powered-By header for security reason
  app.disable('x-powered-by');

  useExpressServer(app, {
    controllers: [__dirname + '/controllers/*.ts'],
    middlewares: [__dirname + '/middlewares/*.ts'],
    defaultErrorHandler: false, // disable default error handler, only if you have your own error handler
    defaults: {
      nullResultCode: 404,
      undefinedResultCode: 404
    }
  });

  return app;
}

export default initApp;

