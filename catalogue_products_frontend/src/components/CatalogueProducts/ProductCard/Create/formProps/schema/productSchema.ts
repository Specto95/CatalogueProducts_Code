import * as Yup from "yup";

export const productSchema = Yup.object({
  title: Yup.string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .required("El título es obligatorio"),
  description: Yup.string()
    .min(5, "La descripción debe tener al menos 5 caracteres")
    .required("La descripción es obligatoria"),
  price: Yup.number()
    .typeError("El precio debe ser un número")
    .positive("El precio debe ser mayor a 0")
    .required("El precio es obligatorio"),
  category: Yup.string()
    .oneOf(["beauty", "fragances", "furniture"], "Categoría inválida")
    .required("La categoría es obligatoria"),
});
