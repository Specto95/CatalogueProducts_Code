import { Router } from "express";
// import { checkAuth } from "../middlewares/checkAuth.mjs";
import { checkRole } from "../middlewares/checkRole.mjs";
import { isAuth } from "../middlewares/auth/isAuth.mjs";
import { AuthController } from "../controllers/auth.mjs";
import { findUser } from "../middlewares/user/findUser.mjs";
import { checkUserNotExists } from "../middlewares/user/checkUserNotExists.mjs";

export const authRouter = Router();

// ------ Public routes
authRouter.post("/login", AuthController.login);
authRouter.post("/forgot-password", AuthController.forgotPassword);
authRouter.post("/reset-password", AuthController.resetPassword);
authRouter.post("/is-registered-email", AuthController.isRegisteredEmail);

// ------ Protected routes
authRouter.post(
  "/is-user-authenticated",
  isAuth,
  AuthController.isUserAuthenticated
);
authRouter.post("/logout", isAuth, AuthController.logout);

// ROLE USER
authRouter.post(
  "/create-role",
  isAuth,
  checkRole,
  checkUserNotExists,
  AuthController.createRole
);
authRouter.post(
  "/is-email-available",
  isAuth,
  checkRole,
  AuthController.isEmailAvailable
);
authRouter.post(
  "/change-password",
  isAuth,
  findUser,
  AuthController.changePassword
);
authRouter.post(
  "/is-valid-oldpassword",
  isAuth,
  findUser,
  AuthController.isValidOldPassword
);
