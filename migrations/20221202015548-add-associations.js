"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // POST RELATIONS
    await queryInterface.addConstraint("post", {
      fields: ["author"],
      type: "foreign key",
      name: "post_author_fkey",
      references: {
        table: "user",
        field: "userId",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    // COMMENT RELATIONS
    await queryInterface.addConstraint("comment", {
      fields: ["authorId"],
      type: "foreign key",
      name: "comment_author_fkey",
      references: {
        table: "user",
        field: "userId",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("comment", {
      fields: ["postId"],
      type: "foreign key",
      name: "comment_post_fkey",
      references: {
        table: "post",
        field: "postId",
      },
      onDelete: "cascade",
      onUpdate: "cascade",

    }); 

    // USER RELATIONS
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("post", "post_author_fkey");
    await queryInterface.removeConstraint("comment", "comment_author_fkey");
    await queryInterface.removeConstraint("comment", "comment_post_fkey");
  },
};