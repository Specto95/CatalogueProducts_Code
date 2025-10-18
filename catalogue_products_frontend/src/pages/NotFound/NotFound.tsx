import { Link } from "react-router-dom";

import styles from "./NotFound.module.css";

export function NotFound() {
  return (
    <div className={styles.notFound__container}>
      <h1>404 - Página No Encontrada</h1>
      <Link className={styles.notFound__btn} to="/">
        Volver al Inicio
      </Link>
    </div>
  );
}
