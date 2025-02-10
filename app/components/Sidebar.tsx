import type { Heading } from '@myst-theme/common';
import { getProjectHeadings } from '@myst-theme/common';
import {
  useNavOpen,
  useProjectManifest,
  useSiteManifest,
  useThemeTop,
} from '@myst-theme/providers';
import { useSidebarHeight } from '@myst-theme/site';
import { Link } from '@remix-run/react';
import classNames from 'classnames';

type StrictHeading = Omit<Heading, 'level'> & { level: number };
type HeadingGroup = StrictHeading[];

function Section({ group }: { group: HeadingGroup }) {
  return (
    <ul>
      {group.map((heading) => (
        <li
          className="my-2 font-light text-qetext-light opacity-80"
          key={heading.slug ?? heading.title}
        >
          {heading.slug ? (
            <Link to={heading.slug}>
              {heading.enumerator}. {heading.title}
            </Link>
          ) : (
            <span>
              {heading.enumerator}.{heading.title}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Sidebar() {
  const [open] = useNavOpen();
  const config = useSiteManifest();
  const project = useProjectManifest();
  const top = useThemeTop();
  const { toc } = useSidebarHeight(top);

  if (!config) return null;

  const contents = getProjectHeadings(config, project?.slug, {
    addGroups: false,
  });

  let enumerator = 1;
  const headings = (contents ?? [])
    ?.filter((heading): heading is StrictHeading => heading.level !== 'index')
    .filter((heading) => heading.level < 3)
    .reduce<(StrictHeading | HeadingGroup)[]>((acc, heading, idx) => {
      if (idx === 0) {
        return [heading];
      } else if (heading.level === 1) {
        return [...acc, heading];
      }
      const last = acc[acc.length - 1];
      if (Array.isArray(last)) {
        last.push({ ...heading, enumerator: `${enumerator++}` });
        return acc;
      } else {
        return [...acc, [{ ...heading, enumerator: `${enumerator++}` }]];
      }
    }, [] as (StrictHeading | HeadingGroup)[]);

  return (
    <div
      ref={toc}
      className={classNames(
        'fixed top-0 left-0',
        'h-screen w-[250px] z-[60] pt-[40px] pb-[90px] px-9',
        'bg-qetoolbar-light dark:bg-qetoolbar-dark',
        'border-r-[1px] border-qetoolbar-border',
        'transition-all duration-300 ease-in-out',
        'overflow-y-auto',
        { 'translate-x-0': open, '-translate-x-full': !open }
      )}
      style={{ top: '50px' }}
    >
      <div className="mb-4 text-lg font-bold text-qetext-light">Contents</div>
      <nav>
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
              className="mt-5 mb-4 text-lg font-semibold text-qetext-light"
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
