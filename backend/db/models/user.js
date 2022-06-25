"use strict";
const bcrypt = require("bcryptjs");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    async comparePassword(passwordInput) {
      return await bcrypt.compare(passwordInput, this.password);
    }

    static associate(models) {
      // define association here
      User.hasOne(models.Address, { foreignKey: "userId" });
      User.hasMany(models.Order, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },

      password: {
        type: DataTypes.STRING,
        validate: {
          isMoreThan(value) {
            if (String(value).length < 6) {
              throw new Error(
                "The password must be at least 6 characters in length"
              );
            }
          },
        },
      },

      firstName: DataTypes.STRING,

      lastName: DataTypes.STRING,

      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["user", "admin"]],
            msg: "Role Must be user or admin",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeSave: async (user) => {
          const getUser = await User.findByPk(user.id);
          if (getUser !== null && user.password === getUser.password) {
            // when update with password === ""
            user.password = getUser.password;
          } else {
            let salt = await bcrypt.genSaltSync(10);
            let hash = await bcrypt.hashSync(user.password, salt);
            user.password = hash;
          }
        },
      },
    }
  );
  return User;
};
