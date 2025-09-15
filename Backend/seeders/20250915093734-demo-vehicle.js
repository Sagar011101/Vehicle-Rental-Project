'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Vehicles', [
      { name: 'Honda City', typeId: 1, createdAt: new Date(), updatedAt: new Date() }, // Sedan
      { name: 'Hyundai Creta', typeId: 2, createdAt: new Date(), updatedAt: new Date() }, // SUV
      { name: 'Maruti Swift', typeId: 3, createdAt: new Date(), updatedAt: new Date() }, // Hatchback
      { name: 'Royal Enfield Classic', typeId: 4, createdAt: new Date(), updatedAt: new Date() }, // Cruiser
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Vehicles', null, {});
  }
};
