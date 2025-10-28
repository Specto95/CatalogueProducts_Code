import { getUserByEmail } from "../../utils/user/user.mjs";

export const checkUserNotExists = (req, _, next) => {
  const { email } = req.body;
  const user = getUserByEmail(email);

  if (user) {
    const error = new Error("El usuario ya existe");
    error.statusCode = 409;
    throw error;
  }
  next();
};
