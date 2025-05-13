/* eslint-disable react/jsx-no-constructed-context-values */
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useShallow } from 'zustand/shallow';

import { localStorageKeys } from '@app/config/localStorageKeys';
import { IUser } from '@app/entities/User';
import { IUsersService } from '@app/services/@types/IUsersService';
import { useGlobalStore } from '@app/store';
import { capitalizeFirstLetter } from '@app/utils/capitalizeFirstLetter';
import { LaunchScreen } from '@views/components/app/LaunchScreen';

interface IAuthContextValue {
  signedIn: boolean;
  user: IUser | undefined;
  signin(accessToken: string): void;
  signout(): void;
}

export const AuthContext = createContext({} as IAuthContextValue);

export function AuthProvider({
  children,
  usersService,
}: {
  children: React.ReactNode;
  usersService: IUsersService;
}) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storagedAccessToken = localStorage.getItem(
      localStorageKeys.ACCESS_TOKEN,
    );

    return !!storagedAccessToken;
  });
  const queryClient = useQueryClient();
  const { setUser } = useGlobalStore(
    useShallow((store) => ({
      setUser: store.user.setUser,
    })),
  );

  const { isError, isFetching, isSuccess, data } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: usersService.me,
    staleTime: Infinity,
    enabled: signedIn,
  });

  const signin = useCallback((accessToken: string) => {
    localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);

    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);

    queryClient.removeQueries();

    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isSuccess) {
      setUser(data);
      toast.success(`Bem-vindo, ${capitalizeFirstLetter(data.name)}!`);
    }
  }, [isSuccess, data, setUser]);

  useEffect(() => {
    if (isError) {
      toast.error('Sua sessão expirou!');
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider
      value={{
        signedIn: isSuccess && signedIn,
        user: data,
        signin,
        signout,
      }}
    >
      <LaunchScreen isLoading={isFetching} />
      {!isFetching && children}
    </AuthContext.Provider>
  );
}
