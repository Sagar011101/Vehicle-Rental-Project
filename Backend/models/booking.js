'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Vehicles',
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {});
  
  Booking.associate = function(models) {
    Booking.belongsTo(models.Vehicle, { foreignKey: 'vehicleId' });
  };
  
  return Booking;
};
