'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'VehicleTypes',
        key: 'id'
      }
    }
  }, {});
  
  Vehicle.associate = function(models) {
    Vehicle.belongsTo(models.VehicleType, { foreignKey: 'typeId' });
    Vehicle.hasMany(models.Booking, { foreignKey: 'vehicleId' });
  };
  
  return Vehicle;
};
