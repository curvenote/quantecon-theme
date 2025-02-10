import { useNavOpen, useThemeSwitcher } from '@myst-theme/providers';
import classNames from 'classnames';
import { Menu, Sunset, X } from 'lucide-react';

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

export function SidebarToggle() {
  const [open, setOpen] = useNavOpen();
  return (
    <div className="relative w-6 h-6 cursor-pointer" onClick={() => setOpen(!open)}>
      <X
        className={classNames('absolute transition-all duration-300 ease-in-out', {
          'opacity-0': !open,
          'opacity-100': open,
        })}
        width={24}
        height={24}
      />
      <Menu
        className={classNames('absolute transition-all duration-300 ease-in-out', {
          'opacity-100': !open,
          'opacity-0': open,
        })}
        width={24}
        height={24}
      />
    </div>
  );
}
