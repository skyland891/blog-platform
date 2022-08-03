import React, { useState, useContext, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useInput } from "../hooks/useInput";
import Form from "../components/form";
import Context from "../context";
import { IAuthError, IUserResponse } from "../types/types";
import { useRequest } from "../hooks/useRequest";

function ProfilePage() {
  const { user: savedUser, setUser } = useContext(Context);
  const username = useInput(savedUser !== null ? savedUser.username : "");
  const email = useInput(savedUser !== null ? savedUser.email : "");
  const newPassword = useInput("");
  const avatar = useInput(savedUser?.image || "");
  const [isClicked, setIsClicked] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = () => {
    setIsClicked(true);
  };

  const updateProfile = (
    usernameValue: string,
    emailValue: string,
    passwordValue: string,
    avatarValue: string
  ): Promise<AxiosResponse<IUserResponse, any>> | undefined => {
    if (usernameValue !== "" && emailValue !== "") {
      const requestBody = {
        user: {
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          image: avatarValue,
        },
      };
      return axios.put<IUserResponse>(
        "https://blog.kata.academy/api/user",
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${savedUser?.token}`,
          },
        }
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
        return updateProfile(
          username.value,
          email.value,
          newPassword.value,
          avatar.value
        );
      }
    },
    {
      user: null,
    },
    isClicked
  );
  const { user } = response;
  console.log(response);

  if (user !== null && savedUser?.token !== user?.token) {
    setUser(user);
  }

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

  const usernameInput = {
    label: "Username",
    placeholder: "Username",
    type: "input",
    id: "username",
    element: username,
    required: {
      value: true,
      message: "Поле не должно быть пустым",
    },
  };

  const emailInput = {
    label: "Email address",
    placeholder: "Email address",
    type: "email",
    id: "email",
    element: email,
    required: {
      value: true,
      message: "Поле не должно быть пустым",
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "email должен быть корректным почтовым адресом",
    },
  };

  const newPasswordInput = {
    label: "New password",
    placeholder: "New password",
    type: "input",
    id: "new_password",
    element: newPassword,
    required: false,
    validate: (value: string) => {
      console.log(value);
      if (value === "") {
        return true;
      }
      if (value.length < 6 || value.length > 40) {
        return "new password должен быть от 6 до 40 символом";
      }
      return true;
    },
  };

  const avatarInput = {
    label: "Avatar image (url)",
    placeholder: "Avatar image",
    type: "input",
    id: "avatar",
    element: avatar,
    required: false,
    validate: (value: string) => {
      if (value === "") {
        return true;
      }
      if (value.match(/([a-zA-Z0-9\-]{1,63}\.)*[a-zA-Z0-9\-]{1,63}/) === null) {
        return "new password должен быть от 6 до 40 символом";
      }
      return true;
    },
  };

  const editProfileInputs = [
    usernameInput,
    emailInput,
    newPasswordInput,
    avatarInput,
  ];

  if (!(user || savedUser)) {
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
        register={register}
        title="Edit Profile"
        submitButtonLabel="Save"
        inputs={editProfileInputs}
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </div>
  );
}

export default ProfilePage;
