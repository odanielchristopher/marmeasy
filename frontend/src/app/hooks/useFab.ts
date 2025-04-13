import { useContext } from 'react';

import { FabContext } from '@app/contexts/FabContext';

export function useFab() {
  return useContext(FabContext);
}
