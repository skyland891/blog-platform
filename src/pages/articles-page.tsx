import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Article from "../components/article";
import Loader from "../components/loader";
import Pagination from "../components/pagination";
import Context from "../context";
import { usePagination } from "../hooks/usePagination";
import { useRequest } from "../hooks/useRequest";
import {
  IArticle,
  IArticleResponse,
  IArticlesResponse,
  IAuthError,
} from "../types/types";

function ArticlesPage() {
  const { user } = useContext(Context);
  const fetchArticles = (offset: number) => {
    return axios.get<IArticlesResponse>(
      `https://blog.kata.academy/api/articles/?limit=5&offset=${offset}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
  };
  const [initialResponse, initialLoading] = useRequest(() => fetchArticles(1), {
    articles: [],
    articlesCount: 0,
  });
  const [like, setLike] = useState<false | string>(false);
  const [unlike, setUnlike] = useState<false | string>(false);
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

  const likeArticle = (slug: string) => {
    return axios.post<IArticleResponse>(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      null,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
  };

  const unlikeArticle = (slug: string) => {
    return axios.delete<IArticleResponse>(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
  };

  const [likeResponse, likeLoading, likeError] = useRequest<
    IArticleResponse | null,
    string | boolean,
    IAuthError
  >(
    () => {
      if (like) {
        setLike(false);
        return likeArticle(like);
      }
    },
    null,
    like
  );

  const [unLikeResponse, unLikeLoading, unLikeError] = useRequest<
    IArticleResponse | null,
    string | boolean,
    IAuthError
  >(
    () => {
      if (unlike) {
        setUnlike(false);
        return unlikeArticle(unlike);
      }
    },
    null,
    unlike
  );

  const [response, loading] = useRequest(
    () => fetchArticles(currentPage),
    {
      articles: [],
      articlesCount: 0,
    },
    [currentPage, likeResponse, unLikeResponse, user]
  );

  articles = response.articles;
  articlesCount = response.articlesCount;

  let maxId = 1000;

  if (initialLoading || loading) {
    return <Loader />;
  }

  if (likeError && likeError.response?.status === 404) {
    console.log(likeError);
  }

  return (
    <div style={{ marginTop: 26, padding: "0 250px" }}>
      {articles.length > 0 &&
        articles.map((article: IArticle) => {
          maxId += 1;
          return (
            <Article
              key={maxId}
              {...article}
              setLike={setLike}
              setUnlike={setUnlike}
            />
          );
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
