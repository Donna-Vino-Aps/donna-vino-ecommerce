"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import MetaTags from "@/components/SEO/MetaTags";

const VerificationCompleted = () => {
  const { translations } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    const { accessToken, refreshToken } = router.query;

    if (accessToken && refreshToken) {
      signIn("apiToken", {
        accessToken,
        refreshToken,
        callbackUrl: "/",
      });
    }
  }, [router.query]);

  return (
    <section className="my-4 bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <MetaTags
        title="Verification completed Page"
        description="Page to inform user that the signup is completed"
      />
      <div className="mx-2 flex flex-col items-center justify-center py-4 sm:py-24">
        <div className="w-full max-w-[35rem] items-center justify-center rounded-2xl bg-tertiary2-light px-5 py-8 shadow-lg sm:px-16 sm:py-10">
          <div className="mb-4 flex justify-center">
            <Image
              src="/icons/message-check.svg"
              alt=""
              width={48}
              height={48}
            />
          </div>
          <h1
            id="email-verification-title"
            className="mb-6 text-center text-titleLarge sm:mb-4 sm:text-headlineMedium"
          >
            {translations["signUp.verification-completed.title"]}
          </h1>
          <p className="mb-6 text-left text-bodyLarge sm:mb-4">
            {translations["signUp.verification-completed.message"]}
          </p>
        </div>
      </div>
    </section>
  );
};

export default VerificationCompleted;
