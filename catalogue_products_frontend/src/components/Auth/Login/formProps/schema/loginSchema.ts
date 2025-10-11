import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("El correo electrónico no es válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .required("La contraseña es obligatoria"),
});