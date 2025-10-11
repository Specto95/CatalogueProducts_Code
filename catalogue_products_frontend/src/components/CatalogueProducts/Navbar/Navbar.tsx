import { FiLogOut } from "react-icons/fi";
import styles from "./Navbar.module.css";
import { useSessionProvider } from "../../../hooks/useSessionProvider";
import { spanishRoles } from "./helpers/traslateRoles";

export function Navbar() {
  const { isUserLogged, user, logout } = useSessionProvider();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <h1 className={styles.navbar__logo}>CatalogueProducts</h1>

        <div className={styles.navbar__user}>
          {isUserLogged ? (
            <>
              <span className={styles.navbar__username}>
                {user.email} |{" "}
                {
                  spanishRoles[
                    user.role as unknown as keyof typeof spanishRoles
                  ]
                }
              </span>
              <button className={styles.navbar__logout} onClick={logout}>
                <FiLogOut size={20} />
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
}
