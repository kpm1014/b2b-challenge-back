class Comment {
  static schema = {
    type: "object",
    properties: {
      authorId: {
        type: "number",
        errorMessage: "must be of number type",
      },
      commentary: {
        type: "string",
        errorMessage: "must be of string type",
      },
      isAccepted: {
        type: "boolean",
        errorMessage: "must be of boolean type",
      },
      postId: {
        type: "number",
        errorMessage: "must be of number type",
      },
    },
    required: ["authorId", "commentary", "postId", "isAccepted"],
  };
  constructor(commentId, authorId, commentary, postId) {
    this.commentId = commentId;
    this.authorId = authorId;
    this.commentary = commentary;
    this.postId = postId;
    this.isAccepted = false;
  }
}

module.exports = Comment;
