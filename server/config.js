// read env variables from .env in root directory
require('dotenv').config();


const config = {
  port: process.env.PORT || 3000,
};

export default config;
