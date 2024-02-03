'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Galaxies', [{
      id: 1,
      name: "Milky Way",
      size: 100000,
      description: `The Milky Way is a huge collection of stars, dust and gas. It's called a spiral galaxy because if you could view it from the top or bottom, it would look like a spinning pinwheel.`,
      createdAt: "2024-01-25",
      updatedAt: "2024-01-25"
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Galaxies', null, {})
  }
};
