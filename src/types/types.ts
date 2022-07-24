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
}

export interface IArticlesResponse {
  articles: IArticle[];
  articlesCount: number;
}

export interface IArticleResponse {
  article: IArticle | null;
}