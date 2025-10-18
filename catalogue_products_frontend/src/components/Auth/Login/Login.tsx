import { useFormik } from "formik";
import styles from "./Login.module.css";
import { loginSchema } from "./formProps/schema/loginSchema";
import { useSessionProvider } from "../../../hooks/useSessionProvider";
import { Navigate, Link } from "react-router-dom";

export function Login() {
  const { login, isUserLogged } = useSessionProvider();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      await login(values.email, values.password);

      resetForm();
    },
  });

  if (isUserLogged) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className={styles.login__container}>
      <h1>Login</h1>
      <form className={styles.login__form} onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email:"
          className={styles.login__input}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="Contraseña:"
          className={styles.login__input}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        <Link to="/forgot-password" className={styles.login__forgotPassword}>
          ¿Olvidaste tu contraseña?
        </Link>
        <button type="submit" className={styles.login__btnLogin}>
          Ingresar
        </button>
      </form>
    </section>
  );
}
