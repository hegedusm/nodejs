'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('Products',
    [
      {
		name: 'testProduct',
		createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {}
	),

  down: (queryInterface, Sequelize) => 
    queryInterface.bulkDelete('Products', null, {})
  
};
