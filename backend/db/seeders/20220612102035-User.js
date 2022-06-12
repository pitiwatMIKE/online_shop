"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

let date = { createdAt: new Date(), updatedAt: new Date() };

const data = [
  {
    ...date,
    firstName: "admin",
    lastName: "myAdmin",
    email: "admin@example.com",
    password: 123456,
    role: "admin",
  },
  {
    ...date,
    firstName: "user",
    lastName: "myUser",
    email: "user@example.com",
    password: 123456,
    role: "user",
  },
];
