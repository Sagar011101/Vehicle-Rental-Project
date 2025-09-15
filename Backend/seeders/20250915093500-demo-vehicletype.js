'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Bike', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Car', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Truck', wheels: 6, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};
