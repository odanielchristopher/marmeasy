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
  hasHeader?: boolean;
}

export function Stepper({
  steps,
  hasHeader,
  initialStep,
  className,
}: IStepperProps) {
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StepperProvider steps={steps} initialStep={initialStep}>
      <StepperContext.Consumer>
        {({ currentStep }) => (
          <div className={cn('w-full', className)}>
            {hasHeader && (
              <header>
                <span className="text-sm font-medium text-muted-foreground tracking-[-0.5px] md:hidden mb-6 block">
                  {steps[currentStep].label}
                </span>

                <div className="max-md:hidden flex gap-4 mb-6">
                  {steps.map((step) => (
                    <div key={step.label}>
                      <span className="text-sm font-medium text-muted-foreground tracking-[-0.5px]">
                        {step.label}
                      </span>

                      {step.label === steps[currentStep].label && (
                        <div className="my-1 h-[2px] w-8 bg-primary" />
                      )}
                    </div>
                  ))}
                </div>
              </header>
            )}
            <div>{steps[currentStep].content}</div>
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
