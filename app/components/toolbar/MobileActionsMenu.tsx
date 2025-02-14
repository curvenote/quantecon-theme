import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { DownloadsButton } from './DownloadButton';
import { LaunchButton } from './LaunchButton';
import { GitHubButton } from './GitHubButton';

export function MobileActionsMenu({ sizeClasses, size }: { sizeClasses: string; size: number }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center cursor-pointer">
        <Tooltip label="Downloads">
          <EllipsisVertical
            className="opacity-90 hover:scale-110"
            width={size}
            height={size}
            tabIndex={0}
          />
        </Tooltip>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={5}
          className={`
            cursor-pointer min-w-max rounded-md bg-white 
            dark:bg-qepage-dark shadow-md dark:shadow-sm dark:shadow-white/20
            p-4 space-y-1 z-10 
            text-qetext-light dark:text-qetext-dark 
            will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade 
            `}
        >
          <DropdownMenu.Arrow className="shadow-md stroke-2 fill-white dark:fill-qepage-dark" />
          <ul className="mt-0 space-y-2">
            <li>
              <DownloadsButton size={size} showLabel />
            </li>
            <li>
              <LaunchButton size={size} showLabel />
            </li>
            <li>
              <GitHubButton sizeClasses={sizeClasses} showLabel />
            </li>
          </ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
