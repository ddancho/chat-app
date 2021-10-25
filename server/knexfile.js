require("dotenv").config();

const {
  DB_CLIENT,
  DB_CONNECTION_LIMIT_MIN,
  DB_CONNECTION_LIMIT_MAX,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  DB_CHARSET,
} = process.env;

module.exports = {
  development: {
    client: DB_CLIENT,
    connection: {
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      charset: DB_CHARSET,
    },
    migrations: {
      directory: __dirname + "/knex/migrations",
    },
    pool: {
      min: parseInt(DB_CONNECTION_LIMIT_MIN),
      max: parseInt(DB_CONNECTION_LIMIT_MAX),
    },
  },
};
