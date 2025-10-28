export const checkRole = (req, res, next) => {
  if (!req.isAuth) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  if (req.user.role !== "ADMIN") {
    return res.status(401).json({
      message: "Unauthorized, ADMIN ONLY",
    });
  }
  next();
};
