"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Orders", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Orders", null, {});
  },
};

let date = { createdAt: new Date(), updatedAt: new Date() };

const data = [
  {
    ...date,
    orderItems: JSON.stringify([
      { id: 18, qty: 1 },
      { id: 24, qty: 1 },
    ]),
    subTotal: 3017,
    shippingPrice: 50,
    Total: 3067,
    paymentStatus: true,
    paymentDate: new Date(),
    shippingStatus: false,
    shippingDate: null,
    userId: 2,
  },
  {
    ...date,
    orderItems: JSON.stringify([{ id: 25, qty: 1 }]),
    subTotal: 2788,
    shippingPrice: 50,
    Total: 2838,
    paymentStatus: true,
    paymentDate: new Date(),
    shippingStatus: true,
    shippingDate: new Date(),
    userId: 2,
  },
];
