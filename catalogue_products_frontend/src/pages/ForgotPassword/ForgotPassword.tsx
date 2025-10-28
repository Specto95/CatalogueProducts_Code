import { useFormik } from "formik";
import styles from "./ForgotPassword.module.css";
import { forgotPasswordSchema } from "./formProps/schema/forgotPasswordSchema";

// import { useMutation } from "@apollo/client/react";
// import { FORGOT_PASSWORD } from "./api/mutation/forgotPassword";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AUTH_API } from "../../context/helpers/api";

export function ForgotPassword() {
  const navigate = useNavigate();
  const [messageInstructions, setMessageInstructions] = useState<string>("");

  const handleForgotPassword = async (values: { email: string }) => {
    const forgotPasswordData = await fetch(
      AUTH_API.FORGOT_PASSWORD, {
        method: 'POST',
        body: JSON.stringify(values)
      }
    )
    return forgotPasswordData;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await handleForgotPassword({
          email: values.email,
        });

        const emailjs = await import("@emailjs/browser");

        const sendEmail = () => {
          emailjs
            .send(
              import.meta.env.VITE_SERVICE_ID,
              import.meta.env.VITE_TEMPLATE_ID,
              {
                email: values.email,
                link: `${
                  import.meta.env.DEV
                    ? import.meta.env.VITE_LOCALHOST_URL
                    : import.meta.env.VITE_PRODUCTION_URL
                }/reset-password?email=${values.email}`,
                company_name: "Catalogue Products",
              },
              import.meta.env.VITE_API_KEY
            )
            .then(
              (result) => {
                console.log(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            );
        };
        sendEmail();

        setMessageInstructions(
          "Se han enviado las instrucciones a su correo electrónico para restablecer su contraseña."
        );
      } catch (e: unknown) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert("An unknown error occurred");
        }
        navigate(-1);
      } finally {
        resetForm();
      }
    },
  });

  return (
    <section className={styles.forgotPW__container}>
      {!messageInstructions ? (
        <>
          <h1>Recuperar Contraseña</h1>
          <form
            className={styles.forgotPW__form}
            onSubmit={formik.handleSubmit}
          >
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email:"
              className={
                formik.touched.email && formik.errors.email
                  ? "inputError"
                  : formik.touched.email && !formik.errors.email
                  ? "inputSuccess"
                  : styles.forgotPW__input
              }
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {/* {formik.touched.email && formik.errors.email ? (
          <div className="errorMessage">{formik.errors.email}</div>
        ) : null} */}

            <div className="flex__spacingBetweenWrap">
              <button type="submit" className={styles.forgotPW__btnforgotPW}>
                Enviar email
              </button>

              <button
                type="button"
                className={styles.forgotPW__btnCancel}
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className={styles.forgotPW__form}>
          <p>{messageInstructions}</p>
        </div>
      )}
    </section>
  );
}
