import React from "react";
import style from "./form.module.scss";

export interface Input {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
}

interface SubmitButton {
  label: string;
}

interface FormProps {
  title: string;
  inputs: Input[];
  submitButton: SubmitButton;
}

function Form({ title, inputs, submitButton }: FormProps) {
  return (
    <form className={style.form}>
      <h2 className={style.title}>{title}</h2>
      <ul>
        {inputs.map((input) => (
          <li
            className={
              input.type === "checkbox"
                ? style["input-item-checkbox"]
                : style["input-item"]
            }
            key={input.id}
          >
            <label
              className={
                input.type === "checkbox"
                  ? style["label-checkbox"]
                  : style.label
              }
              htmlFor={input.id}
            >
              {input.label}
            </label>
            <input
              className={
                input.type === "checkbox" ? style.checkbox : style.input
              }
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
            />
          </li>
        ))}
      </ul>
      <button className={style.submit} type="submit">
        {submitButton.label}
      </button>
    </form>
  );
}

export default Form;
