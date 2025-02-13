import { useThemeSwitcher } from '@myst-theme/providers';
import { Sunset } from 'lucide-react';
import { Tooltip } from './Tooltip';
import classNames from 'classnames';

export function ThemeButton({ className }: { className?: string }) {
  const { nextTheme } = useThemeSwitcher();
  return (
    <button
      className={classNames('flex items-center', className)}
      aria-label="Change contrast"
      onClick={nextTheme}
    >
      <Tooltip label="Change contrast">
        <Sunset className="w-5 h-5 hover:scale-110" />
      </Tooltip>
    </button>
  );
}
