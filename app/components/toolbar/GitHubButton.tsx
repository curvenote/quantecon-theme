import { useThemeSwitcher } from '@myst-theme/providers';
import { usePage } from '~/components/PageProvider';
import { Tooltip } from './Tooltip';
import classNames from 'classnames';

export function GitHubButton({
  sizeClasses,
  showLabel,
}: {
  sizeClasses: string;
  showLabel?: boolean;
}) {
  const { isDark } = useThemeSwitcher();
  const page = usePage();
  const editUrl = page?.frontmatter?.edit_url;

  const logo = (
    <>
      {isDark ? (
        <img
          src="/logos/github-mark-white.svg"
          alt="Github Logo"
          className={classNames('opacity-90 hover:scale-110', sizeClasses)}
        />
      ) : (
        <img
          src="/logos/github-mark.svg"
          alt="Github Logo"
          className={classNames('opacity-90 hover:scale-110', sizeClasses)}
        />
      )}
      {showLabel && <span className="ml-2">Edit</span>}
    </>
  );

  return (
    <div className={classNames('cursor-pointer', sizeClasses)}>
      {editUrl && (
        <a href={editUrl}>
          <Tooltip label="Edit on GitHub">{logo}</Tooltip>
        </a>
      )}
      {!editUrl && logo}
    </div>
  );
}
