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
    email: "user@gmail.com",
    firstName: "pitiwat",
    lastName: "promnimit",
    address: "64/19 m.1 Subsumboon apartment",
    city: "Mueang",
    province: "Chiang Mai",
    postalCode: "50300",
    phone: "0873451287",
    userId: 2,
  },
];
