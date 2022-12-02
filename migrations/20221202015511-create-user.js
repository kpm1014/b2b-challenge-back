"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      completeName: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(15),
      },
      createdAt:{
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt:{
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};