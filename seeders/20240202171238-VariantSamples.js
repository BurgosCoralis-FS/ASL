'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Variants', [
      { 
        title: 'Galaxy',
        createdAt: "2024-01-25",
        updatedAt: "2024-01-25"
      },
      { 
        title: 'Planet',
        createdAt: "2024-01-25",
        updatedAt: "2024-01-25"
      },
      { 
        title: 'Star',
        createdAt: "2024-01-25",
        updatedAt: "2024-01-25"
      }
    ])},

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Variants', null, {})
  }
};
