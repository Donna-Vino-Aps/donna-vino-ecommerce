import React from "react";
// import { useLanguage } from "@/context/LanguageContext";
import LoginForm from "./LoginForm";

const LoginScreen = () => {
  // const { translations } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen bg-primary-light sm:bg-dots-lg sm:bg-dots-size-lg bg-dots-sm bg-dots-size-sm">
      <div className="flex justify-center items-center overflow-hidden md:mt-[7.5rem] md:mb-[7.5rem] px-4 mx-8 md:mx-8 h-[38rem] md:h-full md:min-h-screen items-stretch">
        <section className="flex flex-col pt-4 items-center rounded-3xl md:rounded-l-xl md:rounded-r-none justify-center bg-white flex-1 max-w-[35.781rem] max-h-[34.375rem] md:h-auto p-4">
          <LoginForm />
        </section>
        <figure className="hidden md:flex md:rounded-r-xl md:rounded-l-none justify-center flex-1 w-full max-w-[35.781rem] max-h-[34.375rem] md:w-[50%] md:h-auto overflow-hidden">
          <img
            src="/images/dv-join.jpg"
            className="w-full h-full object-cover object-right"
          />
        </figure>
      </div>
    </div>
  );
};

export default LoginScreen;
