import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import LoginForm from "./LoginForm";
import Link from "next/link";
import Button from "../Button/Button";

const LoginScreen = () => {
  const { translations } = useLanguage();

  return (
    <div className="flex justify-center items-center overflow-hidden mt-16 md:mt-[7.5rem] px-4 mx-8 md:mx-8 h-[36.5rem] md:h-full md:min-h-screen items-stretch">
      <section className="flex flex-col items-center rounded-3xl md:rounded-none justify-center bg-white flex-1 md:w-full max-w-[36.563rem] max-h-[34.375rem] md:w-[50%] md:h-auto p-4">
        <h2 className="relative right-[5.8rem] mb-4 mt-8 text-headlineMedium text-tertiary1-normal">
          {translations["logIn.button"]}
        </h2>
        <LoginForm />
        <div className="flex flex-col items-start space-y-4 relative bottom-12">
          <Link
            href="/forgotpassword"
            data-testid="forget-password-link"
            aria-label="Forgot Password"
            className="text-left"
          >
            {translations["logIn.forgot"]}
          </Link>
          <h3 className="text-headlineMedium text-tertiary1-normal">
            {translations["logIn.no-account"]}
          </h3>
          <Button
            text={translations["logIn.signup-button"]}
            variant="greenSubmit"
            data-testid="login-button"
            aria-label="Submit Log In"
            type="submit"
          />
        </div>
      </section>
      <figure className="hidden md:flex justify-center flex-1 w-full max-w-[36.563rem] max-h-[34.375rem] md:w-[50%] md:h-auto overflow-hidden">
        <img
          src="/images/dv-join.jpg"
          className="w-full h-full object-cover object-right"
        />
      </figure>
    </div>
  );
};

export default LoginScreen;
