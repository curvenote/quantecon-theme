import classNames from 'classnames';
import { LoadingBar } from '@myst-theme/site';
import { Search } from '@myst-theme/site/src/components/Navigation/Search';
import { CircleMinus, CirclePlus, House } from 'lucide-react';
import { Link } from '@remix-run/react';
import { SidebarToggle } from './SidebarToggle';
import { QuantEconButton } from './QuantEconButton';
import { ThemeButton } from './ThemeButton';
import { DownloadsButton } from './DownloadButton';
import { GitHubButton } from './GitHubButton';
import { LaunchButton } from './LaunchButton';
import { FullScreenButton } from './FullscreenButton';
import { FontScaleListItems } from './FontScaleListItems';
import { Tooltip } from './Tooltip';

export function Toolbar() {
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
          <Link to="/">
            <Tooltip label="Home">
              <House className="opacity-90 hover:scale-110" width={iconSize} height={iconSize} />
            </Tooltip>
          </Link>
        </li>
        <li>
          <QuantEconButton />
        </li>
        <li className="flex-grow" />
        <li>
          <Search />
        </li>
        <li>
          <FullScreenButton size={iconSize} />
        </li>
        <FontScaleListItems scale="1.2" size={iconSize} />
        <li className="flex items-center pr-[36px]">
          <ThemeButton className="w-5 h-5 opacity-60" />
        </li>
        <li>
          <DownloadsButton size={iconSize} />
        </li>
        <li>
          <LaunchButton size={iconSize} />
        </li>
        <li>
          <GitHubButton />
        </li>
      </ul>
      <LoadingBar />
    </div>
  );
}
