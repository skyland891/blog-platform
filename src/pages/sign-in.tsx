import React from "react";
import { Redirect } from "react-router-dom";
import Form from "../components/form";

interface SignInProps {
  isLogged: boolean;
}

const emailInput = {
  label: "Email address",
  placeholder: "Email address",
  type: "email",
  id: "email",
};

const passwordInput = {
  label: "Password",
  placeholder: "Password",
  type: "password",
  id: "password",
};

const loginInputs = [emailInput, passwordInput];

const loginSubmit = {
  label: "Login",
};

function SignIn({ isLogged }: SignInProps) {
  if (isLogged) {
    return <Redirect to={"/"} />;
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
      <Form title="Sign In" inputs={loginInputs} submitButton={loginSubmit} />
    </div>
  );
}

export default SignIn;
