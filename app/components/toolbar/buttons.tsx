import { useNavOpen, useProjectManifest, useThemeSwitcher } from '@myst-theme/providers';
import { triggerDirectDownload } from '@myst-theme/frontmatter';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Link } from '@remix-run/react';
import classNames from 'classnames';
import { CloudDownload, Menu, Sunset, X } from 'lucide-react';
import type { SiteAction, SiteExport } from 'myst-config';
import { usePage } from '../PageProvider';

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
  const data = usePage();
  const editUrl = data?.page?.frontmatter?.edit_url;

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

function DownloadItem({
  children,
  onSelect,
}: React.PropsWithChildren<{ onSelect?: (event: Event) => void }>) {
  return (
    <DropdownMenu.Item
      className={`
        group relative flex h-[25px] select-none items-center justify-start 
        rounded-[3px] px-[10px] leading-none 
        text-sm text-qetext-light dark:text-qetext-dark 
        outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-qeborder-blue/20 dark:data-[highlighted]:bg-qeborder-blue/80 data-[highlighted]:text-qetext-light data-[disabled]:text-opacity-50 
      `}
      onSelect={onSelect}
    >
      {children}
    </DropdownMenu.Item>
  );
}

export function DownloadsButton({ size }: { size: number }) {
  const project = useProjectManifest();
  const data = usePage();

  const handleDownload = async (d: SiteExport | SiteAction) => {
    const fallback =
      (d as SiteAction).title?.replace(/\s/g, '_') ?? `download${d.format ? `.${d.format}` : ''}`;
    await triggerDirectDownload(d.url, d.filename ?? fallback);
  };

  const downloads: SiteAction[] = [
    ...(project?.downloads ?? []),
    ...(data.page?.frontmatter?.downloads ?? []),
  ];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="cursor-pointer">
        <CloudDownload className="hover:scale-110" width={size} height={size} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={5}
          // side="bottom"
          className={`
            cursor-pointer min-w-max rounded-md bg-white dark:bg-qepage-dark border-qetoolbar-border 
            border-[1px] p-2 space-y-1 z-10 
            text-qetext-light dark:text-qetext-dark 
            will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade 
            `}
        >
          <DropdownMenu.Arrow className="stroke-2 fill-white dark:fill-qepage-dark stroke-qetoolbar-border" />
          {downloads.map((d, i) => (
            <DownloadItem key={`${i}-${d.url}`} onSelect={(e) => handleDownload(d)}>
              {d.title}
            </DownloadItem>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
