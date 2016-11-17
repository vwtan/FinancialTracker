import Sequelize from 'sequelize';
import sequelize from '../sequelize';

const User = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
});

sequelize.sync();

export default User;
