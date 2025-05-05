import React from 'react';

import { cn } from '@app/lib/utils';

interface IPageHeader {
  title: string;
  description?: string;
  icon: React.ElementType;
  children?: React.ReactNode;
  classNames?: {
    icon?: string;
    title?: string;
    description?: string;
    rootContainer?: string;
    titleContainer?: string;
    baseElementsContainer?: string;
  };
}

export function PageHeader({
  title,
  description,
  icon: Icon,
  children,
  classNames,
}: IPageHeader) {
  return (
    <header
      className={cn('max-w-[280px] md:max-w-full', classNames?.rootContainer)}
    >
      <div className={cn(classNames?.baseElementsContainer)}>
        <div
          className={cn(
            'flex items-center gap-2 text-gray-800 dark:text-foreground',
            classNames?.titleContainer,
          )}
        >
          <Icon className={cn('size-8', classNames?.icon)} />
          <h2
            className={cn(
              'text-2xl font-semibold tracking-[-1px]',
              classNames?.title,
            )}
          >
            {title}
          </h2>
        </div>

        <p
          className={cn(
            'mt-2 text-gray-600 dark:text-muted-foreground text-base tracking-[-0.5px]',
            classNames?.description,
          )}
        >
          {description}
        </p>
      </div>

      <div>{children}</div>
    </header>
  );
}
