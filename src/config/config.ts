export const appConfig = {
  app_env: process.env.NODE_ENV,
  app_timezone: process.env.TZ,
  db_host: process.env.DB_HOST,
  db_host_read: process.env.DB_HOST_READ || process.env.DB_HOST,
  db_port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  db_database: process.env.DB_NAME,
  db_logging: (process.env.DB_LOGGING && process.env.DB_LOGGING === 'true')? true : false,
};