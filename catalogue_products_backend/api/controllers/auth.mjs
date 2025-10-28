import {
  validateChangePassword,
  validateRegister,
} from "./validations/authValidations.mjs";
import { AuthModel } from "../models/auth.mjs";

export class AuthController {
  static async createRole(req, res) {
    const result = validateRegister(req.body);

    if (!result.success) {
      return res.status(422).json({
        message: JSON.stringify(result.error.message),
        errors: result.error.errors,
      });
    }

    try {
      const registerResult = await AuthModel.createRole({ input: result.data });

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        user: registerResult,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        message: error.message || "Error al registrar usuario",
      });
    }
  }

  static async isEmailAvailable(req, res) {
    const { email } = req.body;

    try {
      const user = await AuthModel.isEmailAvailable({ email });

      res.status(200).json({
        message: !user,
      });
    } catch (error) {
      // console.error("Error al validar email:", error);

      return res.status(error.statusCode || 500).json({
        message: error.message || "Error al validar email",
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const { token, user } = await AuthModel.login({ email, password });

      return res.status(200).json({
        message: "Inicio de sesión exitoso",
        token,
        user,
      });
    } catch (error) {
      // console.error("Error en login:", error);

      return res.status(error.statusCode || 500).json({
        message: error.message || "Error en el inicio de sesión",
      });
    }
  }

  static async logout(req, res) {
    const authHeader = req.get("Authorization");
    const token = authHeader.split(" ")[1];

    try {
      await AuthModel.logout({ token });
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      // console.error("Error de logout:", error);

      return res.status(error.statusCode || 500).json({
        message: error.message || "Error al salir de sesión",
      });
    }
  }

  static async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      const { user } = await AuthModel.forgotPassword({ email });
      res.status(201).json({
        message:
          "Instrucciones para restablecer la contraseña enviadas al correo",
        user,
      });
    } catch (error) {
      // console.error("Error de recuperación contraseña", error);

      return res.status(error.statusCode || 500).json({
        message: error.message || "Error de recuperación contraseña",
      });
    }
  }

  static async isValidOldPassword(req, res) {
    try {
      const { oldPassword } = req.body;
      const user = req.foundUser;

      await AuthModel.isValidOldPassword({
        user,
        oldPassword,
      });

      return res.status(200).json({
        message: true,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Error al verificar contraseña antigua",
      });
    }
  }

  static async changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
    const user = req.foundUser;
    try {
      const result = validateChangePassword(req.body);

      if (!result.success) {
        return res.status(422).json({
          message: JSON.parse(result.error.message),
          errors: result.error.errors,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }

    try {
      const changePasswordResult = await AuthModel.changePassword({
        user,
        oldPassword,
        newPassword,
      });

      return res.status(200).json({
        message: "Contraseña cambiada exitosamente",
        user: changePasswordResult,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Error al verificar contraseña antigua",
      });
    }
  }

  static async resetPassword(req, res) {
    const { email, newPassword } = req.body;

    try {
      const resetPasswordResult = await AuthModel.resetPassword({
        email,
        newPassword,
      });
      res.status(201).json({
        message: "Contraseña restablecida exitosamente",
        user: resetPasswordResult,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Error al verificar contraseña antigua",
      });
    }
  }

  static async isUserAuthenticated(req, res) {
    if (req.isAuth) {
      res.status(200).send(true);
      return;
    }
    res.status(401).send(false);
  }

  static async isRegisteredEmail(req, res) {
    const { email } = req.body;
    try {
      const isRegisteredEmailResult = await AuthModel.isRegisteredEmail({
        email,
      });
      return res.status(isRegisteredEmailResult ? 200 : 404).json({
        message: isRegisteredEmailResult,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        message: error.message || "Error al verificar contraseña antigua",
      });
    }
  }
}
