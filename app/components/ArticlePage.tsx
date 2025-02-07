import React from "react";
import {
  ReferencesProvider,
  useProjectManifest,
  useSiteManifest,
  useThemeTop,
  useMediaQuery,
} from "@myst-theme/providers";
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
} from "@myst-theme/site";
import type { SiteManifest } from "myst-config";
import type { PageLoader } from "@myst-theme/common";
import { copyNode, type GenericParent } from "myst-common";
import { SourceFileKind } from "myst-spec-ext";
import {
  ExecuteScopeProvider,
  BusyScopeProvider,
  NotebookToolbar,
  ConnectionStatusTray,
  ErrorTray,
  useComputeOptions,
} from "@myst-theme/jupyter";
import { FrontmatterBlock } from "@myst-theme/frontmatter";
import type { TemplateOptions } from "../types.js";

export const ArticlePage = React.memo(function ({
  article,
  hide_all_footer_links,
  hideKeywords,
}: {
  article: PageLoader;
  hide_all_footer_links?: boolean;
  hideKeywords?: boolean;
}) {
  const manifest = useProjectManifest();
  const compute = useComputeOptions();
  const top = useThemeTop();

  const pageDesign: TemplateOptions = (article.frontmatter as any)?.site ?? {};
  const siteDesign: TemplateOptions =
    (useSiteManifest() as SiteManifest & TemplateOptions)?.options ?? {};
  const {
    hide_title_block,
    hide_footer_links,
    hide_outline,
    outline_maxdepth,
  } = {
    ...siteDesign,
    ...pageDesign,
  };
  const downloads = combineDownloads(manifest?.downloads, article.frontmatter);
  const tree = copyNode(article.mdast);
  const keywords = article.frontmatter?.keywords ?? [];
  const parts = extractKnownParts(tree, article.frontmatter?.parts);
  const isOutlineMargin = useMediaQuery("(min-width: 1024px)");
  const { thebe } = manifest as any;
  const { location } = article;

  return (
    <ReferencesProvider
      references={{ ...article.references, article: article.mdast }}
      frontmatter={article.frontmatter}
    >
      <BusyScopeProvider>
        <ExecuteScopeProvider
          enable={compute?.enabled ?? false}
          contents={article}
        >
          {!hide_title_block && (
            <FrontmatterBlock
              kind={article.kind}
              frontmatter={{ ...article.frontmatter, downloads }}
              className="mb-8 pt-9"
              thebe={thebe}
              location={location}
            />
          )}
          {!hide_outline && (
            <div
              className="block my-10 lg:sticky lg:z-10 lg:h-0 lg:pt-0 lg:my-0 lg:ml-10 lg:col-margin-right"
              style={{ top }}
            >
              <DocumentOutline
                className="relative mt-9"
                maxdepth={outline_maxdepth}
                isMargin={isOutlineMargin}
              />
            </div>
          )}
          {compute?.enabled &&
            compute.features.notebookCompute &&
            article.kind === SourceFileKind.Notebook && (
              <NotebookToolbar showLaunch />
            )}
          {compute?.enabled && article.kind === SourceFileKind.Article && (
            <ErrorTray pageSlug={article.slug} />
          )}
          <div id="skip-to-article" />
          <FrontmatterParts
            parts={parts}
            keywords={keywords}
            hideKeywords={hideKeywords}
          />
          <ContentBlocks
            pageKind={article.kind}
            mdast={tree as GenericParent}
          />
          <BackmatterParts parts={parts} />
          <Footnotes />
          <Bibliography />
          <ConnectionStatusTray />
          {!hide_footer_links && !hide_all_footer_links && (
            <FooterLinksBlock links={article.footer} />
          )}
        </ExecuteScopeProvider>
      </BusyScopeProvider>
    </ReferencesProvider>
  );
});

ArticlePage.displayName = "ArticlePage";
