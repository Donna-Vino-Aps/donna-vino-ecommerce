import React from "react";
// import { useLanguage } from "@/context/LanguageContext";
import LoginForm from "./LoginForm";

const LoginScreen = () => {
  // const { translations } = useLanguage();

  return (
    <div className="flex justify-center items-center overflow-hidden mt-16 md:mt-[7.5rem] px-4 mx-14 md:mx-8 h-[36.5rem] md:h-full md:min-h-screen items-stretch">
      <section className="flex flex-col items-center rounded-3xl md:rounded-none justify-center bg-white flex-1 md:w-full md:h-full max-w-[36.563rem] max-h-[34.375rem] md:w-[50%] md:h-auto p-6">
        <img
          src="/images/donna-vino-logo-transparent.png"
          alt="Donna Vino logo"
          className="w-[6.25rem] mt-16"
        />
        <LoginForm />
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
