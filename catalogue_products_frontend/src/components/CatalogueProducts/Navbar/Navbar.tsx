import { FiLogOut} from "react-icons/fi";
import styles from "./Navbar.module.css";
import type { NavbarProps } from "./interfaces/Navbar";

export default function Navbar({ username, onLogout }: NavbarProps) {


  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <h1 className={styles.navbar__logo}>CatalogueProducts</h1>

        <div className={styles.navbar__user}>
          <span className={styles.navbar__username}>{username || 'Usuario'}</span>
          <button className={styles.navbar__logout} onClick={onLogout}>
            <FiLogOut size={20}  />
          </button>
        </div>
      </div>
    </nav>
  );
}
