import { ReactNode, createContext, useCallback, useState } from 'react';

import { localStorageKeys } from '../config/localStorageKeys';
import { Token } from '../entities/Token';

interface AuthContextValue {
  signedIn: boolean;
  signin: (token: Token) => void;
  signout: () => void;
  hasAuthority: (authority: string) => boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storedAccessToken;
  });
  const [roles, setRoles] = useState(() => {
    const userRoles = localStorage.getItem(localStorageKeys.USER_ROLES);

    if (!userRoles) return null;

    return JSON.parse(userRoles) as string[];
  });

  const signin = useCallback((token: Token) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token.token);
    localStorage.setItem(
      localStorageKeys.USER_ROLES,
      JSON.stringify(token.roles),
    );
    setSignedIn(true);
    setRoles(token.roles);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(localStorageKeys.USER_ROLES);
    setSignedIn(false);
    setRoles([]);
  }, []);

  const hasAuthority = useCallback(
    (role: string) => !!roles?.find((authority) => authority === role),
    [roles],
  );

  return (
    <AuthContext.Provider value={{ signedIn, signin, signout, hasAuthority }}>
      {children}
    </AuthContext.Provider>
  );
}
