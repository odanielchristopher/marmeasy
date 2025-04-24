import React from 'react';

import { StepperContext, StepperProvider } from '@app/contexts/StepperContext';
import { useStepper } from '@app/hooks/useStepper';
import { cn } from '@app/lib/utils';
import { Button } from '@views/components/ui/Button';

interface IStepperProps {
  initialStep?: number;
  steps: {
    label: string;
    content: React.ReactNode;
  }[];
  className?: string;
}

export function Stepper({ steps, initialStep, className }: IStepperProps) {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StepperProvider steps={steps} initialStep={initialStep}>
      <StepperContext.Consumer>
        {({ currentStep }) => (
          <div className={cn('w-full', className)}>
            {steps[currentStep].content}
          </div>
        )}
      </StepperContext.Consumer>
    </StepperProvider>
  );
}

export function StepperPreviousButton({
  size = 'sm',
  type = 'button',
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const { previousStep } = useStepper();

  return (
    <Button
      type={type}
      size={size}
      variant="secondary"
      onClick={onClick ?? previousStep}
      {...props}
    >
      Voltar
    </Button>
  );
}

export function StepperNextButton({
  size = 'sm',
  type = 'button',
  preventDefault = false,
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button> & {
  preventDefault?: boolean;
}) {
  const { nextStep } = useStepper();

  const nextStepHandler = !preventDefault ? nextStep : undefined;

  return (
    <Button
      type={type}
      size={size}
      onClick={onClick ?? nextStepHandler}
      {...props}
    >
      Próximo
    </Button>
  );
}
