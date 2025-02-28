import { useGridSystemProvider } from '@myst-theme/providers';
import { MyST } from 'myst-to-react';
import classNames from 'classnames';
import type { GenericParent } from 'myst-common';

export function SiteFooter({ content, className }: { content: GenericParent; className?: string }) {
  const grid = useGridSystemProvider();
  return (
    <div
      className={classNames(
        'col-screen text-qetext-light text-opacity-80 dark:text-qetext-dark-muted subgrid-gap',
        grid
      )}
    >
      <div className="border-t-[5px] border-t-qeborder-blue col-body mb-5" />
      <MyST ast={content} className="col-screen" />
    </div>
  );
}
