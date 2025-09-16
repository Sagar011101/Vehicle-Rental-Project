'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Get type IDs
    const types = await queryInterface.sequelize.query(
      `SELECT id, name FROM "VehicleTypes";`
    );
    const typeMap = {};
    types[0].forEach(t => { typeMap[t.name] = t.id; });

    await queryInterface.bulkInsert('Vehicles', [
      { name: 'Royal Enfield Classic', typeId: typeMap['Cruiser'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Harley Davidson Street', typeId: typeMap['Cruiser'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Yamaha R15', typeId: typeMap['Sports'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kawasaki Ninja', typeId: typeMap['Sports'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Maruti Swift', typeId: typeMap['Hatchback'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hyundai i20', typeId: typeMap['Hatchback'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Toyota Fortuner', typeId: typeMap['SUV'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mahindra XUV500', typeId: typeMap['SUV'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Honda City', typeId: typeMap['Sedan'], createdAt: new Date(), updatedAt: new Date() },
      { name: 'Hyundai Verna', typeId: typeMap['Sedan'], createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};