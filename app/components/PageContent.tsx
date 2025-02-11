import React from 'react';
import {
  ReferencesProvider,
  useProjectManifest,
  useSiteManifest,
  useThemeTop,
  useMediaQuery,
  GridSystemProvider,
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
import type { TemplateOptions } from '../types.js';

function GridGuide() {
  return (
    <>
      <div className="sticky top-[50px] h-[5px] bg-blue-300 col-gutter-left"></div>
      <div className="sticky top-[50px] h-[5px] bg-green-300 col-body"></div>
      <div className="sticky top-[50px] h-[5px] bg-yellow-300 col-margin"></div>
      <div className="sticky top-[50px] h-[5px] bg-blue-300 col-gutter-right"></div>
    </>
  );
}

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
    <GridSystemProvider grid="simple-center-grid">
      <ReferencesProvider
        references={{ ...article.references, article: article.mdast }}
        frontmatter={article.frontmatter}
      >
        <BusyScopeProvider>
          <ExecuteScopeProvider enable={compute?.enabled ?? false} contents={article}>
            <div className="simple-center-grid grid-gap">
              <GridGuide />
              <div
                className="block my-10 lg:sticky lg:z-10 lg:h-0 lg:pt-0 lg:my-0 lg:ml-10 lg:col-margin"
                style={{ top }}
              >
                <DocumentOutline
                  className="relative mt-9"
                  maxdepth={outline_maxdepth}
                  isMargin={isOutlineMargin}
                />
              </div>
              {compute?.enabled &&
                compute.features.notebookCompute &&
                article.kind === SourceFileKind.Notebook && <NotebookToolbar showLaunch />}
              {compute?.enabled && article.kind === SourceFileKind.Article && (
                <ErrorTray pageSlug={article.slug} />
              )}
              <div id="skip-to-article" />
              <FrontmatterParts
                containerClassName="col-body"
                parts={parts}
                keywords={keywords}
                hideKeywords
              />
              <ContentBlocks
                className="col-body"
                pageKind={article.kind}
                mdast={tree as GenericParent}
              />
              <BackmatterParts containerClassName="col-body" parts={parts} />
              <Footnotes containerClassName="col-body" />
              <Bibliography containerClassName="col-body" />
              <ConnectionStatusTray />
            </div>
          </ExecuteScopeProvider>
        </BusyScopeProvider>
      </ReferencesProvider>
    </GridSystemProvider>
  );
});

PageContent.displayName = 'PageContent';
