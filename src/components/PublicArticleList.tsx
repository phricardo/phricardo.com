import { Link } from "react-router-dom";
import type { PublicArticle } from "@/services/publicArticleApi";
import styles from "./PublicArticleList.module.css";

interface PublicArticleListProps {
  articles: PublicArticle[];
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const PublicArticleList = ({ articles }: PublicArticleListProps) => {
  if (articles.length === 0) {
    return <p className={styles.empty}>Nenhum artigo publicado.</p>;
  }

  return (
    <div className={styles.articleList}>
      {articles.map((article) => (
        <Link
          key={article.slug}
          to={`/articles/${article.slug}`}
          className={styles.link}
        >
          <article className={styles.articleCard}>
            <div className={styles.articleMain}>
              <h3 className={styles.articleTitle}>{article.title}</h3>
              <div className={styles.metaRow}>
                <span className={styles.statusPublished}>
                  {article.author?.name || article.author?.username || "Autor"}
                </span>
                <span>{formatDate(article.createdAt)}</span>
                {article.tags.length > 0 && (
                  <div className={styles.tagList}>
                    {article.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
};

export default PublicArticleList;
