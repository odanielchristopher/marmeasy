import React, { createContext, useCallback, useState } from 'react';

interface IStepperContextValue {
  previousStep: () => void;
  nextStep: () => void;
  currentStep: number;
}

export const StepperContext = createContext({} as IStepperContextValue);

export function StepperProvider({
  children,
  steps,
  initialStep,
}: {
  children: React.ReactNode;
  steps: {
    label: string;
    content: React.ReactNode;
  }[];
  initialStep?: number;
}) {
  const [currentStep, setCurrentStep] = useState(initialStep ?? 0);

  const nextStep = useCallback(() => {
    setCurrentStep((prevState) => Math.min(steps.length - 1, prevState + 1));
  }, [steps]);

  const previousStep = useCallback(() => {
    setCurrentStep((prevState) => Math.max(0, prevState - 1));
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StepperContext.Provider value={{ nextStep, previousStep, currentStep }}>
      {children}
    </StepperContext.Provider>
  );
}
