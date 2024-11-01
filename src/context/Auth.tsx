import { createContext, ReactElement, useState } from "react";

interface AuthContextI {
  is_authenticated: boolean;
  login: (token: string, username: string) => void;
  logout: () => void;
  username: string | null;
}

const getToken = (): string | null => localStorage.getItem("token");
const getUsername = (): string | null => localStorage.getItem("username");

const default_auth_context: AuthContextI = {
  is_authenticated: !!getToken(),
  login: () => {},
  logout: () => {},
  username: getUsername() // Get username from localStorage
};

const AuthContext = createContext(default_auth_context);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [is_authenticated, setIsAuthenticated] = useState(!!getToken());
  const [username, setUsername] = useState<string | null>(getUsername());

  const login = (token: string, username: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setIsAuthenticated(true);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername(null);
  };

  const contextValue: AuthContextI = {
    is_authenticated,
    login,
    logout,
    username
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
