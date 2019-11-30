'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userName: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false}
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};