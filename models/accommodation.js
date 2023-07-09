import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';
import City from './city.js';

class Accommodation extends Model { }

Accommodation.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        pricePerNight: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        availableDates: {
            type: DataTypes.TEXT,
        },
        cityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: City,
                key: 'id',
            },
        },
        rating: {
            type: DataTypes.DECIMAL(3, 1),
            defaultValue: 0.0, 
        },
    },
    {
        sequelize,
        modelName: 'Accommodation',
        tableName: 'Accommodation',
    }
);

(async () => {
    try {
        await Accommodation.sync();
    } catch (error) {
        console.log('Error creating table', error);
    }
})();

export default Accommodation;
