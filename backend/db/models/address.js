"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Address.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [5, 5],
          is: /^\d+$/, // number only
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [10, 10],
          is: /^\d+$/,
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        validate: {
          isUnique(value) {
            return Address.findOne({ where: { userId: value } }).then(
              (userId) => {
                if (userId) {
                  throw new Error(
                    `User id:${userId.userId} has already created Address.`
                  );
                }
              }
            );
          },
        },
        // end validate
      },
      // end userId
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};
