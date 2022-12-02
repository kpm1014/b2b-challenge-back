const { DataTypes } = require("sequelize");

class SequelizeCommentRepository {
  columns = {
    commentId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    authorId: {
      // FK
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    commentary: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isAccepted: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  };

  constructor(sequelizeClient) {
    this.sequelizeClient = sequelizeClient;

    let tableName = "comment";

    const options = {
      tableName: tableName,
      timestamps: true,
    };

    this.commentModel = sequelizeClient.sequelize.define(
      "comment",
      this.columns,
      options
    );

    this.commentModel.associate = (models) => {
      this.postModel.belongsTo(models.user, {
        foreignKey: "authorId",
        as: "Author",
      });
      this.commentModel.belongsTo(models.post, {
        foreignKey: "postId",
        as: "Post",
      });
    };
  }

  getTableName() {
    return this.tableName;
  }

  async getComments() {
    const comments = await this.commentModel.findAll({
      raw: true,
    });

    return comments;
  }

  async getComment(commentId) {
    return await this.commentModel.findByPk(commentId);
  }

  async createComment(comment) {
    const data = await this.commentModel.create(comment);
    return data.commentId;
  }

  async updateComment(comment) {
    const options = {
      where: {
        commentId: comment.commentId,
      },
    };

    await this.commentModel.update(comment, options);
  }

  async deleteComment(commentId) {
    const options = {
      where: {
        commentId: commentId,
      },
    };

    await this.commentModel.destroy(options);
  }
}

module.exports = SequelizeCommentRepository;
