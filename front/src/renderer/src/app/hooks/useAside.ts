import { useContext } from 'react';
import { AsideContext } from '../contexts/AsideContext';

export default function useAside() {
  return useContext(AsideContext);
}
