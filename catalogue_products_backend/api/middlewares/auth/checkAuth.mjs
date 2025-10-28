export const checkAuth = (req, res, next) => {
  if (!req.isAuth)
    return res.status(401).json({
      message: "Unauthorized",
    });
  next();
};
