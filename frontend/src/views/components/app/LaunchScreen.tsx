import { Transition } from '@headlessui/react';

import { Logo } from '@views/assets/Logo';

import { Spinner } from '../ui/Spinner';

interface ILaunchScreenProps {
  isLoading: boolean;
}

export function LaunchScreen({ isLoading }: ILaunchScreenProps) {
  return (
    <Transition
      show={isLoading}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="bg-primary w-full z-50 h-full fixed top-0 left-0 flex flex-col items-center justify-center gap-6">
        <Logo className="h-8 text-white" size="medium" />

        <Spinner className="text-primary fill-white" />
      </div>
    </Transition>
  );
}
