import React from "react";
// import { useLanguage } from "@/context/LanguageContext";
import LoginForm from "@/components/LogIn/LogInForm.js";

const LoginScreen = () => {
  // const { translations } = useLanguage();

  return (
    <div className="flex justify-center items-center mt-[7.5rem]">
      <section className="flex flex-col items-center justify-center bg-white w-[36.563rem] h-[34.375rem]">
        <img
          src="/images/donna-vino-logo-transparent.png"
          alt="Donna Vino logo"
          className="w-[6.25rem] mt-8"
        />
        <LoginForm />
      </section>
      <figure className="w-[36.563rem] flex justify-center">
        <img src="/images/dv-join.jpg" className="w-full" />
      </figure>
    </div>
  );
};

export default LoginScreen;
