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
import { SidebarToggle, ThemeButton } from './buttons';

export function Toolbar() {
  const config = useSiteManifest();
  const { title, nav, actions } = config ?? {};
  const { logo, logo_dark, logo_text } = config?.options ?? {};
  const { isDark } = useThemeSwitcher();
  const iconSize = 20;
  return (
    <div
      className={classNames(
        'fixed top-0 left-0 right-0 z-[2] flex items-center justify-between h-[50px] px-6',
        'bg-qetoolbar-light dark:bg-qetoolbar-dark',
        'border-b-[1px] border-qetoolbar-border'
      )}
    >
      <ul className="flex items-center w-full space-x-5 text-qetext-light dark:text-qetext-dark">
        <li>
          <SidebarToggle />
        </li>
        <li>
          <House width={iconSize} height={iconSize} />
        </li>
        <li>
          <img src="/logos/qemb-logo.png" alt="QuantEcon Logo" className="h-7" />
        </li>
        <li className="flex-grow" />
        <li>
          <Search />
        </li>
        <li>
          <Maximize className="opacity-60" width={iconSize} height={iconSize} />
        </li>
        <li>
          <CirclePlus className="opacity-60" width={iconSize} height={iconSize} />
        </li>
        <li>
          <CircleMinus className="opacity-60" width={iconSize} height={iconSize} />
        </li>
        <li className="flex items-center pr-[36px]">
          <ThemeButton className="w-6 h-6 opacity-60" />
        </li>
        <li>
          <CloudDownload width={iconSize} height={iconSize} />
        </li>
        <li>
          <CirclePlay width={iconSize} height={iconSize} />
        </li>
        <li>
          <File width={iconSize} height={iconSize} />
        </li>
        <li>
          {isDark ? (
            <img src="/logos/github-mark-white.svg" alt="Github Logo" className="h-5 opacity-80" />
          ) : (
            <img src="/logos/github-mark.svg" alt="Github Logo" className="h-5 opacity-80" />
          )}
        </li>
      </ul>
      <LoadingBar />
    </div>
  );
}
