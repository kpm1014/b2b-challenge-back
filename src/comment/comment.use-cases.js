const Comment = require("./comment.entity");

class ManageCommentUsecase {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  async getComments() {
    return await this.commentRepository.getComments();
  }

  async getComment(commentId) {
    return await this.commentRepository.getComment(commentId);
  }

  async createComment(newComment) {
    const comment = new Comment(
      undefined,
      newComment.authorId,
      newComment.commentary,
      newComment.postId,
    );
    const commentId = await this.commentRepository.createComment(comment);
    comment.commentId = commentId;

    return comment;
  }

  async updateComment(commentId, commentToUpdate) {
    const instance = this.commentRepository.getComment(commentId);

    if (!instance) {
      throw new Error("Comment not found");
    }
    // Update comment field values

    Object.assign(instance, commentToUpdate);
    
    await this.commentRepository.updateComment(instance);

    return instance;
  }

  async deleteComment(commentId) {
    await this.commentRepository.deleteComment(commentId);
  }
}

module.exports = ManageCommentUsecase;
