import type { Heading } from '@myst-theme/common';
import { getProjectHeadings } from '@myst-theme/common';
import {
  useBaseurl,
  useNavOpen,
  useProjectManifest,
  useSiteManifest,
  useThemeTop,
  withBaseurl,
} from '@myst-theme/providers';
import { useSidebarHeight } from '@myst-theme/site';
import { Link } from '@remix-run/react';
import classNames from 'classnames';

type StrictHeading = Omit<Heading, 'level'> & { level: number };
type HeadingGroup = StrictHeading[];

function Section({ group }: { group: HeadingGroup }) {
  const baseurl = useBaseurl();
  return (
    <ul>
      {group.map((heading) => (
        <li
          className="my-[6px] font-light text-qetext-light dark:text-qetext-dark opacity-80 dark:bg-opacity-100"
          key={heading.slug ?? heading.title}
        >
          {heading.slug ? (
            <Link to={withBaseurl(heading.slug, baseurl)}>
              {heading.enumerator ? `${heading.enumerator}. ` : ''}
              {heading.title}
            </Link>
          ) : (
            <span>
              {heading.enumerator ? `${heading.enumerator}. ` : ''}
              {heading.title}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function ContentsSidebar() {
  const [open] = useNavOpen();
  const config = useSiteManifest();
  const project = useProjectManifest();
  const top = useThemeTop();
  const { toc } = useSidebarHeight(top);

  if (!config) return null;

  const contents = getProjectHeadings(config, project?.slug, {
    addGroups: false,
  });

  const headings = (contents ?? [])
    ?.filter((heading): heading is StrictHeading => heading.level !== 'index')
    .filter((heading) => heading.level < 3)
    .reduce<(StrictHeading | HeadingGroup)[]>(
      (acc, heading, idx) => {
        if (idx === 0) {
          return [heading];
        } else if (heading.level === 1) {
          return [...acc, heading];
        }
        const last = acc[acc.length - 1];
        const item = heading;
        if (Array.isArray(last)) {
          last.push(item);
          return acc;
        } else {
          return [...acc, [item]];
        }
      },
      [] as (StrictHeading | HeadingGroup)[]
    );

  return (
    <div
      ref={toc}
      className={classNames(
        'fixed top-0 left-0',
        'w-[350px] lg:w-[250px] 2xl:w-[350px]',
        'h-screen w-[250px] z-[20] pt-[40px] pb-[90px] px-9',
        'bg-qetoolbar-light dark:bg-qetoolbar-dark ',
        'border-r-[1px] border-qetoolbar-border',
        'transition-all duration-300 ease-in-out',
        'overflow-y-auto',
        { 'translate-x-0': open, '-translate-x-full': !open }
      )}
      style={{ top: '50px' }}
    >
      <div className="mb-4 text-lg font-bold text-qetext-light dark:text-qetext-dark">Contents</div>
      <nav className="text-qetext-light">
        {headings?.map((headingOrGroup) => {
          if (Array.isArray(headingOrGroup))
            return (
              <Section
                key={headingOrGroup[0].slug ?? headingOrGroup[0].title}
                group={headingOrGroup}
              />
            );
          return (
            <p
              className="mt-5 mb-4 text-lg font-semibold text-qetext-light dark:text-qetext-dark"
              key={headingOrGroup.slug ?? headingOrGroup.title}
            >
              {headingOrGroup.title}
            </p>
          );
        })}
      </nav>
    </div>
  );
}
