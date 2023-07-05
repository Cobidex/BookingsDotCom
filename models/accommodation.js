const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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
        },
        rating: {
            type: DataTypes.DECIMAL(3, 1),
        },
    },
    {
        sequelize,
        modelName: 'Accommodation',
        timestamps: false,
    }
);

module.exports = Accommodation;
