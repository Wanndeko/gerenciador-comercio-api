'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'tell', {
      type: Sequelize.STRING(20),
      unique: true
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('users', 'tell')
  }
}
