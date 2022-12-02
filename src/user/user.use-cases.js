const User = require("./user.entity");
class ManageUserUsecase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUser(userId) {
    return await this.userRepository.getUser(userId);
  }

  async createUser(newUser) {
    const user = new User(
      undefined,
      newUser.username,
      newUser.completeName,
      newUser.password,
    );
    const userId = await this.userRepository.createUser(user);
    user.userId = userId;

    return user;
  }

  async updateUser(userId, userToUpdate) {
    const instance = this.userRepository.getUser(userId);

    if (!instance) {
        throw new Error("User not found");
    }
    // Update user field values
    Object.assign(instance, userToUpdate);

    await this.userRepository.updateUser(instance);
    
    return instance;
  }

  async deleteUser(userId) {
    await this.userRepository.deleteUser(userId);
  }

  
}

module.exports = ManageUserUsecase;
