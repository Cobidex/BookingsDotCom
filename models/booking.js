import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import User from './user.js';
import Accommodation from './accommodation.js';

class Booking extends Model { }

Booking.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        checkIn: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        checkOut: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        accomo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Accommodation,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Booking',
        tableName: 'Bookings',
    }
);

Booking.belongsTo(User, { foreignKey: 'user_id' });
Booking.belongsTo(Accommodation, { foreignKey: 'accomo_id' });

(async () => {
  try {
    await Booking.sync();
  } catch (error) {
    console.log('Error creating table', error);
  }
})();

export default Booking;
