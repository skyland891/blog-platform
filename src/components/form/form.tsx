import React from "react";
import {
  FieldValues,
  UseFormRegister,
  ValidationRule,
  UseFormHandleSubmit,
} from "react-hook-form";
import style from "./form.module.scss";

export interface Input {
  label: string;
  id: string;
  type: string;
  placeholder?: string;
  element?: {
    value?: string;
    checked?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  pattern?: ValidationRule<RegExp>;
  validate?: (value: string) => boolean | string;
  required?: ValidationRule<boolean>;
}

interface FormProps {
  register: UseFormRegister<FieldValues>;
  title: string;
  inputs: Input[];
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  onSubmit: () => void;
  submitButtonLabel: string;
  errors: any;
}

function Form({
  register,
  title,
  inputs,
  handleSubmit,
  onSubmit,
  submitButtonLabel,
  errors,
}: FormProps) {
  const inputClassName = (input: Input) => {
    if (errors[`${input.id}`]) {
      if (input.type === "checkbox") {
        return style["checkbox-error"];
      }
      return style["input-error"];
    }
    if (input.type === "checkbox") {
      return style.checkbox;
    }
    return style.input;
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
              className={inputClassName(input)}
              type={input.type}
              id={input.id}
              placeholder={input.placeholder}
              {...register(input.id, {
                required: input.required,
                minLength: input.minLength,
                maxLength: input.maxLength,
                pattern: input.pattern,
                validate: input.validate,
              })}
              {...input.element}
            />
            <div className={style.error}>
              {errors[`${input.id}`] && (
                <p className={style["error-text"]}>
                  {errors[`${input.id}`].message !== ""
                    ? errors[`${input.id}`].message
                    : "Error!"}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <button className={style.submit} type="submit">
        {submitButtonLabel}
      </button>
    </form>
  );
}

export default Form;
