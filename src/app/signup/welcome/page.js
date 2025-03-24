"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const { translations } = useLanguage();
  const router = useRouter();

  return (
    <section className="my-4 bg-primary-light sm:bg-dots-lg sm:bg-dots-size-lg bg-dots-sm bg-dots-size-sm">
      <div className="flex flex-col justify-center items-center sm:py-24 py-4 mx-2">
        <div className="bg-tertiary2-light items-center justify-center rounded-2xl shadow-lg px-5 py-8 sm:px-16 sm:py-10 max-w-[35rem] w-full">
          <div className="flex justify-center mb-4">
            <Image
              src="/icons/message-check.svg"
              alt=""
              width={48}
              height={48}
            />
          </div>
          <h1
            id="email-verification-title"
            className="text-titleLarge sm:text-headlineMedium text-center mb-6 sm:mb-4"
          >
            {translations["signUp.welcome.title"]}
          </h1>

          <p
            className="text-bodyLarge mb-6 sm:mb-4 text-left"
            dangerouslySetInnerHTML={{
              __html: translations["signUp.welcome.message"],
            }}
          />

          <Button
            text={translations["signUp.welcome.button"]}
            variant="redWide"
            onClick={() => router.push("/login")}
            testId="login-button"
            ariaLabel={translations["signUp.welcome.button"]}
          />

          <div className="text-left mt-6 sm:mt-8">
            <span className="text-bodyLarge">
              {translations["signUp.welcome.resend"]}{" "}
            </span>
            <button className="font-semibold underline hover:text-primary-hover_normal focus:outline-none inline-block">
              {translations["signUp.welcome.resend.button"]}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
