import React from 'react';
import {
  ReferencesProvider,
  useProjectManifest,
  useSiteManifest,
  useThemeTop,
  useMediaQuery,
} from '@myst-theme/providers';
import {
  Bibliography,
  ContentBlocks,
  FooterLinksBlock,
  FrontmatterParts,
  BackmatterParts,
  DocumentOutline,
  extractKnownParts,
  Footnotes,
  combineDownloads,
} from '@myst-theme/site';
import type { SiteManifest } from 'myst-config';
import type { PageLoader } from '@myst-theme/common';
import { copyNode, type GenericParent } from 'myst-common';
import { SourceFileKind } from 'myst-spec-ext';
import {
  ExecuteScopeProvider,
  BusyScopeProvider,
  NotebookToolbar,
  ConnectionStatusTray,
  ErrorTray,
  useComputeOptions,
} from '@myst-theme/jupyter';
import { FrontmatterBlock } from '@myst-theme/frontmatter';
import type { TemplateOptions } from '../types.js';

export const PageContent = React.memo(function ({ article }: { article: PageLoader }) {
  const manifest = useProjectManifest();
  const compute = useComputeOptions();
  const top = useThemeTop();

  const pageDesign: TemplateOptions = (article.frontmatter as any)?.site ?? {};
  const siteDesign: TemplateOptions =
    (useSiteManifest() as SiteManifest & TemplateOptions)?.options ?? {};
  const { outline_maxdepth } = {
    ...siteDesign,
    ...pageDesign,
  };
  const downloads = combineDownloads(manifest?.downloads, article.frontmatter);
  const tree = copyNode(article.mdast);
  const keywords = article.frontmatter?.keywords ?? [];
  const parts = extractKnownParts(tree, article.frontmatter?.parts);
  const isOutlineMargin = useMediaQuery('(min-width: 1024px)');
  const { thebe } = manifest as any;
  const { location } = article;

  return (
    <ReferencesProvider
      references={{ ...article.references, article: article.mdast }}
      frontmatter={article.frontmatter}
    >
      <BusyScopeProvider>
        <ExecuteScopeProvider enable={compute?.enabled ?? false} contents={article}>
          <div className="simple-center-grid subgrid-gap">
            <div className="h-[100px] bg-blue-300 col-gutter-left"></div>
            <div className="h-[100px] bg-green-300 col-body"></div>
            <div className="h-[100px] bg-yellow-300 col-margin"></div>
            <div className="h-[100px] bg-blue-300 col-gutter-right"></div>
            <div className="h-[30px] bg-red-300 col-screen"></div>
            <div className="h-[100px] bg-blue-300 col-gutter-left"></div>
            <div className="h-[100px] bg-green-300 col-body"></div>
            <div className="h-[100px] bg-yellow-300 col-margin"></div>
            <div className="h-[100px] bg-blue-300 col-gutter-right"></div>
            <div className="h-[30px] bg-red-300 col-screen"></div>
            <div className="h-[100px] bg-blue-300 col-gutter-left"></div>
            <div className="h-[100px] bg-green-300 col-body"></div>
            <div className="h-[100px] bg-yellow-300 col-margin"></div>
            <div className="h-[100px] bg-blue-300 col-gutter-right"></div>
            <div className="h-[30px] bg-red-300 col-screen"></div>
            {/* <FrontmatterBlock
              kind={article.kind}
              frontmatter={{ ...article.frontmatter, downloads }}
              className="mb-8 pt-9 col-body"
              thebe={thebe}
              location={location}
            /> */}
            {/* <div
              className="block my-10 lg:sticky lg:z-10 lg:h-0 lg:pt-0 lg:my-0 lg:ml-10 lg:col-margin"
              style={{ top }}
            >
              <DocumentOutline
                className="relative mt-9"
                maxdepth={outline_maxdepth}
                isMargin={isOutlineMargin}
              />
            </div> */}
            {compute?.enabled &&
              compute.features.notebookCompute &&
              article.kind === SourceFileKind.Notebook && <NotebookToolbar showLaunch />}
            {compute?.enabled && article.kind === SourceFileKind.Article && (
              <ErrorTray pageSlug={article.slug} />
            )}
            <div id="skip-to-article" />
            {/* <div className="w-full bg-red-500 col-screen h-[500px]"></div> */}
            {/* <FrontmatterParts parts={parts} keywords={keywords} hideKeywords /> */}
            {/* <ContentBlocks pageKind={article.kind} mdast={tree as GenericParent} /> */}
            {/* <BackmatterParts parts={parts} /> */}
            {/* <Footnotes /> */}
            {/* <Bibliography /> */}
            <ConnectionStatusTray />
          </div>
        </ExecuteScopeProvider>
      </BusyScopeProvider>
    </ReferencesProvider>
  );
});

PageContent.displayName = 'PageContent';
