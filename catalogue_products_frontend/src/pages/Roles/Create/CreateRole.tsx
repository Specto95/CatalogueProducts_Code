import { Form, Formik } from "formik";
import styles from "./CreateRole.module.css";
import { createRoleSchema } from "./formProps/schema/createRoleSchema";

// import { useMutation } from "@apollo/client/react";
// import { REGISTER } from "./api/mutation/register";
import { UserRole } from "../../../context/types/User";

import { useNavigate } from "react-router-dom";
import { AUTH_API } from "../../../context/helpers/api";
import { useSessionProvider } from "../../../hooks/useSessionProvider";

export function CreateRole() {
  // const [register] = useMutation(REGISTER);

  const { token } = useSessionProvider();
  const navigate = useNavigate();


  const handleRegister = async (values: {
    email: string;
    password: string;
    role: string;
  }) => {
    const data = {
      email: values.email,
      password: values.password,
      role: values.role,
    };
    await fetch(AUTH_API.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER",
      }}
      validationSchema={createRoleSchema(token!)}
      onSubmit={async (values, { resetForm }) => {
        try {
          await handleRegister({
            email: values.email,
            password: values.password,
            role: values.role,
          });
          alert("Usuario creado con éxito");
          navigate(-1);
          resetForm();
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
      }}
    >
      {({
        touched,
        errors,
        handleSubmit,
        values,
        handleChange,
        handleBlur,
      }) => (
        <section className={styles.createRole__container}>
          <h1>Crear Rol</h1>
          <Form className={styles.createRole__form} onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Email:"
              className={
                touched.email && errors.email
                  ? "inputError"
                  : touched.email && !errors.email
                  ? "inputSuccess"
                  : styles.createRole__input
              }
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.email && errors.email ? (
              <div className="errorMessage">{errors.email}</div>
            ) : null}

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Contraseña:"
              className={
                touched.password && errors.password
                  ? "inputError"
                  : touched.password && !errors.password
                  ? "inputSuccess"
                  : styles.createRole__input
              }
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.password && errors.password ? (
              <div className="errorMessage">{errors.password}</div>
            ) : null}

            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña:"
              className={
                touched.confirmPassword && errors.confirmPassword
                  ? "inputError"
                  : touched.confirmPassword && !errors.confirmPassword
                  ? "inputSuccess"
                  : styles.createRole__input
              }
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.confirmPassword && errors.confirmPassword ? (
              <div className="errorMessage">{errors.confirmPassword}</div>
            ) : null}

            <label htmlFor="role">Rol:</label>
            <select
              name="role"
              className={styles.createRole__input}
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value={UserRole.USER}>{UserRole.USER}</option>
              <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
            </select>

            <div className="flex__spacingBetweenWrap">
              <button
                type="submit"
                className={styles.createRole__btnCreateRole}
              >
                Finalizar
              </button>

              <button
                type="button"
                className={styles.createRole__btnCancel}
                onClick={() => navigate(-1)}
              >
                Cancelar
              </button>
            </div>
          </Form>
        </section>
      )}
    </Formik>
  );
}
