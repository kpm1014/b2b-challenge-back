const express = require("express");
const User = require("./user.entity");
const validateSchema = require("../infra/http/ajv");

function createUsersRouter(manageUsersUsecase) {
  const router = express.Router();

  router.get("/api/users", async (req, res) => {
    const users = await manageUsersUsecase.getUsers();
    res.status(200).send(users);
  });

  router.get("/api/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await manageUsersUsecase.getUser(id);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send(`User not found`);
    }
  });

  router.post("/api/users", async (req, res) => {
    validation = validateSchema(User.schema, req);

    if (validation === true) {
      const user = await manageUsersUsecase.createUser(req.body);
      res.status(201).send(user);
    } else {
      res.status(422).send(validation);
    }
  });

  router.put("/api/users/:id", async (req, res) => {
    validation = validateSchema(User.schema, req);

    if (validation === true) {
      const id = req.params.id;

      const userFound = await manageUsersUsecase.getUser(id);

      if (userFound) {
        const user = await manageUsersUsecase.updateUser(
          id,
          req.body
        );
        res.status(200).send(user);
      } else {
        res.status(404).send(`User not found`);
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete("/api/users/:id", async (req, res) => {
    const id = req.params.id;

    const userFound = await manageUsersUsecase.getUser(id);

    if (userFound) {
      await manageUsersUsecase.deleteUser(id);
      res.status(200).send(`Deleted ${id}`);
    } else {
      res.status(404).send(`User not found`);
    }
  });

  return router;
}

module.exports = createUsersRouter;