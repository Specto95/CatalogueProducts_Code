import { createContext, useState } from "react";
import type { User } from "./types/User";



type SessionContextType = {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User>({} as User);
    const [token, setToken] = useState<string>("");

    return (
        <SessionContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </SessionContext.Provider>
    );
}