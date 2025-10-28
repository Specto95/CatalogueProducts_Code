import { useFormik } from "formik";
import styles from "./ChangePassword.module.css";
import { changePasswordSchema } from "./formProps/schema/changePasswordSchema";

// import { useMutation } from "@apollo/client/react";
// import { CHANGE_PASSWORD } from "./api/mutation/changePassword";

import { useNavigate } from "react-router-dom";
import { useSessionProvider } from "../../hooks/useSessionProvider";
import { AUTH_API } from "../../context/helpers/api";

export function ChangePassword() {
  const navigate = useNavigate();

  const { user, logout, token } = useSessionProvider();

  const handleChangePassword = async (values: {
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    await fetch(AUTH_API.CHANGE_PASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: values.email,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword,
      }),
    });
  };

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema(user.email, token!),
    onSubmit: async (values, { resetForm }) => {
      try {
        await handleChangePassword({
          email: user.email,
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword,
        });
        alert("Contraseña cambiada con éxito");
        resetForm();
        logout();
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
    <section className={styles.changePW__container}>
      <h1>Cambiar Contraseña</h1>
      <form className={styles.changePW__form} onSubmit={formik.handleSubmit}>
        <label htmlFor="oldPassword">Contraseña Antigua</label>
        <input
          type="password"
          name="oldPassword"
          placeholder="Contraseña Antigua:"
          className={
            formik.touched.oldPassword && formik.errors.oldPassword
              ? "inputError"
              : formik.touched.oldPassword && !formik.errors.oldPassword
              ? "inputSuccess"
              : styles.changePW__input
          }
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.oldPassword && formik.errors.oldPassword ? (
          <div className="errorMessage">{formik.errors.oldPassword}</div>
        ) : null}

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
              : styles.changePW__input
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
              : styles.changePW__input
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
          <button type="submit" className={styles.changePW__btnchangePW}>
            Finalizar
          </button>

          <button
            type="button"
            className={styles.changePW__btnCancel}
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}
