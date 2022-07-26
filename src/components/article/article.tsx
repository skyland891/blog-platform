import React from "react";
import { Link } from "react-router-dom";
import like from "../../assets/img/like.svg";
import unlike from "../../assets/img/unlike.svg";
import style from "./article.module.scss";
import { IArticle } from "../../types/types";
import { dateFormat } from "../../utils/timeFormat";

function Article({
  title,
  description,
  author,
  createdAt,
  favoritesCount,
  favorited,
  tagList,
  slug,
  setLike,
  setUnlike,
}: IArticle) {
  let maxId = 100;
  const { username, image } = author;
  return (
    <div className={style["article-wrapper"]}>
      <div className={style["article-header"]}>
        <div className={style["article-header-left"]}>
          <Link to={`/articles/${slug}`} className={style.title}>
            {title}
          </Link>
          <div className={style["like-wrapper"]}>
            <img
              src={favorited ? like : unlike}
              onClick={() => {
                if (!favorited) {
                  setLike && setLike(slug);
                } else {
                  setUnlike && setUnlike(slug);
                }
              }}
            />
            <span className={style.likes}>{favoritesCount}</span>
          </div>
          <div
            style={{ display: "flex", justifyContent: "flex-start", gap: 8 }}
          >
            {tagList.map((tag) => {
              maxId += 1;
              if (tag.trim() === "") {
                return null;
              }
              return (
                <span className={style.tag} key={maxId}>
                  {tag}
                </span>
              );
            })}
          </div>
        </div>
        <div className={style["article-header-right"]}>
          <div className={style["post-data"]}>
            <span className={style.username}>{username}</span>
            <span className={style.date}>{dateFormat(createdAt)}</span>
          </div>
          <img className={style.avatar} src={image} alt={username} />
        </div>
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}

export default Article;
