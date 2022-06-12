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
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeSave: async (user) => {
          if (user.password) {
            let salt = await bcrypt.genSaltSync(10);
            let hash = await bcrypt.hashSync(user.password, salt);
            user.password = hash;
          }
          if (user.password === "") {
            // when update user with password = empty
            const getUser = await User.findByPk(user.id);
            user.password = getUser.password;
          }
        },
      },
    }
  );
  return User;
};
