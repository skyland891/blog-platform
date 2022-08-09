import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "../components/form";
import { Input } from "../components/form/form";
import Context from "../context";
import { useCheckbox } from "../hooks/useCheckbox";
import { useInput } from "../hooks/useInput";
import { useRequest } from "../hooks/useRequest";
import { IAuthError, IUserResponse } from "../types/types";
import Loader from "../components/loader";

function SignUp() {
  const username = useInput("");
  const email = useInput("");
  const password = useInput("");
  const repeatPassword = useInput("");
  const personalInformation = useCheckbox(false);
  const [isClicked, setIsClicked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = () => {
    setIsClicked(true);
  };

  const registerUser = (
    usernameValue: string,
    emailValue: string,
    passwordValue: string,
    repeatPasswordValue: string,
    personalInformationValue: boolean
  ) => {
    if (
      usernameValue !== "" &&
      emailValue !== "" &&
      passwordValue !== "" &&
      personalInformationValue &&
      repeatPasswordValue === passwordValue
    ) {
      const requestBody = {
        user: {
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
        },
      };
      return axios.post<IUserResponse>(
        "https://blog.kata.academy/api/users",
        requestBody
      );
    }
  };
  const [response, loading, error] = useRequest<
    IUserResponse,
    boolean,
    IAuthError
  >(
    () => {
      if (isClicked) {
        setIsClicked(false);
        return registerUser(
          username.value,
          email.value,
          password.value,
          repeatPassword.value,
          personalInformation.checked
        );
      }
    },
    {
      user: null,
    },
    isClicked
  );
  const { user } = response;

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
  const { setUser, user: savedUser } = useContext(Context);
  setUser(user);

  const usernameInput = {
    id: "username",
    placeholder: "Username",
    label: "Username",
    type: "text",
    element: username,
    required: {
      value: true,
      message: "Поле не должно быть пустым",
    },
    minLength: {
      value: 3,
      message: "username должен быть от 3 до 20 символов",
    },
    maxLength: {
      value: 20,
      message: "username должен быть от 3 до 20 символов",
    },
  };

  const emailInput = {
    id: "email",
    placeholder: "Email address",
    label: "Email address",
    type: "email",
    element: email,
    required: {
      value: true,
      message: "Поле не должно быть пустым",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Email должен быть корректным почтовым адресом",
    },
  };

  const passwordInput = {
    id: "password",
    label: "Password",
    placeholder: "Password",
    type: "password",
    element: password,
    required: {
      value: true,
      message: "Поле не должно быть пустым",
    },
    minLength: {
      value: 6,
      message: "password должен быть от 6 до 40 символов",
    },
    maxLength: {
      value: 40,
      message: "password должен быть от 6 до 40 символов",
    },
  };

  const repeatPasswordInput = {
    id: "repeat-password",
    type: "password",
    placeholder: "Repeat password",
    label: "Repeat password",
    element: repeatPassword,
    required: {
      value: true,
      message: "Поле не должно быть пустым",
    },
    validate: () => {
      return password.value === repeatPassword.value
        ? true
        : "Пароли должны совпадать";
    },
  };

  const personalInformationCheckbox = {
    id: "personal",
    type: "checkbox",
    label: "I agree to the processing of my personal information",
    element: personalInformation,
    required: {
      value: true,
      message: "Поле не должно быть пустым",
    },
  };

  const signUpInputs: Input[] = [
    usernameInput,
    emailInput,
    passwordInput,
    repeatPasswordInput,
    personalInformationCheckbox,
  ];

  if (user || savedUser) {
    return <Redirect to={"/articles"} />;
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
        marginTop: 60,
      }}
    >
      <Form
        register={register}
        inputs={signUpInputs}
        title="Create new account"
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        submitButtonLabel="Create"
        errors={errors}
      />
    </div>
  );
}

export default SignUp;
