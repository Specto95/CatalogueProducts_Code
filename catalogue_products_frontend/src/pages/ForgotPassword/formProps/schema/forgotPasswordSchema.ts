import { object, string } from "yup";
import { validateIsEmailUnavailable } from "./helpers/validateIsEmailUnavailable";

export const forgotPasswordSchema = object().shape({
  email: string()
    .email("Email inválido")
    .required("El email es obligatorio")
    .test("email-unique", "Correo no disponible", async function (value) {
      if (!value) return true;

      const isRegistered = await validateIsEmailUnavailable(value);
      if (!isRegistered) {
        return this.createError({
          message: "Este correo no existe en el sistema",
        });
      }

      return true;
    }),
});
