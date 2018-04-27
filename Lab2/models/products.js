'use strict';
module.exports = (sequelize, DataTypes) => {
  var products = sequelize.define('products', {
    productname:{
      type: DataTypes.STRING,
      primaryKey: true,
    },
    price:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return products;
};