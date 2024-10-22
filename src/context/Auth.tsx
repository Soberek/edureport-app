import { createContext, ReactElement, SetStateAction, useState } from "react";

interface AuthContextI {
  user: boolean;
  setUser: React.Dispatch<
    SetStateAction<{
      user: boolean;
    }>
  >;
}

const user_id: string | null = localStorage.getItem("auth");

// for now always logged
const default_auth_context: AuthContextI = { user: typeof user_id === "string" ? true : true, setUser: () => {} };

const AuthContext = createContext(default_auth_context);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState({ user: default_auth_context.user });
  console.log(user_id);
  return <AuthContext.Provider value={{ user: user.user, setUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext };
