import React from "react";
import Form from "../components/form";
import { Input } from "../components/form/form";

const usernameInput = {
  id: "username",
  placeholder: "Username",
  label: "Username",
  type: "text",
};

const emailInput = {
  id: "email",
  placeholder: "Email address",
  label: "Email address",
  type: "email",
};

const passwordInput = {
  id: "password",
  label: "Password",
  placeholder: "Password",
  type: "password",
};

const repeatPasswordInput = {
  id: "repeat-password",
  type: "password",
  placeholder: "Repeat password",
  label: "Repeat password",
};

const personalInformationCheckbox = {
  id: "personal",
  type: "checkbox",
  label: "I agree to the processing of my personal information",
};

const signUpInputs: Input[] = [
  usernameInput,
  emailInput,
  passwordInput,
  repeatPasswordInput,
  personalInformationCheckbox,
];

function SignUp() {
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
        title="Create new account"
        inputs={signUpInputs}
        submitButton={{ label: "Create" }}
      />
    </div>
  );
}

export default SignUp;
