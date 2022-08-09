import React, { useContext, useState } from "react";
import MarkDown from "markdown-to-jsx";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { IArticle, IAuthError } from "../../types/types";
import Article from "../article";
import style from "./slug.module.scss";
import Context from "../../context";
import { useRequest } from "../../hooks/useRequest";

interface SlugProps {
  article: IArticle | null;
}

function Slug({ article }: SlugProps) {
  const { user } = useContext(Context);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState(false);
  const deleteArticle = (slug: string | undefined) => {
    return axios.delete(`https://blog.kata.academy/api/articles/${slug}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
  };
  const [response, loading, error] = useRequest<
    string | null,
    boolean,
    IAuthError
  >(
    () => {
      if (isClicked) {
        setIsClicked(false);
        return deleteArticle(article?.slug);
      }
    },
    null,
    isClicked
  );
  if (response === "") {
    return <Redirect to={"/"} />;
  }
  if (article) {
    return (
      <div className={style.slug}>
        <Article {...article} />
        {article.author.username === user?.username ? (
          <div className={style["button-group"]}>
            <button
              className={style.delete}
              onClick={() => {
                setIsWarning(true);
              }}
            >
              Delete
            </button>
            <Link to={`/articles/${article.slug}/edit`} className={style.edit}>
              Edit
            </Link>
            {isWarning && (
              <div className={style.warning}>
                <span className={style["warning-text"]}>
                  Are you sure to delete this article?
                </span>
                <div className={style["warning-buttons"]}>
                  <button
                    className={style.no}
                    onClick={() => {
                      setIsWarning(false);
                    }}
                  >
                    No
                  </button>
                  <button
                    className={style.yes}
                    onClick={() => {
                      setIsClicked(true);
                    }}
                  >
                    Yes
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
        <div className={style.body}>
          <MarkDown>{article.body}</MarkDown>
        </div>
      </div>
    );
  }
  return null;
}

export default Slug;
