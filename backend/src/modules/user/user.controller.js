import userService from "./user.service.js";
import { successResponse } from "../../utils/responses.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { HTTP_STATUS, RESPONSE_MESSAGE } from "../../utils/constants.js";

class UserController {
  getAll = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();
    return successResponse(res, users);
  });

  getById = asyncHandler(async (req, res) => {
    const user = await userService.getUserById(req.params.id);
    return successResponse(res, user);
  });

  create = asyncHandler(async (req, res) => {
    const user = await userService.createUser(req.body);
    return successResponse(
      res,
      user,
      RESPONSE_MESSAGE.CREATED,
      HTTP_STATUS.CREATED,
    );
  });

  update = asyncHandler(async (req, res) => {
    const user = await userService.updateUser(req.params.id, req.body);
    return successResponse(res, user, RESPONSE_MESSAGE.UPDATED);
  });

  delete = asyncHandler(async (req, res) => {
    await userService.deleteUser(req.params.id);
    return successResponse(res, null, RESPONSE_MESSAGE.DELETED, HTTP_STATUS.OK);
  });
}

export default new UserController();
