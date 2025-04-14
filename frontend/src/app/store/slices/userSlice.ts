/* eslint-disable no-param-reassign */
import { CreateSlice } from '../Store';

type UserStore = {
  data: {
    name: string;
    email: string;
  } | null;
};

type UserActions = {
  setUser(input: { name: string; email: string }): void;
};

export type UserSlice = UserStore & UserActions;

export const createUserSlice: CreateSlice<UserSlice> = (set) => ({
  data: null,
  setUser: ({ name, email }) =>
    set((prevStore) => {
      prevStore.user.data = { name, email };
    }),
});
