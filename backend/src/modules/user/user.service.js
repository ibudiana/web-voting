import userRepository from "./user.repository.js";
import AppError from "../../utils/AppError.js";
import { HTTP_STATUS, RESPONSE_MESSAGE } from "../../utils/constants.js";

class UserService {
  async getAllUsers() {
    const users = await userRepository.findAll();
    return Object.values(users || {});
  }

  async getUserById(id) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError(RESPONSE_MESSAGE.NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return user;
  }

  async createUser(userData) {
    if (!userData.email || !userData.username) {
      throw new AppError(
        RESPONSE_MESSAGE.VALIDATION_ERROR,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
      );
    }

    return await userRepository.create(userData);
  }

  async updateUser(id, userData) {
    await this.getUserById(id);

    return await userRepository.update(id, userData);
  }

  async deleteUser(id) {
    await this.getUserById(id);

    return await userRepository.delete(id);
  }
}

export default new UserService();
