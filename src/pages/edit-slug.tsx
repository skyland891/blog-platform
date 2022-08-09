import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import ArticleForm from "../components/article-form";
import Loader from "../components/loader";
import Context from "../context";
import { useInput } from "../hooks/useInput";
import { useRequest } from "../hooks/useRequest";
import { IArticleResponse, IAuthError } from "../types/types";

interface EditSlugProps {
  slug: string;
}

const fetchArticle = (slug: string) => {
  return axios.get<IArticleResponse>(
    `https://blog.kata.academy/api/articles/${slug}`
  );
};

function EditSlug({ slug }: EditSlugProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleBody, setArticleBody] = useState("");
  const [tagList, setTagList] = useState<string[]>([""]);
  const { user } = useContext(Context);
  const [response, loading, error] = useRequest<
    IArticleResponse,
    boolean,
    IAuthError
  >(() => fetchArticle(slug), {
    article: null,
  });
  const { article } = response;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const updateArticle = (
    titleValue: string,
    descriptionValue: string,
    bodyValue: string,
    tagListValue: string[]
  ) => {
    if (
      titleValue.trim() !== "" &&
      descriptionValue.trim() !== "" &&
      bodyValue.trim() !== ""
    ) {
      const requestBody = {
        article: {
          title: titleValue,
          description: descriptionValue,
          body: bodyValue,
          tagList: tagListValue,
        },
      };
      return axios.put<IArticleResponse>(
        `https://blog.kata.academy/api/articles/${slug}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    }
  };

  const [updateResponse, updateLoading, updateError] = useRequest<
    IArticleResponse,
    boolean,
    IAuthError
  >(
    () => {
      if (isClicked) {
        setIsClicked(false);
        return updateArticle(
          articleTitle,
          articleDescription,
          articleBody,
          tagList
        );
      }
    },
    {
      article: null,
    },
    isClicked
  );

  useEffect(() => {
    if (updateError && updateError.response?.status === 422) {
      Object.keys(updateError.response?.data?.errors).forEach((elem) => {
        setError(elem, {
          type: "custom",
          message: `${elem} ${updateError.response?.data.errors[elem]}`,
        });
      });
    }
  }, [updateError]);

  useEffect(() => {
    if (article) {
      setArticleTitle(article.title);
      setArticleDescription(article.description);
      setArticleBody(article.body);
      setTagList(article.tagList);
    }
  }, [article]);

  if (article && (!user || user?.username !== article?.author.username)) {
    return <Redirect to={"/articles"} />;
  }
  if (error && error.response?.status === 404) {
    return <Redirect to={"/"} />;
  }

  if (updateResponse?.article) {
    return <Redirect to={"/articles"} />;
  }
  if (loading || updateLoading) {
    return <Loader />;
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 35,
      }}
    >
      <ArticleForm
        register={register}
        onSubmit={() => {
          setIsClicked(true);
        }}
        handleSubmit={handleSubmit}
        articleTitle={{
          value: articleTitle,
          onChange: (e) => {
            setArticleTitle(e.target.value);
          },
        }}
        description={{
          value: articleDescription,
          onChange: (e) => {
            setArticleDescription(e.target.value);
          },
        }}
        body={{
          value: articleBody,
          onChange: (e) => {
            setArticleBody(e.target.value);
          },
        }}
        title="Edit article"
        errors={errors}
        tagList={tagList}
        setTagList={setTagList}
      />
    </div>
  );
}

export default EditSlug;
