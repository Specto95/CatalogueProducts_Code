import z from "zod";

export const createProductSchema = z.object({
  id: z.int({
    invalid_type_error: "Wrong ID type",
    required_error: "ID required",
  }),
  title: z
    .string({
      invalid_type_error: "Title must be a string",
      required_error: "Title is required.",
    })
    .min(3, {
      message: "Title must be at least 3 characters long",
    }),
  description: z
    .string({
      invalid_type_error: "description must be a string",
    })
    .min(5, {
      message: "description must be at least 5 characters long",
    }),
  price: z
    .int({
      invalid_type_error: "Wrong price type",
      required_error: "price required",
    })
    .min(1, { error: "Price must at least be 1" }),
  category: z.preprocess(
    (val) => (typeof val === "string" ? val.toLocaleLowerCase() : val),
    z.enum(["beauty", "fragances", "furniture", "groceries"], {
      required_error: "category is required.",
      invalid_type_error: "Wrong category type",
    })
  ),
  thumbnail: z
    .string()
    .url("Debe ser una URL válida")
    .regex(/\.(jpg|jpeg|png|gif|bmp|svg|webp)$/i, {
      message: "La URL debe terminar con una extensión de imagen válida",
    }),
});

export const deleteProductSchema = z.object({
  id: z.string({
    invalid_type_error: "Wrong ID type",
    required_error: "ID required",
  }),
});

export function validateProductSchema(object) {
  return createProductSchema.safeParse(object);
}

export function validatePartialProductSchema(object) {
  return createProductSchema.partial().safeParse(object);
}

export function validateDeleteProductSchema(object) {
  return deleteProductSchema.safeParse(object);
}
