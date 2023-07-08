const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./user');
const Accommodation = require('./accommodation');

class Review extends Model { }

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        accomo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
    },
    {
        sequelize,
        modelName: 'Review',
        tableName: 'Review',
        timestamps: true,
    }
);

Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Accommodation, { foreignKey: 'accomo_id' });

module.exports = Review;
