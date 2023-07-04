const { Model, DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

class User extends Model {
  getName {
    return `${this.firstName} ${this.lastName}`;
  }
}

User.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Users'
});

(async () => {
  await User.sync();
})();

module.exports = User;
