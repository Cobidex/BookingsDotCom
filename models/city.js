import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/db.js';

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
        tableName: 'City',
    }
);

(async () => {
  try {
    await City.sync();
  } catch (error) {
    console.log('Error creating table', error);
  }
})();

export default City;
