import React from "react";
import MarkDown from "markdown-to-jsx";
import { IArticle } from "../../types/types";
import Article from "../article";
import style from "./slug.module.scss";

interface SlugProps {
  article: IArticle | null;
}

function Slug({ article }: SlugProps) {
  if (article) {
    return (
      <div className={style.slug}>
        <Article {...article} />
        <div className={style.body}>
          <MarkDown>{article.body}</MarkDown>
        </div>
      </div>
    );
  }
  return null;
}

export default Slug;
