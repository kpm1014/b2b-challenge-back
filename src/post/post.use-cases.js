const Post = require("./post.entity");
class ManagePostUsecase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async getPosts() {
    return await this.postRepository.getPosts();
  }

  async getPost(postId) {
    return await this.postRepository.getPost(postId);
  }

  async createPost(newPost) {
    // if (!author) {
    //   throw new Error("Author not found");
    // }

    const post = new Post(
      undefined,
      newPost.title,
      newPost.description,
      newPost.author
    );
    const postId = await this.postRepository.createPost(post);
    post.postId = postId;

    return post;
  }

  async updatePost(postId, postToUpdate) {
    const instance = this.postRepository.getPost(postId);

    if (!instance) {
      throw new Error("Post not found");
    }
    // Update post field values
    Object.assign(instance, postToUpdate);

    await this.postRepository.updatePost(instance);

    return instance;
  }

  async deletePost(postId) {
    await this.postRepository.deletePost(postId);
  }
}

module.exports = ManagePostUsecase;
