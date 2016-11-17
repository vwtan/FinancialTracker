import Sequelize from 'sequelize';
import serverConfig from './config';

const sequelize = new Sequelize(`${serverConfig.db_host}:${serverConfig.db_port}/${serverConfig.db_name}`);

export default sequelize;
