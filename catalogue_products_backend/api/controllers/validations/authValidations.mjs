import z from "zod";

export const registerSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be a string",
      required_error: "Email is required.",
    })
    .email(),
  password: z
    .string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required.",
    })
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z]).*$/, {
      message:
        "Password must contain at least one uppercase and one lowercase letter",
    })
    .regex(/^(?=.*[!@#$%^&*(),.?":{}|<>])/, {
      message: "Password must contain at least one special character",
    }),
  role: z.preprocess(
    (val) => (typeof val === "string" ? val.toUpperCase() : val),
    z.enum(["ADMIN", "USER"], {
      required_error: "Role is required.",
      invalid_type_error: "Wrong user role",
    })
  ),
});

export const changePasswordSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "Email must be a string",
        required_error: "Email is required.",
      })
      .email(),
    oldPassword: z.string({
      invalid_type_error: "Password must be a string",
      required_error: "Password is required.",
    }),
    newPassword: z
      .string({
        invalid_type_error: "Password must be a string",
        required_error: "Password is required.",
      })
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z]).*$/, {
        message:
          "Password must contain at least one uppercase and one lowercase letter",
      })
      .regex(/^(?=.*[!@#$%^&*(),.?\":{}|<>])/, {
        message: "Password must contain at least one special character",
      }),
    confirmNewPassword: z.string({
      invalid_type_error: "Confirm password must be a string",
      required_error: "Confirm password is required.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: "mismatch",
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
      });
    }
  });

export const oldPasswordSchema = changePasswordSchema.pick({
  email: true,
  oldPassword: true,
});

export function validateRegister(object) {
  return registerSchema.safeParse(object);
}

export function validateChangePassword(object) {
  return changePasswordSchema.safeParse(object);
}

export function validateOldPassword(object) {
  return oldPasswordSchema.safeParse(object);
}
