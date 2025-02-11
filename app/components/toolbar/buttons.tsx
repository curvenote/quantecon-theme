import { PageLoader } from '@myst-theme/common';
import { useNavOpen, useThemeSwitcher } from '@myst-theme/providers';
import { Link, useLoaderData } from '@remix-run/react';
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

export function QuantEconButton() {
  return (
    <Link to="https://quantecon.org/">
      <img
        className="duration-300 cursor-pointer transition-scale hover:scale-110 h-7"
        src="/logos/qemb-logo.png"
        alt="QuantEcon Logo"
      />
    </Link>
  );
}

export function GitHubButton() {
  const { isDark } = useThemeSwitcher();
  const { page } = useLoaderData() as { page: PageLoader };
  const editUrl = page.frontmatter?.edit_url;

  const logo = (
    <>
      {isDark ? (
        <img
          src="/logos/github-mark-white.svg"
          alt="Github Logo"
          className="h-5 opacity-80 hover:scale-110"
        />
      ) : (
        <img
          src="/logos/github-mark.svg"
          alt="Github Logo"
          className="h-5 opacity-80 hover:scale-110"
        />
      )}
    </>
  );

  return (
    <span className="cursor-pointer">
      {editUrl && <Link to={editUrl}>{logo}</Link>}
      {!editUrl && logo}
    </span>
  );
}
