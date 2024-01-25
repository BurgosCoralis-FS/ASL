'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Stars', 'PlanetId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Planets'
        },
        key: 'id'
      },
      allowNull: true
    })

    await queryInterface.addColumn('Galaxies', 'StarId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Stars'
        },
        key: 'id'
      },
      allowNull: true
    })

    await queryInterface.addColumn('Stars', 'GalaxyId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Galaxies'
        },
        key: 'id'
      },
      allowNull: true
    })
  },
  

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Stars', 'PlanetId')
    await queryInterface.removeColumn('Galaxies', 'StarId')
    await queryInterface.removeColumn('Stars', 'GalaxyId')
  }
};
