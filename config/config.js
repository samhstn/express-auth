export default {
  production: {
    logging: false,
    use_env_variable: 'DATABASE_URL',
    host: '0.0.0.0',
    dialect: 'postgres'
  },
  development: {
    username: 'postgres',
    password: null,
    database: 'express_auth',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  },
  test: {
    usename: 'postgres',
    password: null,
    database: 'express_auth_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    logging: false
  }
}
