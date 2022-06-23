"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Products", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};

let date = { createdAt: new Date(), updatedAt: new Date() };
let fakeDesc =
  "Consequatur aut excepturi omnis dicta deserunt vitae cum sunt ipsa. Et pariatur velit odio sapiente nam libero sint. Aut unde aliquid quia distinctio reprehenderit. Dolor aliquid facere ut itaque deleniti aut et. Dolor minima quam ea rem quae qui facilis eos. Animi quos ratione cumque.";

const data = [
  {
    ...date,
    name: "product name 1",
    price: 250.5,
    desc: fakeDesc,
    imageUrl: "/static/images/imageProduct/image_product1.jpg",
  },
  {
    ...date,
    name: "product name 2",
    price: 250.3,
    desc: fakeDesc,
    imageUrl: "/static/images/imageProduct/image_product2.png",
  },
  {
    ...date,
    name: "product name 3",
    price: 300,
    desc: fakeDesc,
    imageUrl: "/static/images/imageProduct/image_product3.png",
  },
  {
    ...date,
    name: "product name 4",
    price: 800,
    desc: fakeDesc,
    imageUrl: "/static/images/imageProduct/image_product4.png",
  },
  {
    ...date,
    name: "product name 5",
    price: 150,
    desc: fakeDesc,
    imageUrl: "/static/images/imageProduct/image_product5.png",
  },
];
