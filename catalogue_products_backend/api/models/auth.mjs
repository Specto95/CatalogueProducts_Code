import { users, activeTokens } from "../users.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { getUserByEmail } from "../utils/user/user.mjs";

export class AuthModel {
  static async createRole({ input }) {
    const { email, password, role } = input;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role: role.toUpperCase() === "ADMIN" ? "ADMIN" : "USER",
    };
    users.push(user);

    return user;
  }

  static async isEmailAvailable({ email }) {
    const user = getUserByEmail(email);
    if (!user) {
      return user;
    }
    const error = new Error("Usuario ya existente");
    error.statusCode = 409;
    throw error;
  }

  static async login({ email, password }) {
    const user = getUserByEmail(email);

    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Contraseña incorrecta");
      error.statusCode = 422;
      throw error;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    activeTokens.add(token);

    return { token, user };
  }

  static async logout({ token }) {
    if (!token) {
      const error = new Error("Usuario no autenticado");
      error.statusCode = 401;
      throw error;
    }
    if (!activeTokens.has(token)) {
      const error = new Error("Token expirado");
      error.statusCode = 401;
      throw error;
    }

    activeTokens.delete(token);
  }

  static async forgotPassword({ email }) {
    const user = getUserByEmail(email);

    if (!user) {
      const error = new Error("Usuario no encontrado");
      error.statusCode = 404;
      throw error;
    }

    const confirmationCode = crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase();

    user.resetCode = confirmationCode;

    return { user };
  }

  static async isValidOldPassword({ user, oldPassword }) {
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      const error = new Error("Contraseña antigua incorrecta");
      error.statusCode = 401;
      throw error;
    }

    return true;
  }

  static async changePassword({ user, oldPassword, newPassword }) {
    const isMatch = bcrypt.compareSync(oldPassword, user.password);
    if (!isMatch) {
      const error = new Error("Contraseña antigua incorrecta");
      error.statusCode = 401;
      throw error;
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;

    return user;
  }

  static async resetPassword({ email, newPassword }) {
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(404).text("Usuario no encontrado");

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;

    return user;
  }

  static async isUserAuthenticated() {}

  static async isRegisteredEmail({ email }) {
    const user = getUserByEmail(email);
    if (user) {
      return true;
    }
    return false;
  }
}
