import axios from "axios";
import React from "react";
import Slug from "../components/slug";
import { useRequest } from "../hooks/useRequest";
import { IArticleResponse } from "../types/types";

interface ArticlePageProps {
  slug: string;
}

const fetchArticle = (slug: string) => {
  return axios.get<IArticleResponse>(
    `https://blog.kata.academy/api/articles/${slug}`
  );
};

function ArticlePage({ slug }: ArticlePageProps) {
  const [response] = useRequest(() => fetchArticle(slug), {
    article: null,
  });
  const { article } = response;
  return (
    <div style={{ padding: "0 250px" }}>
      <Slug article={article} />
    </div>
  );
}

export default ArticlePage;
