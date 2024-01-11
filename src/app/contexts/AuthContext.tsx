import { ReactNode, createContext, useCallback, useState } from 'react';

import { localStorageKeys } from '../config/localStorageKeys';
import { Token } from '../entities/Token';
import { User } from '../entities/User';

interface AuthContextValue {
  signedIn: boolean;
  signin: (token: Token, user: User) => void;
  signout: () => void;
  hasAuthority: (authority: string) => boolean;
  user: User;
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
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem(localStorageKeys.USER);

    if (!user) return null;

    return JSON.parse(user);
  });

  const signin = useCallback((token: Token, user: User) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, token.token);
    localStorage.setItem(
      localStorageKeys.USER_ROLES,
      JSON.stringify(token.roles),
    );
    localStorage.setItem(localStorageKeys.USER, JSON.stringify(user));
    setSignedIn(true);
    setRoles(token.roles);
    setUser(user);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(localStorageKeys.USER_ROLES);
    localStorage.removeItem(localStorageKeys.USER);
    setSignedIn(false);
    setRoles([]);
    setUser(null);
  }, []);

  const hasAuthority = useCallback(
    (role: string) => !!roles?.find((authority) => authority === role),
    [roles],
  );

  return (
    <AuthContext.Provider
      value={{ signedIn, signin, signout, hasAuthority, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
