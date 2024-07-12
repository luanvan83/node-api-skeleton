import { DataSource, DataSourceOptions } from "typeorm"
import { appConfig } from "./config/config";
import Entities from "./entities/Index";

const options: DataSourceOptions = {
  type: 'mysql',
  replication: {
    master: {
      host: appConfig.db_host,
      port: appConfig.db_port,
      username: appConfig.db_username,
      password: appConfig.db_password,
      database: appConfig.db_database,
    },
    slaves: [{
      host: appConfig.db_host_read,
      port: appConfig.db_port,
      username: appConfig.db_username,
      password: appConfig.db_password,
      database: appConfig.db_database,
    }]
  },
  entities: Entities,
  migrations: ['./src/migrations/*'],
  synchronize: false, // TRUE will sync schema automatically which is risky for PRD
  logging: appConfig.db_logging
};

export const AppDataSource = new DataSource(options)