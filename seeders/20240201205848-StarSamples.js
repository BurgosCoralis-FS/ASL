'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stars', [{
      id: 1,
      name: "Acrab",
      size: 3,
      description: `Acrab, also designated as β1 Scorpii (beta1 Scorpii), is a variable and multiple main-sequence star in the constellation of Scorpius.`,
      createdAt: "2024-01-25",
      updatedAt: "2024-01-25"
    }])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Stars', null, {})
  }
};
