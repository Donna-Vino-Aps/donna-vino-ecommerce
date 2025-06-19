"use client";

import React, { useEffect, Suspense } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import SEO from "@/components/SEO/SEO";
import Spinner from "@/components/UI/Spinner";
import StatusPage from "@/components/StatusPage/StatusPage";

const VerificationCompletedContent = () => {
  const { translations } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      const redirectTimer = setTimeout(() => {
        signIn("apiToken", {
          accessToken,
          refreshToken,
          callbackUrl: "/",
        });
      }, 3000);

      return () => clearTimeout(redirectTimer);
    }
  }, [searchParams, router]);

  return (
    <div>
      <SEO
        title={translations["signUp.verification-completed.seo.title"]}
        description={
          translations["signUp.verification-completed.seo.description"]
        }
      />
      <StatusPage
        title={translations["signUp.verification-completed.title"]}
        message={translations["signUp.verification-completed.message"]}
        titleId="verification-completed-title"
        dataTestId="verification-completed-message"
        image={{
          src: "/icons/message-check.svg",
          alt: "verification completed",
          width: 48,
          height: 48,
        }}
      />
    </div>
  );
};

const VerificationCompleted = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <Spinner size="large" />
        </div>
      }
    >
      <VerificationCompletedContent />
    </Suspense>
  );
};

export default VerificationCompleted;
