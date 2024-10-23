import { createContext, ReactElement, SetStateAction, useState } from "react";

interface AuthContextI {
  user: boolean;
  setUser: React.Dispatch<
    SetStateAction<{
      user: boolean;
    }>
  >;
}

const user_id: string | null = localStorage.getItem("user");

// for now always logged
const default_auth_context: AuthContextI = { user: user_id ? true : false, setUser: () => {} };

const AuthContext = createContext(default_auth_context);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState({ user: default_auth_context.user });
  return <AuthContext.Provider value={{ user: user.user, setUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
