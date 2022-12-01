const Post = require("./post.entity");

class ManagePostUsecase {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async getPosts() {
    return await this.postRepository.getPosts();
  }

  async getPost(id) {
    return await this.postRepository.getPost(id);
  }

  async createPost(data) {
    return;
  }

  async updatePost(id, data) {
    return;
  }

  async deletePost(id) {
    await this.postRepository.deletePost(id);
  }
}

module.exports = ManagePostUsecase;
