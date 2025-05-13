import React from 'react';

import { cn } from '@app/lib/utils';

function Table({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <table
      className={cn(
        'w-full border-collapse border-spacing-0 border rounded-xl overflow-hidden shadow-[0px_6px_8px_0px_rgba(0,0,0,0.06)]',
        className,
      )}
    >
      {children}
    </table>
  );
}

function TableRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <tr className={className}>{children}</tr>;
}

function TableHeaderRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <th className={cn('p-4 text-left', className)}>{children}</th>;
}

function TableCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td
      className={cn(
        'p-4 text-sm text-left align-middle border-gray-400/40',
        className,
      )}
    >
      {children}
    </td>
  );
}

function TableHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <thead className={cn('bg-gray-400/20', className)}>{children}</thead>;
}

function TableBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <tbody className={cn('bg-white dark:bg-card', className)}>{children}</tbody>
  );
}

export { Table, TableBody, TableCell, TableHeader, TableHeaderRow, TableRow };
