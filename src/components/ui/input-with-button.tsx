import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
interface InputWithButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  buttonContent: React.ReactNode;
}
const InputWithButton = React.forwardRef<HTMLDivElement, InputWithButtonProps>(
  ({ className, inputProps, buttonProps, buttonContent, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex w-full items-center rounded-full bg-background/80 backdrop-blur-sm border p-2 shadow-2xl shadow-black/10 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-background',
          className
        )}
        {...props}
      >
        <Input
          {...inputProps}
          className={cn(
            'h-12 flex-1 border-0 bg-transparent px-4 text-lg placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0',
            inputProps?.className
          )}
        />
        <Button
          {...buttonProps}
          className={cn(
            'h-12 rounded-full px-6 text-base font-semibold bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200',
            buttonProps?.className
          )}
        >
          {buttonContent}
        </Button>
      </div>
    );
  }
);
InputWithButton.displayName = 'InputWithButton';
export { InputWithButton };