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
      <Sunset className="w-5 h-5 hover:scale-110" />
    </button>
  );
}
