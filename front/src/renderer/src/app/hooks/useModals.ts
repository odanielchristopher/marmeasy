import { useContext } from 'react';
import { ModalsContext } from '../contexts/ModalsContext';

export function useModals() {
  return useContext(ModalsContext);
}
