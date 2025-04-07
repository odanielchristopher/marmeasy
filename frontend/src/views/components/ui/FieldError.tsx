import { CircleX } from 'lucide-react';

export function FieldError({ message }: { message: string }) {
  return (
    <div className="flex gap-1 items-center">
      <CircleX className="w-4 h-4 text-red-500" />
      <span className="text-red-500 text-[14px]">{message}</span>
    </div>
  );
}
