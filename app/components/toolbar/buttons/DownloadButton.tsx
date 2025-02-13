import { useProjectManifest } from '@myst-theme/providers';
import { triggerDirectDownload } from '@myst-theme/frontmatter';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { CloudDownload } from 'lucide-react';
import type { SiteAction, SiteExport } from 'myst-config';
import { usePage } from '~/components/PageProvider';

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
