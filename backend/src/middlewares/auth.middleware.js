import { adminAuth } from "../config/firebaseAdmin.js";
import AppError from "../utils/AppError.js";
import { HTTP_STATUS } from "../utils/constants.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }

    const token = authHeader.split(" ")[1];

    // Verifikasi token
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (err) {
      console.error("verifyIdToken failed:", err);
      throw new AppError(
        "Unauthorized or invalid token",
        HTTP_STATUS.UNAUTHORIZED,
      );
    }

    // Simpan info user di req.user
    req.user = decodedToken;

    next();
  } catch (err) {
    next(
      new AppError(
        err.message || "Unauthorized or invalid token",
        HTTP_STATUS.UNAUTHORIZED,
      ),
    );
  }
};
