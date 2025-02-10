import { useThemeSwitcher } from '@myst-theme/providers';
import { Sunset } from 'lucide-react';

export function ThemeButton({ className }: { className?: string }) {
  const { nextTheme } = useThemeSwitcher();
  return (
    <button
      className={className}
      title="Change contrast"
      aria-label="Chage contrast"
      onClick={nextTheme}
    >
      <Sunset />
    </button>
  );
}
