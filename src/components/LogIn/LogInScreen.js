import React from "react";
// import { useLanguage } from "@/context/LanguageContext";
import LoginForm from "./LoginForm";

const LoginScreen = () => {
  // const { translations } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col justify-center bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <div className="mx-8 flex h-[38rem] items-center items-stretch justify-center overflow-hidden px-4 md:mx-8 md:mt-[7.5rem] md:h-full md:min-h-screen">
        <section className="flex max-h-[34.375rem] max-w-[35.781rem] flex-1 flex-col items-center justify-center rounded-3xl bg-white p-4 pt-4 md:h-auto md:rounded-l-xl md:rounded-r-none">
          <LoginForm />
        </section>
        <figure className="hidden max-h-[34.375rem] w-full max-w-[35.781rem] flex-1 justify-center overflow-hidden md:flex md:h-auto md:w-[50%] md:rounded-l-none md:rounded-r-xl">
          <img
            src="/images/dv-join.jpg"
            className="h-full w-full object-cover object-right"
            alt="A wine-themed scene featuring wine bottles, glasses, and a vineyard backdrop."
          />
        </figure>
      </div>
    </div>
  );
};

export default LoginScreen;
