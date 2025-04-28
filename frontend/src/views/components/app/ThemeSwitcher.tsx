import { VariantProps } from 'class-variance-authority';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@app/contexts/ThemeContext';
import { Button, buttonVariants } from '@views/components/ui/Button';

interface IThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({
  className,
  variant = 'link',
}: IThemeSwitcherProps & VariantProps<typeof buttonVariants>) {
  const { setTheme, theme } = useTheme();

  function handleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Button
      type="button"
      variant={variant}
      size="icon"
      className={className}
      onClick={handleTheme}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
