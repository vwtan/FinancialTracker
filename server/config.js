require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  db_host: process.env.DB_HOST || 'postgres://:@localhost',
  db_port: process.env.DB_PORT || 5432,
  db_name: process.env.DB_NAME || 'fin_tracker',
};

export default config;
