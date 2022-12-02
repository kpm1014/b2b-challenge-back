const { DataTypes } = require("sequelize");
class SequelizeUserRepository {
  columns = {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING(15),
    },
    completeName: {
      allowNull: false,
      type: DataTypes.STRING(60),
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING(15),
    }
  };

  constructor(sequelizeClient) {
    this.sequelizeClient = sequelizeClient;

    let tableName = "user";

    const options = {
      tableName: tableName,
      timestamps: true,
    };

    this.userModel = sequelizeClient.sequelize.define("user", this.columns, options);


    this.userModel.associate = (models) => {
      this.userModel.hasMany(models.post, {
        foreignKey: "postId",
        as: "Posts",
        foreignKeyConstraint: true,
      });
      this.userModel.hasMany(models.comment, { 
        foreignKey: "commentId",
        as: "Comments",
        foreignKeyConstraint: true,
      })
    };

  }

  getTableName() {
    return this.tableName;
  }

  async getUsers() {
    const users = await this.userModel.findAll({
      raw: true,
    });

    return users;
  }

  async getUser(userId) {
    return await this.userModel.findByPk(userId);
  }

  async createUser(user) {
    const data = await this.userModel.create(user);
    return data.userId;
  }

  async updateUser(user) {
    const options = {
      where: {
        userId: user.userId,
      },
    };

    await this.userModel.update(user, options);
  }

  async deleteUser(userId) {
    const options = {
      where: {
        userId: userId,
      },
    };

    await this.userModel.destroy(options);
  }
}

module.exports = SequelizeUserRepository;
