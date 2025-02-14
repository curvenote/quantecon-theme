import * as RTooltip from '@radix-ui/react-tooltip';
import classNames from 'classnames';

export function Tooltip({
  children,
  label,
  asChild,
  disabled,
}: React.PropsWithChildren<{ label: string; asChild?: boolean; disabled?: boolean }>) {
  return (
    <RTooltip.Provider>
      <RTooltip.Root>
        <RTooltip.Trigger asChild={asChild} className="flex items-center">
          {children}
        </RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content
            sideOffset={5}
            className={classNames(
              'z-10 px-2 py-1 bg-white rounded-md shadow-md dark:bg-qepage-dark text-qetext-light dark:text-qetext-dark dark:shadow-sm dark:shadow-white/20',
              { hidden: disabled }
            )}
          >
            {label}
            <RTooltip.Arrow className="fill-white dark:fill-qepage-dark" />
          </RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
}
