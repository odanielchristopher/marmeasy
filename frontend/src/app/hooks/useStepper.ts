import { useContext } from 'react';

import { StepperContext } from '@app/contexts/StepperContext';

export function useStepper() {
  return useContext(StepperContext);
}
