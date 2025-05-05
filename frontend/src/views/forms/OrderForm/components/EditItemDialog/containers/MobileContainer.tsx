import React from 'react';

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from '@views/components/ui/Drawer';

export function MobileContainer({
  children,
  ...props
}: { children: React.ReactNode } & React.ComponentPropsWithoutRef<
  typeof Drawer
>) {
  return (
    <Drawer {...props}>
      <DrawerContent aria-describedby={undefined} className="pb-4">
        <DrawerTitle className="px-4 mt-4 hidden">
          <strong className="font-medium">Mobile Edit</strong>
        </DrawerTitle>

        <div className="mt-8 px-4">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}
