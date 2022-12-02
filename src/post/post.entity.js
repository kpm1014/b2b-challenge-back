class Post {
  static schema = {
    type: "object",
    properties: {
      title: {
        type: "string",
        errorMessage: "must be of string type",
      },
      description: {
        type: "string",
        errorMessage: "must be of string type",
      },
      author: {
        type: "number",
        errorMessage: "must be of User type",
      },
    },
    required: ["title", "description", "author"],
  };
  constructor(postId, title, description, author) {
    this.postId = postId;
    this.title = title;
    this.description = description;
    this.author = author;
  }
}

module.exports = Post;
