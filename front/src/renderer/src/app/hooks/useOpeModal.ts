import { useContext } from 'react';
import { ModalsContext } from '../contexts/ModalsContext';

export function useOpenModal() {
  return useContext(ModalsContext);
}
