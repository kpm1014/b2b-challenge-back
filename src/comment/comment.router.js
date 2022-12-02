const express = require("express");
const Comment = require("./comment.entity");
const validateSchema = require("../infra/http/ajv");

function createCommentRouter(manageCommentUsecase) {
  const router = express.Router();

  router.get("/api/comment", async (req, res) => {
    const comment = await manageCommentUsecase.getComments();
    res.status(200).send(comment);
  });

  router.get("/api/comment/:id", async (req, res) => {
    const id = req.params.id;
    const comment = await manageCommentUsecase.getComment(id);

    if (comment) {
      res.status(200).send(comment);
    } else {
      res.status(404).send(`Comment not found`);
    }
  });

  router.post("/api/comment", async (req, res) => {
    validation = validateSchema(Comment.schema, req);

    if (validation === true) {
      const comment = await manageCommentUsecase.createComment(req.body);
      res.status(201).send(comment);
    } else {
      res.status(422).send(validation);
    }
  });

  router.put("/api/comment/:id", async (req, res) => {
    validation = validateSchema(Comment.schema, req);

    if (validation === true) {
      const id = req.params.id;

      const commentFound = await manageCommentUsecase.getComment(id);

      if (commentFound) {
        const comment = await manageCommentUsecase.updateComment(
          id,
          req.body
        );

        res.status(200).send(comment);
      } else {
        res.status(404).send(`Comment not found`);
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete("/api/comment/:id", async (req, res) => {
    const id = req.params.id;

    const commentFound = await manageCommentUsecase.getComment(id);

    if (commentFound) {
      await manageCommentUsecase.deleteComment(id);
      res.status(200).send(`Deleted ${id}`);
    } else {
      res.status(404).send(`Comment not found`);
    }
  });

  return router;
}

module.exports = createCommentRouter;
