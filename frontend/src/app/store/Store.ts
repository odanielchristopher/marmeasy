import { StateCreator } from 'zustand';

import { GlobalModalsSlice } from './slices/globalModalsSlice';
import { UserSlice } from './slices/userSlice';

export type Store = {
  user: UserSlice;
  globalModals: GlobalModalsSlice;
};

export type CreateSlice<TSlice> = StateCreator<
  Store,
  [['zustand/immer', never], ['zustand/devtools', never]],
  [],
  TSlice
>;
