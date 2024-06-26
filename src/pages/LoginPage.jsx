import React from "react";
import LoginForm from "@/components/authentication/LoginForm";

function LoginPage() {
  return (
    <div
      id="login-page"
      className="flex items-center justify-center w-full h-full"
    >
      <LoginForm />
    </div>
  );
}

export default LoginPage;
