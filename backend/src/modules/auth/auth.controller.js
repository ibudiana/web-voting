import authService from "./auth.service.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { successResponse } from "../../utils/responses.js";
import { RESPONSE_MESSAGE, HTTP_STATUS } from "../../utils/constants.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const user = await authService.register(req.body);

    return successResponse(
      res,
      user,
      RESPONSE_MESSAGE.CREATED,
      HTTP_STATUS.CREATED,
    );
  });

  login = asyncHandler(async (req, res) => {
    const data = await authService.login(req.body);

    return successResponse(res, data, RESPONSE_MESSAGE.SUCCESS);
  });

  logout = asyncHandler(async (req, res) => {
    const uid = req.user.uid;

    await authService.logout(uid);

    return successResponse(res, null, RESPONSE_MESSAGE.SUCCESS);
  });

  me = asyncHandler(async (req, res) => {
    const uid = req.user?.uid;
    const user = await authService.me(uid);

    return successResponse(res, user, "User data retrieved successfully");
  });

  markHasVoted = asyncHandler(async (req, res) => {
    const uid = req.user.uid;
    await authService.markHasVoted(uid);

    return successResponse(res, null, RESPONSE_MESSAGE.SUCCESS);
  });
}

export default new AuthController();
