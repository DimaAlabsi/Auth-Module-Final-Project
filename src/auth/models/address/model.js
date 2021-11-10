'use strict';

const addressModal = (sequelize, DataTypes) => sequelize.define('addresses', {
  country: { type: DataTypes.STRING, required: true },
  cityName: { type: DataTypes.STRING, required: true },
  street: { type: DataTypes.STRING, required: true },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false

}
});

module.exports = addressModal;