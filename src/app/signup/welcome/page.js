"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/api/useFetch";
import { getSessionItem, SESSION_KEYS } from "@/utils/sessionStorage";
import { logError, logInfo } from "@/utils/logging";
import SEO from "@/components/SEO/SEO";

const COOLDOWN_SECONDS = 60;
const MAX_RESEND_ATTEMPTS = 5;

const Welcome = () => {
  const { translations } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const [resendSuccess, setResendSuccess] = useState(null);
  const [showResendMessage, setShowResendMessage] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(0);

  const onReceived = (response) => {
    const { success, msg } = response;
    logInfo(`Resend verification response: success=${success}, message=${msg}`);

    if (success) {
      handleMessage({
        successStatus: true,
        msg: translations["signUp.welcome.resend.success"],
      });

      const newAttemptCount = resendAttempts + 1;
      setResendAttempts(newAttemptCount);

      if (newAttemptCount < MAX_RESEND_ATTEMPTS) {
        setCooldownRemaining(COOLDOWN_SECONDS);
      } else if (newAttemptCount === MAX_RESEND_ATTEMPTS) {
        setTimeout(() => {
          handleMessage({
            successStatus: false,
            msg: translations["signUp.welcome.resend.maxAttempts"],
          });
        }, 3000);
      }
    } else {
      logError(`Resend verification failed: ${msg}`);
      handleMessage({
        successStatus: false,
        msg: msg,
      });
    }
  };

  const { performFetch, isLoading, error } = useFetch(
    "/auth/resend-verification-email",
    "GET",
    {},
    {},
    onReceived,
  );

  const handleMessage = ({ successStatus, msg }) => {
    setResendSuccess(successStatus);
    setResendMsg(msg);
    setShowResendMessage(true);
  };

  // Effect to handle the cooldown timer
  useEffect(() => {
    let intervalId;

    if (cooldownRemaining > 0) {
      intervalId = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [cooldownRemaining]);

  useEffect(() => {
    const storedEmail = getSessionItem(SESSION_KEYS.PENDING_USER_EMAIL);
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    if (error) {
      const errorMessage =
        error.message || translations["signUp.welcome.resend.error"];

      handleMessage({
        successStatus: false,
        msg: errorMessage,
      });
    }
  }, [error, translations]);

  const handleResendVerification = () => {
    if (!email) {
      handleMessage({
        successStatus: false,
        msg: translations["signUp.welcome.resend.noEmail"],
      });
      return;
    }

    if (resendAttempts >= MAX_RESEND_ATTEMPTS) {
      handleMessage({
        successStatus: false,
        msg: translations["signUp.welcome.resend.maxAttempts"],
      });
      return;
    }

    setShowResendMessage(false);

    performFetch({
      method: "GET",
      params: { email },
    });
  };

  const isResendDisabled =
    isLoading || cooldownRemaining > 0 || resendAttempts >= MAX_RESEND_ATTEMPTS;

  const getButtonText = () => {
    if (isLoading) return translations["signUp.welcome.resend.sending"];
    if (resendAttempts >= MAX_RESEND_ATTEMPTS)
      return translations["signUp.welcome.resend.maxReached"];
    return translations["signUp.welcome.resend.button"];
  };

  return (
    <section className="my-4 bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <SEO
        title={translations["signUp.welcome.seo.title"]}
        description={translations["signUp.welcome.seo.description"]}
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
            {translations["signUp.welcome.title"]}
          </h1>

          <p
            className="mb-6 text-left text-bodyLarge sm:mb-4"
            dangerouslySetInnerHTML={{
              __html: translations["signUp.welcome.message"],
            }}
          />

          <Button
            text={translations["signUp.welcome.button"]}
            width="full"
            onClick={() => router.push("/login")}
            testId="login-button"
            ariaLabel={translations["signUp.welcome.button"]}
          />

          <div className="mt-6 text-left sm:mt-8">
            <span className="text-bodyLarge">
              {translations["signUp.welcome.resend"]}{" "}
            </span>
            <button
              className={`inline-block font-semibold underline focus:outline-none ${
                isResendDisabled
                  ? "cursor-not-allowed text-tertiary2-dark"
                  : "hover:text-primary-hover_normal"
              }`}
              onClick={handleResendVerification}
              disabled={isResendDisabled}
              aria-label={translations["signUp.welcome.resend.button"]}
              data-testid="resend-button"
            >
              {getButtonText()}
            </button>

            {cooldownRemaining > 0 && (
              <span className="ml-2 text-bodySmall text-tertiary2-dark">
                ({cooldownRemaining}s)
              </span>
            )}

            {showResendMessage && (
              <div className="mt-2">
                <p
                  className={`text-center text-bodySmall ${
                    resendSuccess
                      ? "text-secondary-normal"
                      : "text-primary-normal"
                  }`}
                  aria-live="polite"
                  data-testid="resend-message"
                >
                  {resendMsg}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
