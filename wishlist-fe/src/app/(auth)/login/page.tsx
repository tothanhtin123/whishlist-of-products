import React from "react";
import LoginForm from "./components/forms/login-form";

type LoginPageProps = {
  searchParams: {
    email?: string;
  };
};

const LoginPage: React.FC<LoginPageProps> = (props) => {
  return <LoginForm defaultEmail={props.searchParams.email} />;
};

export default LoginPage;
