import { createContext, useContext, useState, ReactNode } from "react";
import authServices from "./auth"

type AuthContextType = {
  loggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
  getUsername: () => string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(authServices.loggedIn());

    const login = (token: string) => {
        authServices.login(token);
        setLoggedIn(true)
    };

    const logout = () => {
        authServices.logout();
        setLoggedIn(false)
    };

    const getUsername = (): string => {
        return authServices.getUsername();
    }

    return (
        <AuthContext.Provider value={{ loggedIn, login, logout, getUsername}}>
            { children }
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};