import axios from "axios";
import React from "react";
import Article from "../components/article";
import Loader from "../components/loader";
import Pagination from "../components/pagination";
import { usePagination } from "../hooks/usePagination";
import { useRequest } from "../hooks/useRequest";
import { IArticle, IArticlesResponse } from "../types/types";

const fetchArticles = (offset: number) => {
  return axios.get<IArticlesResponse>(
    `https://blog.kata.academy/api/articles/?limit=5&offset=${offset}`
  );
};

function ArticlesPage() {
  const [initialResponse, initialLoading] = useRequest(() => fetchArticles(1), {
    articles: [],
    articlesCount: 0,
  });
  let { articles, articlesCount } = initialResponse;
  const {
    currentPage,
    setCurrentPage,
    startIndex,
    endIndex,
    setNextPage,
    setPreviousPage,
  } = usePagination({
    totalItems: articlesCount,
    initialPage: 1,
    initialPageSize: 5,
  });

  const [response, loading] = useRequest(
    () => fetchArticles(currentPage),
    {
      articles: [],
      articlesCount: 0,
    },
    currentPage
  );

  articles = response.articles;
  articlesCount = response.articlesCount;

  let maxId = 1000;

  if (initialLoading || loading) {
    return <Loader />;
  }

  return (
    <div style={{ marginTop: 26, padding: "0 250px" }}>
      {articles.length > 0 &&
        articles.map((article: IArticle) => {
          maxId += 1;
          return <Article key={maxId} {...article} />;
        })}
      <Pagination
        setNextPage={setNextPage}
        setPreviousPage={setPreviousPage}
        setCurrentPage={setCurrentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        currentPage={currentPage}
      />
    </div>
  );
}

export default ArticlesPage;
