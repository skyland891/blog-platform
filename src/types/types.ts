import { Dispatch, SetStateAction } from "react";

export interface IArticle {
  author: {
    username: string;
    image: string;
    following: boolean;
  };
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
  setLike?: Dispatch<SetStateAction<string | false>>;
  setUnlike?: Dispatch<SetStateAction<string | false>>;
}

export interface IUser {
  username: string;
  email: string;
  image?: string;
  bio?: string;
  token: string;
}

export interface IArticlesResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface IArticleResponse {
  article: IArticle | null;
}

export interface IUserResponse {
  user: IUser | null;
}

export interface IAuthError {
  errors: {
    [key: string]: string;
  };
}
