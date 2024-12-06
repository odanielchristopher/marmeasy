import { AuthContext } from '@renderer/contexts/AuthContext';
import { useContext } from 'react';

export function useAuth() {
  return useContext(AuthContext);
}
