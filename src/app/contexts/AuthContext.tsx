import { ReactNode, createContext, useCallback, useState } from "react";
import { localStorageKeys } from "../config/localStorageKeys";

interface AuthContextValue {
  signedIn: boolean;
  signin: (accessToken: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN
    );

    return !!storedAccessToken;
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn, signin: signin }}>
      {children}
    </AuthContext.Provider>
  );
}
