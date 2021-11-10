'use strict';

const userModel = require('./users');
const { Sequelize, DataTypes } = require('sequelize');

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;


let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);

const addressModel = require('./address/model');
const addresses = addressModel(sequelize, DataTypes);
const Collection = require('./data-collection');
const users = userModel(sequelize, DataTypes);

addresses.hasMany(users, { foreignKey: 'userId', sourceKey: 'id' });
users.belongsTo(addresses, { foreignKey: 'userId', targetKey: 'id' });

const address= new Collection(addresses);
const userCollection =new Collection(users)
module.exports = {
  db: sequelize,
  users:users,
  userCollection: userCollection,
  address: address
}

