import classNames from 'classnames';
import { useNavOpen, useSiteManifest, useThemeSwitcher } from '@myst-theme/providers';
import { LoadingBar, useTheme } from '@myst-theme/site';
import { Search } from '@myst-theme/site/src/components/Navigation/Search';
import {
  CircleMinus,
  CirclePlay,
  CirclePlus,
  CloudDownload,
  House,
  Maximize,
  Menu,
  File,
} from 'lucide-react';
import { ThemeButton } from './buttons';

export function Toolbar() {
  const [open, setOpen] = useNavOpen();
  const config = useSiteManifest();
  const { title, nav, actions } = config ?? {};
  const { logo, logo_dark, logo_text } = config?.options ?? {};
  const { isDark } = useThemeSwitcher();
  return (
    <div
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-[56px] px-8',
        'bg-qetoolbar-light dark:bg-qetoolbar-dark',
        'border-b-[1px] border-qetoolbar-border dark:bg-neutral-700'
      )}
    >
      <ul className="flex items-center w-full space-x-5 text-qetext-light dark:text-qetext-dark">
        <li>
          <Menu width={24} height={24} />
        </li>
        <li>
          <House width={24} height={24} />
        </li>
        <li>
          <img src="/logos/qemb-logo.png" alt="QuantEcon Logo" className="h-8" />
        </li>
        <li className="flex-grow" />
        <li>
          <Search />
        </li>
        <li>
          <Maximize width={24} height={24} />
        </li>
        <li>
          <CirclePlus width={24} height={24} />
        </li>
        <li>
          <CircleMinus width={24} height={24} />
        </li>
        <li className="flex items-center pr-[36px]">
          <ThemeButton className="w-6 h-6 stoke-3" />
        </li>
        <li>
          <CloudDownload width={24} height={24} />
        </li>
        <li>
          <CirclePlay width={24} height={24} />
        </li>
        <li>
          <File width={24} height={24} />
        </li>
        <li>
          {isDark ? (
            <img src="/logos/github-mark-white.svg" alt="Github Logo" className="h-6 opacity-80" />
          ) : (
            <img src="/logos/github-mark.svg" alt="Github Logo" className="h-6 opacity-80" />
          )}
        </li>
      </ul>
      <LoadingBar />
    </div>
  );
}
