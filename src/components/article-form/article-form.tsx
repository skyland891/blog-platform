import React, { Dispatch, SetStateAction, useState } from "react";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import style from "./article-form.module.scss";

interface InputElementProps {
  value?: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

interface ArticleFormProps {
  title: string;
  articleTitle: InputElementProps;
  description: InputElementProps;
  body: InputElementProps;
  tagList: string[];
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: () => void;
  errors: any;
  setTagList: Dispatch<SetStateAction<string[]>>;
}

function ArticleForm({
  title,
  register,
  handleSubmit,
  onSubmit,
  articleTitle,
  description,
  body,
  errors,
  tagList,
  setTagList,
}: ArticleFormProps) {
  let maxId = 0;
  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={style.title}>{title}</h2>
      <div className={style["inputs-wrapper"]}>
        <div className={style["input-wrapper"]}>
          <label className={style.label}>Title</label>
          <input
            className={errors.title ? style["error-input"] : style.input}
            placeholder="Title"
            {...register("title", {
              validate: () => {
                return (
                  articleTitle.value !== "" || "Поле обязтельно для заполнения"
                );
              },
            })}
            {...articleTitle}
          />
          <div className={style.error}>
            {errors.title && (
              <p className={style["error-text"]}>
                {errors.title.message !== "" ? errors.title.message : "Error!"}
              </p>
            )}
          </div>
        </div>
        <div className={style["input-wrapper"]}>
          <label className={style.label}>Short description</label>
          <input
            className={errors.description ? style["error-input"] : style.input}
            placeholder="Short description"
            {...register("description", {
              validate: () => {
                return (
                  description.value !== "" || "Поле обязтельно для заполнения"
                );
              },
            })}
            {...description}
          />
          <div className={style.error}>
            {errors.description && (
              <p className={style["error-text"]}>
                {errors.description.message !== ""
                  ? errors.description.message
                  : "Error!"}
              </p>
            )}
          </div>
        </div>
        <div className={style["input-wrapper"]}>
          <label className={style.label}>Text</label>
          <textarea
            className={errors.text ? style["error-input"] : style.input}
            placeholder="Text"
            {...register("text", {
              validate: () => {
                return body.value !== "" || "Поле обязтельно для заполнения";
              },
            })}
            {...body}
          />
          <div className={style.error}>
            {errors.text && (
              <p className={style["error-text"]}>
                {errors.text.message !== "" ? errors.text.message : "Error!"}
              </p>
            )}
          </div>
        </div>
        <div className={style["input-wrapper"]}>
          <label className={style.label}>Tags</label>
          <div className={style["tags-wrapper"]}>
            {tagList.map((tag, index) => {
              if (tagList.length === index + 1) {
                return (
                  <div className={style["tag-wrapper"]} key={maxId++}>
                    <input
                      className={style["tag-input"]}
                      placeholder="Tag"
                      value={tag}
                      onChange={(e) => {
                        setTagList(
                          tagList.map((elem, i) => {
                            if (i === index) {
                              return e.target.value;
                            }
                            return elem;
                          })
                        );
                      }}
                    />
                    <button
                      className={style.delete}
                      onClick={(e) => {
                        e.preventDefault();
                        setTagList(tagList.filter((elem, i) => index !== i));
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className={style.add}
                      onClick={() => {
                        setTagList([...tagList, ""]);
                      }}
                    >
                      Add
                    </button>
                  </div>
                );
              }
              return (
                <div className={style["tag-wrapper"]} key={maxId++}>
                  <input
                    className={style["tag-input"]}
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => {
                      setTagList(
                        tagList.map((elem, i) => {
                          if (i === index) {
                            return e.target.value;
                          }
                          return elem;
                        })
                      );
                    }}
                  />
                  <button
                    className={style.delete}
                    onClick={(e) => {
                      e.preventDefault();
                      setTagList(tagList.filter((elem, i) => index !== i));
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button className={style["submit-button"]} type="submit">
        Send
      </button>
    </form>
  );
}

export default ArticleForm;
