import {
  createContext,
  useEffect,
  useState,
} from "react";
import { UserRole, type User } from "./types/User";
import Cookies from "js-cookie";
import { AUTH_API } from "./helpers/api";

type UserRoleEmail = Pick<User, "email" | "role">;

type SessionContextType = {
  user: UserRoleEmail;
  isUserLogged?: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  token: string | undefined;
};

// eslint-disable-next-line react-refresh/only-export-components
export const SessionContext = createContext<SessionContextType>(
  {} as SessionContextType
);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserRoleEmail>({
    email: "",
    role: UserRole.NONE,
  });
  const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
  const token = Cookies.get("token");

  const isUserAuthenticated = async (token: string): Promise<boolean> => {
    try {
      if (!token) return false;
      const res = await fetch(AUTH_API.IS_USER_AUTHENTICATED, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const isAuthenticated = await res.json();

      if (isAuthenticated) {
        return isAuthenticated;
      }

      setUser({} as User);
      localStorage.removeItem("user");
      Cookies.remove("token");

      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      if (!token){
        setIsUserLogged(false);
        return;
      }

      const data = await isUserAuthenticated(token);
      setIsUserLogged(data);
    };

    checkAuth();
  }, [token]);

  const logout = async () => {
    try {
      if (!token || !Cookies.get("token")) {
        throw new Error("No token found");
      }
      const res = await fetch(AUTH_API.LOGOUT, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setUser({} as User);
        localStorage.removeItem("user");
        Cookies.remove("token");
        return;
      }
      alert("Error trying to logout");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(AUTH_API.LOGIN, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) {
        const errorMessage = data.message || `Error: ${res.status}`;
        alert(errorMessage);
      }
      setUser({
        email: data.user.email,
        role: data.user.role,
      });
      localStorage.setItem("user", JSON.stringify(data.user));

      Cookies.set("token", data.token, {
        expires: 1,
        secure: true,
      });

      return;
    } catch (error) {
      if (error instanceof Error) {
        // console.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (isUserLogged) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      setUser({} as User);
    }
  }, [isUserLogged]);

  return (
    <SessionContext.Provider
      value={{
        user,
        login,
        isUserLogged,
        token,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
