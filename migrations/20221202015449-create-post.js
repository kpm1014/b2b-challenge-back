"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("post", {
      postId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(60),
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      author: {
        // FK
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("post");
  },
};
