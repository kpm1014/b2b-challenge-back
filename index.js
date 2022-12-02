const createExpressApp = require("./src/infra/http/express");
const SequelizeClient = require("./src/infra/db/sequelize");

const createPostRouter = require("./src/post/post.router");
const ManagePostUsecase = require("./src/post/post.use-cases");
const SequelizePostRepository = require("./src/post/post.repository");

const createUserRouter = require("./src/user/user.router");
const ManageUserUsecase = require("./src/user/user.use-cases");
const SequelizeUserRepository = require("./src/user/user.repository");

const createCommentRouter = require("./src/comment/comment.router");
const ManageCommentUsecase = require("./src/comment/comment.use-cases");
const SequelizeCommentRepository = require("./src/comment/comment.repository");

const sequelizeClient = new SequelizeClient();

const sequelizePostRepository = new SequelizePostRepository(sequelizeClient);
const managePostUsecase = new ManagePostUsecase(sequelizePostRepository);

const sequelizeUserRepository = new SequelizeUserRepository(sequelizeClient);
const manageUserUsecase = new ManageUserUsecase(sequelizeUserRepository);

const sequelizeCommentRepository = new SequelizeCommentRepository(
  sequelizeClient
);
const manageCommentUsecase = new ManageCommentUsecase(
  sequelizeCommentRepository
);

sequelizeClient.syncDatabase();

let routers = [
    createPostRouter(managePostUsecase),
    createUserRouter(manageUserUsecase),
    createCommentRouter(manageCommentUsecase),
];

const app = createExpressApp(routers);

module.exports = app;
