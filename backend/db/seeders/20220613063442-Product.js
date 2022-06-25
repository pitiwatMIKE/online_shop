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

const data = [];

for (let i = 1; i <= 26; i++) {
  data.push({
    ...date,
    name: `product name ${i}`,
    price: Math.floor(Math.random()*(3000-700+1)+700),
    desc: fakeDesc,
    imageProduct: `/static/images/imageProduct/image_product${i}.png`,
  });
}
