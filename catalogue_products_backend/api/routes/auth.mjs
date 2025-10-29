import { Router } from "express";
import { checkRole } from "../middlewares/checkRole.mjs";
import { isAuth } from "../middlewares/auth/isAuth.mjs";
import { AuthController } from "../controllers/auth.mjs";
import { findUser } from "../middlewares/user/findUser.mjs";
import { checkUserNotExists } from "../middlewares/user/checkUserNotExists.mjs";

export const createAuthRouter = ({ authModel }) => {
  const authRouter = Router();

  const authController = new AuthController({ authModel });

  // ------ Public routes
  authRouter.post("/login", authController.login);
  authRouter.post("/forgot-password", authController.forgotPassword);
  authRouter.post("/reset-password", authController.resetPassword);
  authRouter.post("/is-registered-email", authController.isRegisteredEmail);

  // ------ Protected routes
  authRouter.post(
    "/is-user-authenticated",
    isAuth,
    authController.isUserAuthenticated
  );
  authRouter.post("/logout", isAuth, authController.logout);

  // ROLE USER
  authRouter.post(
    "/create-role",
    isAuth,
    checkRole,
    checkUserNotExists,
    authController.createRole
  );
  authRouter.post(
    "/is-email-available",
    isAuth,
    checkRole,
    authController.isEmailAvailable
  );
  authRouter.post(
    "/change-password",
    isAuth,
    findUser,
    authController.changePassword
  );
  authRouter.post(
    "/is-valid-oldpassword",
    isAuth,
    findUser,
    authController.isValidOldPassword
  );

  return authRouter;
};
