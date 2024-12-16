import { localStorageKeys } from '@renderer/app/config/localStorageKeys';
import LaunchScreen from '@renderer/views/components/LaunchScreen';
import { createContext, useCallback, useEffect, useState } from 'react';
import useFindMeQuery from '../hooks/queries/useFindMeQuery';
import toast from '../utils/toast';

export interface AuthContextValue {
  signedIn: boolean
  signin(accessToken: string): void
  signout(): void
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(localStorageKeys.ACCESS_TOKEN);

    return !!storedAccessToken;
  });

  const { isError, isFetching, isSuccess } = useFindMeQuery(signedIn);

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    setSignedIn(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast({
        type: 'danger',
        text: 'Sua sessão expirou!',
      });
      signout();
    }

    if (isSuccess) {
      toast({
        type: 'success',
        text: 'Usuário autenticado.',
      });
    }
  }, [isError, signout, isSuccess]);

  return (
    <AuthContext.Provider value={{
      signedIn: signedIn && isSuccess,
      signin,
      signout,
    }}>
      <LaunchScreen isLoading={isFetching}/>
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
