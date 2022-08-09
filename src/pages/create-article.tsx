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

function CreateArticle() {
  const { user } = useContext(Context);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const title = useInput("");
  const description = useInput("");
  const bodyText = useInput("");
  const [tagList, setTagList] = useState<string[]>([""]);

  const [isClicked, setIsClicked] = useState(false);

  const postNewArticle = (
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
      return axios.post<IArticleResponse>(
        "https://blog.kata.academy/api/articles",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    }
  };

  const [response, loading, error] = useRequest<
    IArticleResponse,
    boolean,
    IAuthError
  >(
    () => {
      if (isClicked) {
        setIsClicked(false);
        return postNewArticle(
          title.value,
          description.value,
          bodyText.value,
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
    if (error && error.response?.status === 422) {
      Object.keys(error.response?.data?.errors).forEach((elem) => {
        setError(elem, {
          type: "custom",
          message: `${elem} ${error.response?.data.errors[elem]}`,
        });
      });
    }
  }, [error]);

  if (response?.article) {
    return <Redirect to={"/articles"} />;
  }

  if (!user) {
    return <Redirect to={"/login"} />;
  }
  if (loading) {
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
        articleTitle={title}
        description={description}
        body={bodyText}
        title="Create new article"
        errors={errors}
        tagList={tagList}
        setTagList={setTagList}
      />
    </div>
  );
}

export default CreateArticle;
