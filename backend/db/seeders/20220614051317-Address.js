"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Addresses", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Addresses", null, {});
  },
};

let date = { createdAt: new Date(), updatedAt: new Date() };

const data = [
  {
    ...date,
    email: "mike@gmail.com",
    firstName: "pitiwat",
    lastName: "promnimit",
    address: "135 m.3 uon pua",
    city: "pua",
    province: "nan",
    postalCode: "55120",
    phone: "1234567890",
    userId: 1,
  },
];
