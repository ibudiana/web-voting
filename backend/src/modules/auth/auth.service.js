import authRepository from "./auth.repository.js";
import AppError from "../../utils/AppError.js";
import { HTTP_STATUS, RESPONSE_MESSAGE } from "../../utils/constants.js";

class AuthService {
  async register(data) {
    const { email, password, nik, fullName, username } = data;

    if (!email || !password || !nik || !fullName || !username) {
      throw new AppError(
        RESPONSE_MESSAGE.VALIDATION_ERROR,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
      );
    }

    return await authRepository.register({
      email,
      password,
      nik,
      fullName,
      username,
    });
  }

  async login(data) {
    const { email, password } = data;

    if (!email || !password) {
      throw new AppError(
        RESPONSE_MESSAGE.VALIDATION_ERROR,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
      );
    }

    return await authRepository.login(email, password);
  }

  async logout(uid) {
    if (!uid) {
      throw new AppError(
        RESPONSE_MESSAGE.UNAUTHORIZED,
        HTTP_STATUS.UNAUTHORIZED,
      );
    }

    await authRepository.logout(uid);

    return {
      message: RESPONSE_MESSAGE.SUCCESS,
    };
  }

  async me(uid) {
    if (!uid) {
      throw new AppError("User not found", HTTP_STATUS.UNAUTHORIZED);
    }

    const user = await authRepository.getUserByUid(uid);

    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    return user;
  }

  async markHasVoted(uid) {
    if (!uid) {
      throw new AppError("User not found", HTTP_STATUS.UNAUTHORIZED);
    }

    await authRepository.markHasVoted(uid);

    return {
      message: RESPONSE_MESSAGE.SUCCESS,
    };
  }
}

export default new AuthService();
