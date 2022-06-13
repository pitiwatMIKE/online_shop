"use strict";
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);

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
    password: bcrypt.hashSync("123456", salt),
    role: "admin",
  },
  {
    ...date,
    firstName: "user",
    lastName: "myUser",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", salt),
    role: "user",
  },
];
