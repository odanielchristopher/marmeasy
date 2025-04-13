import React from 'react';

interface IPageHeader {
  title: string;
  description: string;
  icon: React.ElementType;
}

export function PageHeader({ title, description, icon: Icon }: IPageHeader) {
  return (
    <header className=" max-w-[280px] md:max-w-full">
      <div className="flex items-center gap-2 text-gray-800 dark:text-foreground">
        <Icon className="size-8" />
        <h2 className="text-2xl font-semibold tracking-[-1px]">{title}</h2>
      </div>

      <p className="mt-2 text-gray-600 dark:text-muted-foreground text-base tracking-[-0.5px]">
        {description}
      </p>
    </header>
  );
}
