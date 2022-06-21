"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Order.init(
    {
      orderItems: DataTypes.JSON,
      subTotal: DataTypes.FLOAT,
      shippingPrice: DataTypes.FLOAT,
      total: DataTypes.FLOAT,
      paymentStatus: DataTypes.BOOLEAN,
      shippingStatus: DataTypes.BOOLEAN,
      paymentDate: DataTypes.DATE,
      shippingDate: DataTypes.DATE,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
