import jwt from "jsonwebtoken";
import { activeTokens } from "../../users.mjs";

export const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const bearerValue = authHeader.split(" ")[1];
  if (!bearerValue || bearerValue === "") {
    req.isAuth = false;
    return next();
  }

  if (!activeTokens.has(bearerValue)) {
    req.isAuth = false;
    return next();
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(bearerValue, process.env.JWT_SECRET);
  } catch (err) {
  }
  
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.user = decodedToken;
  next();
};
