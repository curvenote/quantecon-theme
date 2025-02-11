import { Link } from '@remix-run/react';
import classNames from 'classnames';
import type { Contributor } from 'myst-frontmatter';
import React from 'react';

export function ProjectFrontmatter({
  className,
  projectTitle,
  pageTitle,
  authors,
}: {
  className?: string;
  projectTitle: string;
  pageTitle?: string;
  authors?: Contributor[];
}) {
  return (
    <div
      className={classNames(
        'col-body border-b-[5px] border-b-qeborder-blue space-y-1 pb-4',
        className
      )}
    >
      <div className="space-x-4">
        <div
          aria-label="Book title"
          className={classNames('block font-bold lg:inline prose-a:text-inherit', {
            'text-lg': pageTitle,
            'text-4xl': !pageTitle,
          })}
        >
          <Link to="/">{projectTitle}</Link>
        </div>
        {pageTitle && (
          <div className="block text-lg lg:inline" aria-label="Page title">
            {pageTitle}
          </div>
        )}
      </div>
      {authors && (
        <div aira-label="Author names and links">
          {authors.reduce<React.ReactNode>((acc, a, i, authors) => {
            let chunk: React.ReactNode = a.name;
            if (a.url) {
              chunk = (
                <Link to={a.url} className="font-normal no-underline hover:underline text-sky-500">
                  {chunk}
                </Link>
              );
            }
            if (i > 0 && i < authors.length - 1) {
              chunk = <>, {chunk}</>;
            } else if (i === authors.length - 1 && authors.length > 1) {
              chunk = <> and {chunk}</>;
            }
            return (
              <span>
                {acc}
                {chunk}
              </span>
            );
          }, '')}
        </div>
      )}
    </div>
  );
}
