import { HTTP_STATUS, RESPONSE_MESSAGE } from "./constants.js";

export const successResponse = (
  res,
  data = null,
  message = RESPONSE_MESSAGE.SUCCESS,
  statusCode = HTTP_STATUS.OK,
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
