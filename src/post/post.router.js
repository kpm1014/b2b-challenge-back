const express = require("express");
const Post = require("./post.entity");
const validateSchema = require("../infra/http/ajv");

// const elastic = require('elasticsearch');
// const bodyParser = require('body-parser').json();


function createPostsRouter(managePostsUsecase) {
  const router = express.Router();

  router.get("/api/posts", async (req, res) => {
    const posts = await managePostsUsecase.getPosts();
    res.status(200).send(posts);
  });

  router.get("/api/posts/:postId", async (req, res) => {
    const postId = req.params.postId;
    const post = await managePostsUsecase.getPost(postId);

    if (post) {
      res.status(200).send(post);
    } else {
      res.status(404).send(`Post not found`);
    }
  });

  router.post("/api/posts", async (req, res) => {
    validation = validateSchema(Post.schema, req);

    if (validation === true) {
      const post = await managePostsUsecase.createPost(req.body);
      res.status(201).send(post);
    } else {
      res.status(422).send(validation);
    }
  });

  router.put("/api/posts/:postId", async (req, res) => {
    validation = validateSchema(Post.schema, req);

    if (validation === true) {
      const postId = req.params.postId;

      const postFound = await managePostsUsecase.getPost(postId);

      if (postFound) {
        const post = await managePostsUsecase.updatePost(
          postId,
          req.body
        );
        res.status(200).send(post);
      } else {
        res.status(404).send(`Post not found`);
      }
    } else {
      res.status(422).send(validation);
    }
  });

  router.delete("/api/posts/:postId", async (req, res) => {
    const postId = req.params.postId;

    const postFound = await managePostsUsecase.getPost(postId);

    if (postFound) {
      await managePostsUsecase.deletePost(postId);
      res.status(200).send(`Deleted ${postId}`);
    } else {
      res.status(404).send(`Post not found`);
    }
  });

  return router;
}

module.exports = createPostsRouter;