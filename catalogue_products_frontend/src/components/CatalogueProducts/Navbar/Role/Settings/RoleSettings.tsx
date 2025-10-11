import { FiLogOut } from "react-icons/fi";
import { HiUserAdd } from "react-icons/hi";

import { useNavigate } from "react-router-dom";

import styles from "./RoleSettings.module.css";
import { useSessionProvider } from "../../../../../hooks/useSessionProvider";
import type { RoleSettingsProps } from "./interfaces/RoleSettings";
import { UserRole } from "../../../../../context/types/User";

export function RoleSettings({ setIsOpenOptions }: RoleSettingsProps) {
  const { user, logout } = useSessionProvider();
  const navigate = useNavigate();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__header}>
        <h2>Configuración del Usuario</h2>
        <button
          className={styles.sidebar__close}
          onClick={() => setIsOpenOptions(false)}
        >
          ✕
        </button>
      </div>

      <div className={styles.sidebar__content}>
        {user.role === UserRole.ADMIN && (
          <div className="flex__spacingBetween">
            <p>Añadir Colaborador: </p>
            <HiUserAdd
              size={35}
              className={styles.sidebar__addRoleIcon}
              onClick={() => {
                navigate("/register");
                setIsOpenOptions(false);
              }}
            />
          </div>
        )}
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>

        <button
          className={styles.sidebar__logout}
          onClick={() => {
            logout();
            setIsOpenOptions(false);
          }}
        >
          <FiLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
