import { useHeaders } from '@myst-theme/site';
import { Link } from '@remix-run/react';
import classNames from 'classnames';
import useScroll from '~/hooks/useScroll';

export function BackToTop() {
  const isScrolled = useScroll(80);
  return (
    <div className="fixed bottom-0 left-0 right-0 col-screen not-prose simple-center-grid grid-gap">
      <div className="relative col-margin">
        <p
          className={classNames(
            'absolute bottom-0 font-semibold text-md z-[1000] transition-opacity ease-in-out duration-300',
            {
              'opacity-100': isScrolled,
              'opacity-0': !isScrolled,
            }
          )}
        >
          <Link to="#top">Back to top</Link>
        </p>
      </div>
    </div>
  );
}

export function Outline({
  containerClassName,
  innerClassName,
  pageEnumerator,
}: {
  containerClassName?: string;
  innerClassName?: string;
  pageEnumerator?: string;
}) {
  const { headings } = useHeaders('main h2', 3);
  return (
    <div className={classNames('relative self-start', containerClassName)}>
      <nav
        className={classNames(
          'absolute inset-0 not-prose space-y-6 text-opacity-80 dark:font-semibold',
          innerClassName
        )}
      >
        {headings.length > 0 && (
          <>
            <p className="mb-4 text-lg font-bold text-opacity-100 dark:text-qetext-dark">
              On this page
            </p>
            <ul className="space-y-2 not-prose">
              {headings.map((h, i) => (
                <li key={`outline-li-${h.id}`}>
                  <Link to={`#${h.id}`}>
                    {pageEnumerator ? `${pageEnumerator}.${i + 1}. ${h.title}` : h.title}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <div>
          <img
            className="dark:hidden"
            src="/logos/qe-logo.png"
            alt="a quantecon logo with a cancdlestick chart and text"
            width={150}
          />
          <img
            className="hidden dark:block"
            src="/logos/quantecon-logo-transparent.png"
            alt="a quantecon logo with a cancdlestick chart and text"
            width={150}
          />
        </div>
        <p className="text-sm">
          Powered by <a href="https://mystmd.org">Myst Markdown</a>
        </p>
      </nav>
    </div>
  );
}
