"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("comment", {
      commentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      authorId: {
        // FK
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      commentary: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isAccepted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      postId: {
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
    await queryInterface.dropTable("comment");
  },
};
