'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
  queryInterface.bulkInsert('Reviews',
    [
      {
        text: 'testReview1',
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
	  },
	  {
        text: 'testReview2',
        productId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {}
  ),

  down: (queryInterface, Sequelize) => 
	queryInterface.bulkDelete('Reviews', null, {})
  
};
