'use strict';
module.exports = (sequelize, DataTypes) => {
  const VehicleType = sequelize.define('VehicleType', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wheels: {
      type: DataTypes.INTEGER, // 2 for bikes, 4 for cars
      allowNull: false
    }
  }, {});
  
  VehicleType.associate = function(models) {
    VehicleType.hasMany(models.Vehicle, { foreignKey: 'typeId' });
  };
  
  return VehicleType;
};
