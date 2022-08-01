import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import Form from "../components/form";
import { useInput } from "../hooks/useInput";
import { IUserResponse } from "../types/types";
import { useRequest } from "../hooks/useRequest";
import Context from "../context";

function SignIn() {
  const email = useInput("");
  const password = useInput("");
  const [isClicked, setIsClicked] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const loginUser = (emailValue: string, passwordValue: string) => {
    if (emailValue !== "" && passwordValue !== "") {
      const requestBody = {
        user: {
          email: emailValue,
          password: passwordValue,
        },
      };
      return axios.post<IUserResponse>(
        "https://blog.kata.academy/api/users/login",
        requestBody
      );
    }
  };

  const onSubmit = () => {
    setIsClicked(true);
  };

  const [response, loading, error] = useRequest(
    () => {
      if (isClicked) {
        setIsClicked(false);
        return loginUser(email.value, password.value);
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
      setError('email', {
        type: 'server',
        message: 'Неправильный логин или пароль'
      })
    }
  }, [error]);

  const { setUser } = useContext(Context);
  setUser(user);

  const emailInput = {
    label: "Email address",
    placeholder: "Email address",
    type: "email",
    id: "email",
    element: email,
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'email должен быть корректным почтовым адресом'
    }
  };

  const passwordInput = {
    label: "Password",
    placeholder: "Password",
    type: "password",
    id: "password",
    element: password,
  };

  const loginInputs = [emailInput, passwordInput];

  if (user) {
    return <Redirect to={"/articles"} />;
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
        title="Sign In"
        inputs={loginInputs}
        submitButtonLabel="Login"
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      />
    </div>
  );
}

export default SignIn;
