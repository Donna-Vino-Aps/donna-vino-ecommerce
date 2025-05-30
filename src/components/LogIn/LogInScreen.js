import React from "react";
// import { useLanguage } from "@/context/LanguageContext";
import LoginForm from "./LoginForm";
import Image from "next/image";

const LoginScreen = () => {
  // const { translations } = useLanguage();

  return (
    <div className="flex max-h-[49.375rem] flex-col justify-center bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <div className="mx-2 my-8 md:my-24 flex items-start md:items-center justify-center overflow-hidden px-4 md:mx-8 md:max-h-[49.375rem]">
        <section className="flex h-full max-h-[33.75rem] max-w-[21.5rem] flex-1 flex-col items-center justify-center rounded-b-lg bg-white p-4 pt-4 shadow-lg md:h-auto md:max-h-[37.25rem] md:max-w-[35.781rem] md:rounded-lg md:rounded-l-xl md:rounded-r-none md:shadow-none">
          <LoginForm />
        </section>
        <figure className="relative hidden max-h-[37.25rem] w-full max-w-[35.781rem] flex-1 justify-center overflow-hidden md:flex md:h-[37.25rem] md:w-[50%] md:rounded-l-none md:rounded-r-xl">
          <Image
            src="/images/dv-join.jpg"
            alt="Wine glasses toasting"
            sizes="(max-width: 767px) 0vw, (min-width: 768px) 50vw"
            fill
            className="object-cover object-right"
            loading="eager"
            priority={false}
          />
        </figure>
      </div>
    </div>
  );
};

export default LoginScreen;
