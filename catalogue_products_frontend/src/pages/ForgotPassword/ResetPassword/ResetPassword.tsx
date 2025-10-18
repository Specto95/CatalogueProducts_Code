import { useFormik } from "formik";
import styles from "./ResetPassword.module.css";
import { resetPasswordSchema } from "./formProps/schema/resetPasswordSchema";

import { useLocation } from "react-router-dom";

import { useMutation } from "@apollo/client/react";
import { RESET_PASSWORD } from "./api/resetPassword";

import { useNavigate } from "react-router-dom";

export function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const email = queryParams.get("email");

  const [resetPassword] = useMutation<
    { resetPassword: { message: string } },
    { email: string; newPassword: string }
  >(RESET_PASSWORD);
  const navigate = useNavigate();

  const handleResetPassword = (values: {
    email: string;
    newPassword: string;
  }) => {
    resetPassword({
      variables: {
        email: email!,
        newPassword: values.newPassword,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      email,
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        handleResetPassword({
          email: values.email!,
          newPassword: values.newPassword,
        });
        alert("Contraseña restablecida con éxito");
        navigate("/login");
      } catch (e: unknown) {
        if (e instanceof Error) {
          alert(e.message);
        } else {
          alert("An unknown error occurred");
        }
        // navigate(-1);
      } finally {
        resetForm();
      }
    },
  });

  return (
    <section className={styles.resetPW__container}>
      <h1>Recuperar Contraseña</h1>
      <form className={styles.resetPW__form} onSubmit={formik.handleSubmit}>
        <label htmlFor="newPassword">Nueva Contraseña</label>
        <input
          type="password"
          name="newPassword"
          placeholder="Ingresar Nueva Contraseña:"
          className={
            formik.touched.newPassword && formik.errors.newPassword
              ? "inputError"
              : formik.touched.newPassword && !formik.errors.newPassword
              ? "inputSuccess"
              : styles.resetPW__input
          }
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className="errorMessage">{formik.errors.newPassword}</div>
        ) : null}

        <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</label>
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirmar Nueva Contraseña:"
          className={
            formik.touched.confirmNewPassword &&
            formik.errors.confirmNewPassword
              ? "inputError"
              : formik.touched.confirmNewPassword &&
                !formik.errors.confirmNewPassword
              ? "inputSuccess"
              : styles.resetPW__input
          }
          value={formik.values.confirmNewPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.confirmNewPassword &&
        formik.errors.confirmNewPassword ? (
          <div className="errorMessage">{formik.errors.confirmNewPassword}</div>
        ) : null}

        <div className="flex__spacingBetweenWrap">
          <button type="submit" className={styles.resetPW__btnresetPW}>
            Restablecer Contraseña
          </button>

          <button
            type="button"
            className={styles.resetPW__btnCancel}
            onClick={() => navigate("/login")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
