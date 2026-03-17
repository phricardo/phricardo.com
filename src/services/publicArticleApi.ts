import { request } from "@/lib/apiClient";

export interface PublicArticleAuthor {
  name: string;
  username: string;
  description?: string;
}

export interface PublicArticle {
  title: string;
  slug: string;
  shortCode: string;
  content: string;
  tags: string[];
  author: PublicArticleAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface PublicArticlePage {
  totalElements: number;
  totalPages: number;
  size: number;
  content: PublicArticle[];
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const listPublicArticles = () =>
  request<PublicArticlePage>("/v1/public/articles?p=0", { method: "GET" });

export const listPublicArticlesByPage = (page: number, timeoutMs?: number) =>
  request<PublicArticlePage>(`/v1/public/articles?p=${Math.max(page, 0)}`, {
    method: "GET",
    timeoutMs,
  });

export const getPublicArticleByIdentifier = (identifier: string) =>
  request<PublicArticle>(`/v1/public/articles/${identifier}`, { method: "GET" });

export const getPublicArticleBySlug = (slug: string) =>
  getPublicArticleByIdentifier(slug);
