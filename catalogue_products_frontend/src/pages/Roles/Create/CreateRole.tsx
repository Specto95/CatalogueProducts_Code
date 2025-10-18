import { useFormik } from "formik";
import styles from "./CreateRole.module.css";
import { createRoleSchema } from "./formProps/schema/createRoleSchema";

import { useMutation } from "@apollo/client/react";
import { REGISTER } from "./api/mutation/register";
import { UserRole } from "../../../context/types/User";

import { useNavigate } from "react-router-dom";

export function CreateRole() {
  const [register] = useMutation(REGISTER);
  const navigate = useNavigate();

  const handleRegister = (values: {
    email: string;
    password: string;
    role: string;
  }) => {
    register({
      variables: {
        email: values.email,
        password: values.password,
        role: values.role,
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      role: "USER",
    },
    validationSchema: createRoleSchema,
    onSubmit: async (values, { resetForm }) => {
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
    },
  });

  return (
    <section className={styles.createRole__container}>
      <h1>Crear Rol</h1>
      <form className={styles.createRole__form} onSubmit={formik.handleSubmit}>
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
              : styles.createRole__input
          }
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.email && formik.errors.email ? (
          <div className="errorMessage">{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña:"
          className={
            formik.touched.password && formik.errors.password
              ? "inputError"
              : formik.touched.password && !formik.errors.password
              ? "inputSuccess"
              : styles.createRole__input
          }
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.password && formik.errors.password ? (
          <div className="errorMessage">{formik.errors.password}</div>
        ) : null}

        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Contraseña:"
          className={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "inputError"
              : formik.touched.confirmPassword && !formik.errors.confirmPassword
              ? "inputSuccess"
              : styles.createRole__input
          }
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="errorMessage">{formik.errors.confirmPassword}</div>
        ) : null}

        <label htmlFor="role">Rol:</label>
        <select
          name="role"
          className={styles.createRole__input}
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value={UserRole.USER}>{UserRole.USER}</option>
          <option value={UserRole.ADMIN}>{UserRole.ADMIN}</option>
        </select>

        <div className="flex__spacingBetweenWrap">
          <button type="submit" className={styles.createRole__btnCreateRole}>
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
      </form>
    </section>
  );
}
