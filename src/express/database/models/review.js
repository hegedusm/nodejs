'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    text: DataTypes.STRING,
    productId: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
	Review.belongsTo(models.Product, {
		foreignKey: 'productId',
		as: 'product'
	  });
  };
  return Review;
};