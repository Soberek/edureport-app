import { createContext, ReactElement, useState } from "react";

interface AuthContextI {
  is_authenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const getToken = (): string | null => localStorage.getItem("token");

const default_auth_context: AuthContextI = {
  is_authenticated: !!getToken(),
  login: () => {},
  logout: () => {}
};

const AuthContext = createContext(default_auth_context);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [is_authenticated, setIsAuthenticated] = useState(!!getToken());

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextI = {
    is_authenticated,
    login,
    logout
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
