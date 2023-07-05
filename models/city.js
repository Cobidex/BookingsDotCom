const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class City extends Model { }

City.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'City',
        tableName: 'Cities',
    }
);

module.exports = City;
