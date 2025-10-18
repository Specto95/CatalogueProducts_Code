import { object, ref, string } from "yup";

export const resetPasswordSchema = object().shape({
  newPassword: string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial."
    )
    .max(128, "La contraseña no puede exceder los 128 caracteres.")
    .matches(/^\S*$/, "La contraseña no debe contener espacios.")
    .required("Contraseña requerida *"),
  confirmNewPassword: string()
    .oneOf([ref("newPassword"), undefined], "Las contraseñas deben coincidir.")
    .required("Confirmación de contraseña requerida *"),
});
