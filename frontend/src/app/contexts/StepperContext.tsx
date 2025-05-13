import React, { createContext, useCallback, useState } from 'react';

interface IStepperContextValue {
  previousStep: () => void;
  nextStep: () => void;
  changeStep: (index: number) => void;
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

  const changeStep = useCallback(
    (index: number) => {
      setCurrentStep((prevStep) => {
        const newStep = index < 0 ? prevStep + index : index;
        return Math.max(0, Math.min(newStep, steps.length - 1));
      });
    },
    [steps.length],
  );

  return (
    <StepperContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ nextStep, previousStep, changeStep, currentStep }}
    >
      {children}
    </StepperContext.Provider>
  );
}
