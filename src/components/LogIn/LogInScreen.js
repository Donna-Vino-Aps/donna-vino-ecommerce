import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import LoginForm from "@/components/LogIn/LogInForm.js";

const LoginScreen = () => {
  const { translations } = useLanguage();

  return (
    <section className="mx-auto flex flex-col items-center justify-center">
      <img
        src="/images/donna-vino-logo-transparent.png"
        alt="Donna Vino logo"
        className="w-[6.65rem] h-[4.71rem]"
      />
      <LoginForm />
    </section>
  );
};

export default LoginScreen;
