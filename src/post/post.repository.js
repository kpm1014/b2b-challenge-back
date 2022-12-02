const { DataTypes } = require("sequelize");
class SequelizePostRepository {
  columns = {
    postId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING(60),
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    author: {
      // FK
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  };

  constructor(sequelizeClient) {
    this.sequelizeClient = sequelizeClient;

    let tableName = "post";

    const options = {
      tableName: tableName,
      timestamps: true,
    };

    this.postModel = sequelizeClient.sequelize.define("post", this.columns, options);

    this.postModel.associate = (models) => {
      this.postModel.belongsTo(models.user, {
        foreignKey: "author",
        as: "Author",
      });
      this.postModel.hasMany(models.comment, {
        foreignKey: "postId",
        as: "Comments",
        foreignKeyConstraint: true,
      });
    };
  }

  getTableName() {
    return this.tableName;
  }

  async getPosts() {
    const posts = await this.postModel.findAll({
      raw: true,
    });

    return posts;
  }

  async getPost(postId) {
    return await this.postModel.findByPk(postId);
  }

  async createPost(post) {
    const data = await this.postModel.create(post);
    return data.postId;
  }

  async updatePost(post) {
    const options = {
      where: {
        postId: post.postId,
      },
    };

    await this.postModel.update(post, options);
  }

  async deletePost(postId) {
    const options = {
      where: {
        postId: postId,
      },
    };

    await this.postModel.destroy(options);
  }
}

module.exports = SequelizePostRepository;
