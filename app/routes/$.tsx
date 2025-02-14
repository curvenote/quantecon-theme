import {
  json,
  type V2_MetaFunction,
  type LinksFunction,
  type LoaderFunction,
} from '@remix-run/node';
import { getProject, isFlatSite, type PageLoader } from '@myst-theme/common';
import { KatexCSS, getMetaTagsForArticle } from '@myst-theme/site';
import { getConfig, getPage } from '~/backend/loaders.server';
import type { SiteManifest } from 'myst-config';
import { ErrorPage } from '~/components/ErrorPage';
import { Page } from '~/components/Page';

type ManifestProject = Required<SiteManifest>['projects'][0];

export const meta: V2_MetaFunction<typeof loader> = ({ data, matches, location }) => {
  if (!data) return [];

  const config: SiteManifest = data.config;
  const project: ManifestProject = data.project;
  const page: PageLoader['frontmatter'] = data.page.frontmatter;

  const siteTitle = config?.title ?? project?.title ?? '';

  return getMetaTagsForArticle({
    origin: '',
    url: location.pathname,
    title: page?.title ? `${page.title}${siteTitle ? ` - ${siteTitle}` : ''}` : siteTitle,
    description: page?.description ?? project?.description ?? config?.description ?? undefined,
    image:
      (page?.thumbnailOptimized || page?.thumbnail) ??
      (project?.thumbnailOptimized || project?.thumbnail) ??
      undefined,
    twitter: config?.options?.twitter,
    keywords: page?.keywords ?? project?.keywords ?? config?.keywords ?? [],
  });
};

export const links: LinksFunction = () => [KatexCSS];

export const loader: LoaderFunction = async ({ params, request }) => {
  const [first, ...rest] = new URL(request.url).pathname.slice(1).split('/');
  const config = await getConfig();
  const project = getProject(config, first);
  const projectName = project?.slug === first ? first : undefined;
  const slugParts = projectName ? rest : [first, ...rest];
  const slug = slugParts.length ? slugParts.join('.') : undefined;
  const flat = isFlatSite(config);
  const page = await getPage(request, {
    project: flat ? projectName : projectName ?? slug,
    slug: flat ? slug : projectName ? slug : undefined,
    redirect: process.env.MODE === 'static' ? false : true,
  });
  return json({ config, page, project });
};

export default Page;

export function ErrorBoundary() {
  return <ErrorPage />;
}
