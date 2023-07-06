const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');
const Accomodation = require('./accomodation');

class Booking extends Model {};

Booking.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataType.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }
  {
    sequelize,
    modelName: 'Booking',
    tableName: 'bookings',
  }
};

Booking.belongsTo(Accommodation);
Booking.belongsTo(User);

module.exports = Booking;
