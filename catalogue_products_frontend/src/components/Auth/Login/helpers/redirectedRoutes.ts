const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const redirectedRoutes = [
  "/reset-password",
  `/reset-password?email=${emailRegex.source}`,
  "/forgot-password",
];
