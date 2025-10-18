import styles from "./Navbar.module.css";
import { useSessionProvider } from "../../../hooks/useSessionProvider";
import { spanishRoles } from "./helpers/traslateRoles";
import { IoIosOptions } from "react-icons/io";
import { useState } from "react";
import { Sidebar } from "./Role/Settings/Sidebar";

import { useLocation } from "react-router-dom";

export function Navbar() {
  const { isUserLogged, user } = useSessionProvider();
  const [isOpenOptions, setIsOpenOptions] = useState(false);

  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <h1 className={styles.navbar__logo}>CatalogueProducts</h1>

        {location.pathname !== "/" ? (
          <></>
        ) : (
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

                <IoIosOptions
                  size={30}
                  className={styles.navbar__options_icon}
                  onClick={() => setIsOpenOptions(!isOpenOptions)}
                />

                {isOpenOptions && (
                  <Sidebar setIsOpenOptions={setIsOpenOptions} />
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
