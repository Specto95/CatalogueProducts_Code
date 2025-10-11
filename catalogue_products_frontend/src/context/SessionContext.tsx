import { createContext, useEffect, useState } from "react";
import type { User } from "./types/User";
import { useMutation, useQuery } from "@apollo/client/react";
import { IS_USER_AUTHENTICATED } from "./api/isUserAuthenticated";
import { LOGIN } from "./api/login";

import Cookies from "js-cookie";
import { LOGOUT } from "./api/logout";

type UserRoleEmail = Pick<User, "email" | "role">;

type SessionContextType = {
  user: UserRoleEmail;
  isUserLogged: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
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
    role: 0,
  });
  const token = Cookies.get("token");

  const { data } = useQuery<{ isUserAuthenticated: boolean }>(
    IS_USER_AUTHENTICATED,
    {
      variables: { token: token ?? "" },
      skip: !token,
    }
  );

  const [loginMutation] = useMutation<{
    login: { user: User; message: string; token: string };
  }>(LOGIN);

  const [logoutMutation] = useMutation<{
    logout: {
      message: string;
    };
  }>(LOGOUT);

  const logout = async () => {
    try {
      const { data } = await logoutMutation({
        variables: { token: token ?? Cookies.get("token") ?? "" },
      });
      setUser({} as User);
      localStorage.removeItem("user");
      Cookies.remove("token");
      alert(data?.logout.message);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const isUserLogged = !!data?.isUserAuthenticated;

  const login = async (email: string, password: string) => {
    try {
      const { data } = await loginMutation({ variables: { email, password } });

      if (data?.login) {
        setUser((({ email, role }) => ({ email, role }))(data.login.user));
        localStorage.setItem("user", JSON.stringify(data.login.user));

        Cookies.set("token", data.login.token, {
          expires: 1,
          secure: true,
        });

        alert(data.login.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (data?.isUserAuthenticated) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      setUser({} as User);
    }
  }, [data]);

  return (
    <SessionContext.Provider
      value={{
        user,
        login,
        isUserLogged,
        logout,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
