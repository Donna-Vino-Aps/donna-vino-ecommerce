"use client";
import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const Completed = () => {
  const { translations } = useLanguage();
  const router = useRouter();

  return (
    <section className="my-4 bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg md:py-8">
      <div className="mx-2 flex flex-col items-center justify-center py-8 sm:py-24">
        <div className="relative mx-3 w-full max-w-[560px] rounded-2xl bg-white px-6 py-10 text-center shadow-lg sm:px-20">
          <section className="mb-6  w-full">
            <img
              src="/icons/cheerswineglass.svg"
              alt="message check icon"
              className="m-auto h-[99px] w-[102px] object-cover sm:h-[150px] sm:w-[154px]"
            />
          </section>
          <h1 className="mb-6 text-titleLarge sm:text-headlineMedium">
            {translations["changePassword.completed.heading"]}
          </h1>
          <p className="mb-6 max-w-[400px] text-bodyMedium sm:text-bodyLarge">
            {translations["changePassword.completed.paragraph1"]}
            <br />
            {translations["changePassword.completed.paragraph2"]}
          </p>
          <div className="mb-4 mt-4 w-full">
            <Button
              onClick={() => {
                router.push("/login");
              }}
              extraStyle="h-[50px] font-medium"
              text={translations["changePassword.completed.button"]}
              width="full"
              data-testid="change-password-completed-button"
              aria-label={translations["changePassword.completed.button"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Completed;
