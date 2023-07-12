import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db.js';

class User extends Model {
  getName() {
    return `${this.firstName} ${this.lastName}`;
  }

  toJson() {
    return {
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
      phonenumber: this.phoneNumber,
      isAdmin: this.isAdmin,
    };
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
  }
);

sequelize.sync();

export default User;
