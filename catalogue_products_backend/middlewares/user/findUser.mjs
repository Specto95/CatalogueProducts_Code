import { getUserByEmail } from "../../utils/user/user.mjs";

export const findUser = (req, _, next) => {
  if(!req.user){
    const error = new Error("No tienes permisos de usuario");
    error.statusCode = 401;
    throw error;
  }
  const user = getUserByEmail(req.user.email);

  if (!user) {
    const error = new Error("Usuario no encontrado");
    error.statusCode = 404;
    throw error;
  }

  req.foundUser = user;
  next();
};
