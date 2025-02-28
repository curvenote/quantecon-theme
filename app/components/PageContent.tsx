import React from 'react';
import {
  useProjectManifest,
  useSiteManifest,
  GridSystemProvider,
  ArticleProvider,
} from '@myst-theme/providers';
import {
  Bibliography,
  FrontmatterParts,
  BackmatterParts,
  extractKnownParts,
  Footnotes,
} from '@myst-theme/site';
import type { PageLoader } from '@myst-theme/common';
import { MyST } from 'myst-to-react';
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
import { ProjectFrontmatter } from './ProjectFrontmatter.js';
import { BackToTop, Outline } from './Outline.js';
import { SiteFooter } from './SiteFooter.js';

export const PageContent = React.memo(function ({ article }: { article: PageLoader }) {
  const config = useSiteManifest();
  const manifest = useProjectManifest();
  const compute = useComputeOptions();
  const tree = copyNode(article.mdast);
  const keywords = article.frontmatter?.keywords ?? [];
  const parts = extractKnownParts(tree, article.frontmatter?.parts);
  const projectParts = config?.parts ?? {};

  return (
    <GridSystemProvider gridSystem="simple-center-grid">
      <ArticleProvider
        references={{ ...article.references, article: article.mdast }}
        kind={article.kind}
        frontmatter={article.frontmatter}
      >
        <BusyScopeProvider>
          <ExecuteScopeProvider enable={compute?.enabled ?? false} contents={article}>
            <div className="relative simple-center-grid subgrid-gap">
              <div id="top" className="h-0 m-0 col-body" />
              <div id="skip-to-frontmatter" />
              <ProjectFrontmatter
                projectTitle={manifest?.title ?? 'Project Title'}
                pageTitle={manifest?.index !== article.slug ? article.frontmatter.title : undefined}
                authors={article.frontmatter.authors}
                affiliations={article.frontmatter.affiliations}
              />
              <Outline
                containerClassName="hidden lg:col-margin"
                pageEnumerator={article.frontmatter.enumerator}
              />
              {compute?.enabled &&
                compute.features.notebookCompute &&
                article.kind === SourceFileKind.Notebook && <NotebookToolbar showLaunch />}
              {compute?.enabled && article.kind === SourceFileKind.Article && (
                <ErrorTray pageSlug={article.slug} />
              )}
              <div id="skip-to-article" />
              {manifest?.index !== article.slug && (
                <h1 className="pt-12 m-0">
                  {article.frontmatter.enumerator && <>{article.frontmatter.enumerator}. </>}
                  {article.frontmatter.title}
                </h1>
              )}
              <FrontmatterParts
                containerClassName="col-body"
                parts={parts}
                keywords={keywords}
                hideKeywords
              />
              <MyST
                className="col-screen prose-qetext-light dark:prose-qetext-dark"
                ast={tree as GenericParent}
              />
              <BackmatterParts containerClassName="col-body" parts={parts} />
              <Footnotes innerClassName="col-body" />
              <Bibliography innerClassName="col-body" />
              <ConnectionStatusTray />
              {projectParts?.footer && <SiteFooter content={projectParts.footer.mdast} />}
              <BackToTop />
            </div>
          </ExecuteScopeProvider>
        </BusyScopeProvider>
      </ArticleProvider>
    </GridSystemProvider>
  );
});

PageContent.displayName = 'PageContent';
