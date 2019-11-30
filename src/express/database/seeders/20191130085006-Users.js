'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert('Users',
    [
      {
        userName: 'test',
        password: 'test',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ],
    {}
	),

  down: (queryInterface, Sequelize) => 
	queryInterface.bulkDelete('Users', null, {})
  
};
