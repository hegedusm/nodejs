'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
	Product.hasMany(models.Review, {
		as: 'reviews'
	  });
  };
  return Product;
};