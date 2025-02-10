import type { PageLoader } from '@myst-theme/common';
import { useOutlineHeight } from '@myst-theme/site';
import { useLoaderData } from '@remix-run/react';
import type { SiteManifest } from 'myst-config';
import { useBaseurl, useSiteManifest, ProjectProvider } from '@myst-theme/providers';
import { ComputeOptionsProvider, ThebeLoaderAndServer } from '@myst-theme/jupyter';
import { PageContent } from '~/components/PageContent';
import type { TemplateOptions } from '~/types';
import { NavigationAndArticleWrapper } from './NavigationAndArticleWrapper';

type ManifestProject = Required<SiteManifest>['projects'][0];

export function Page() {
  const { container } = useOutlineHeight();
  const data = useLoaderData() as {
    page: PageLoader;
    project: ManifestProject;
  };
  const baseurl = useBaseurl();
  const pageDesign: TemplateOptions = (data.page.frontmatter as any)?.site ?? {};
  const siteDesign: TemplateOptions =
    (useSiteManifest() as SiteManifest & TemplateOptions)?.options ?? {};
  const { hide_toc, hide_search, hide_footer_links } = {
    ...siteDesign,
    ...pageDesign,
  };
  return (
    <NavigationAndArticleWrapper
      hide_toc={hide_toc}
      hideSearch={hide_search}
      projectSlug={data.page.project}
    >
      {/* <ProjectProvider project={project}> */}
      <ProjectProvider>
        <ComputeOptionsProvider
          features={{
            notebookCompute: true,
            figureCompute: true,
            launchBinder: false,
          }}
        >
          <ThebeLoaderAndServer baseurl={baseurl}>
            <main ref={container} className="article-grid subgrid-gap col-screen">
              <PageContent article={data.page} hide_all_footer_links={hide_footer_links} />
            </main>
          </ThebeLoaderAndServer>
        </ComputeOptionsProvider>
      </ProjectProvider>
    </NavigationAndArticleWrapper>
  );
}
