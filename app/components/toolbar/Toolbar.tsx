import classNames from 'classnames';
import { LoadingBar } from '@myst-theme/site';
import { Search } from '@myst-theme/site/src/components/Navigation/Search';
import { CircleMinus, CirclePlay, CirclePlus, CloudDownload, House, Maximize } from 'lucide-react';
import { GitHubButton, QuantEconButton, SidebarToggle, ThemeButton } from './buttons';
import { Link } from '@remix-run/react';

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
            <House width={iconSize} height={iconSize} />
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
          <GitHubButton />
        </li>
      </ul>
      <LoadingBar />
    </div>
  );
}
