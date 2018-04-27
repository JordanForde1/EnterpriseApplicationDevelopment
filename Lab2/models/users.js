'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username:{
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: DataTypes.STRING,
    accesskey: DataTypes.STRING,
    secretkey: DataTypes.STRING, 
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    timestamps: false
  });
  return users;
};