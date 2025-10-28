import { object, ref, string } from "yup";
import { validateOldPassword } from "./api/validateOldPassword";

export const changePasswordSchema = (email: string, token: string) =>
  object().shape({
    oldPassword: string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .required("Contraseña requerida *")
      .test(
        "old-password-valid",
        "La contraseña antigua es incorrecta",
        async (value, context) => {
          if (!value) return true;
          const isValid = await validateOldPassword(email, value, token);
          if (!isValid)
            return context.createError({
              message: "Contraseña antigua incorrecta",
            });
          return true;
        }
      ),
    newPassword: string()
      .min(8, "La contraseña debe tener al menos 8 caracteres.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Debe incluir mayúscula, minúscula, número y carácter especial."
      )
      .max(128, "No puede exceder los 128 caracteres.")
      .matches(/^\S*$/, "No debe contener espacios.")
      .required("Contraseña requerida *"),
    confirmNewPassword: string()
      .oneOf([ref("newPassword")], "Las contraseñas deben coincidir.")
      .required("Confirmación de contraseña requerida *"),
  });
