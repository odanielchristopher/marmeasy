import { useContext } from 'react';
import { ModalsContext } from '../contexts/ModalsContext';

export function useModal() {
  return useContext(ModalsContext);
}
