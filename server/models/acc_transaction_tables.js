import Sequelize from 'sequelize';
import sequelize from '../sequelize';


// accTable will be set to UserID_accounts table in db

const accTable = sequelize.define(userID.concat('_accounts'), {
  name: Sequelize.STRING,
  id: Sequelize.STRING,
  balance: Sequelize.FLOAT(11, 2),
  type: Sequelize.STRING, // credit, debit, checking, savings, brokerage..
  description: Sequelize.TEXT
});

//transactionTable will be set to UserID_transactions table in db
const transactionTable = sequelize.define(userID.concat('_transactions'){
  date: Sequelize.DATE,
  name: Sequelize.STRING,
  category: Sequelize, STRING,
  account: Sequelize.STRING,
  amount: Sequelize.FLOAT(11,2)

});

sequelize.sync();

export default accTable;
export default transactionTable;
