import { string, object, ref } from "yup";
import { validateIsEmailAvailable } from "../../api/validateIsEmailAvailable";

export const createRoleSchema = object().shape({
  email: string()
    .email("Correo electrónico inválido")
    .required("Correo obligatorio *")
    .test("email-unique", "Correo no disponible", async function (value) {
      if (!value) return true;

      const isAvailable = await validateIsEmailAvailable(value);
      if (!isAvailable) {
        return this.createError({ message: "Correo no disponible" });
      }

      return true;
    }),
  password: string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "La contraseña debe incluir al menos una mayúscula, una minúscula, un número y un carácter especial."
    )
    .max(128, "La contraseña no puede exceder los 128 caracteres.")
    .matches(/^\S*$/, "La contraseña no debe contener espacios.")
    .required("Contraseña requerida *"),
  confirmPassword: string()
    .oneOf([ref("password"), undefined], "Las contraseñas deben coincidir.")
    .required("Confirmación de contraseña requerida *"),
  role: string()
    .required("Role obligatorio *")
    .is(["ADMIN", "USER"], "Role inválido, debe ser 'ADMIN' o 'USER'"),
});
