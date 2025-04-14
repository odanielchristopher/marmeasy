import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createGlobalModalsSlice } from './slices/globalModalsSlice';
import { createUserSlice } from './slices/userSlice';
import { Store } from './Store';

export const createGlobalStore = () =>
  create<Store>()(
    devtools(
      immer((...params) => ({
        user: createUserSlice(...params),
        globalModals: createGlobalModalsSlice(...params),
      })),
      {
        name: 'MarmeasyStore',
        enabled: import.meta.env.DEV,
      },
    ),
  );

export const useGlobalStore = createGlobalStore();
