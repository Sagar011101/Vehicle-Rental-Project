'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Cruiser', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sports', wheels: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hatchback', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'SUV', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sedan', wheels: 4, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};