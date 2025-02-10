import { useSidebarHeight, PrimaryNavigation } from '@myst-theme/site';
import { TabStateProvider, UiStateProvider, useThemeTop } from '@myst-theme/providers';
import { MadeWithMyst } from '@myst-theme/icons';
import { Toolbar } from './toolbar/Toolbar';

function NavigationAndArticleWrapperInternal({
  children,
  hide_toc,
  hideSearch,
  projectSlug,
  inset = 20, // begin text 20px from the top (aligned with menu)
}: {
  hide_toc?: boolean;
  hideSearch?: boolean;
  projectSlug?: string;
  children: React.ReactNode;
  inset?: number;
}) {
  const top = useThemeTop();
  const { container, toc } = useSidebarHeight(top, inset);
  return (
    <>
      <Toolbar />
      <PrimaryNavigation
        sidebarRef={toc}
        hide_toc={hide_toc}
        footer={<MadeWithMyst />}
        projectSlug={projectSlug}
      />
      <TabStateProvider>
        <article
          ref={container}
          className="article content article-grid grid-gap"
          // article does not neet to get top as it is in the page flow (z-0)
          // style={{ marginTop: top }}
        >
          {children}
        </article>
      </TabStateProvider>
    </>
  );
}

export function NavigationAndArticleWrapper({
  children,
  hide_toc,
  hideSearch,
  projectSlug,
  inset = 20, // begin text 20px from the top (aligned with menu)
}: {
  hide_toc?: boolean;
  hideSearch?: boolean;
  projectSlug?: string;
  children: React.ReactNode;
  inset?: number;
}) {
  return (
    <UiStateProvider>
      <NavigationAndArticleWrapperInternal
        children={children}
        hide_toc={hide_toc}
        hideSearch={hideSearch}
        projectSlug={projectSlug}
        inset={inset}
      />
    </UiStateProvider>
  );
}
