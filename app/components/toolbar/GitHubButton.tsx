import { useThemeSwitcher } from '@myst-theme/providers';
import { usePage } from '~/components/PageProvider';
import { Tooltip } from './Tooltip';

export function GitHubButton() {
  const { isDark } = useThemeSwitcher();
  const page = usePage();
  const editUrl = page?.frontmatter?.edit_url;

  const logo = (
    <>
      {isDark ? (
        <img
          src="/logos/github-mark-white.svg"
          alt="Github Logo"
          className="h-5 opacity-90 hover:scale-110"
        />
      ) : (
        <img
          src="/logos/github-mark.svg"
          alt="Github Logo"
          className="h-5 opacity-90 hover:scale-110"
        />
      )}
    </>
  );

  return (
    <span className="cursor-pointer">
      {editUrl && (
        <a href={editUrl}>
          <Tooltip label="Edit on GitHub">{logo}</Tooltip>
        </a>
      )}
      {!editUrl && logo}
    </span>
  );
}
