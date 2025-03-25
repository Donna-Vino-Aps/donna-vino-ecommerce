"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/api/useFetch";
import { getSessionItem, SESSION_KEYS } from "@/utils/sessionStorage";

const COOLDOWN_SECONDS = 5;
const MAX_RESEND_ATTEMPTS = 2;

const Welcome = () => {
  const { translations } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [resendMsg, setResendMsg] = useState("");
  const [resendSuccess, setResendSuccess] = useState(null);
  const [showResendMessage, setShowResendMessage] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(0);

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
      setShowResendMessage(true);
      setResendSuccess(false);
      setResendMsg(translations["signUp.welcome.resend.error"]);
    }
  }, [error, translations]);

  const handleResendVerification = () => {
    if (!email) {
      setShowResendMessage(true);
      setResendSuccess(false);
      setResendMsg(translations["signUp.welcome.resend.noEmail"]);
      return;
    }

    if (resendAttempts >= MAX_RESEND_ATTEMPTS) {
      setShowResendMessage(true);
      setResendSuccess(false);
      setResendMsg(translations["signUp.welcome.resend.maxAttempts"]);
      return;
    }

    setShowResendMessage(false);
    setResendMsg("");
    performFetch({
      method: "GET",
      params: { email },
    });
  };

  const onReceived = (response) => {
    const responseData = response.data || response;
    const { success } = responseData;

    setShowResendMessage(true);

    if (success) {
      setResendSuccess(true);
      setResendMsg(translations["signUp.welcome.resend.success"]);

      const newAttemptCount = resendAttempts + 1;
      setResendAttempts(newAttemptCount);

      if (newAttemptCount < MAX_RESEND_ATTEMPTS) {
        setCooldownRemaining(COOLDOWN_SECONDS);
      } else if (newAttemptCount === MAX_RESEND_ATTEMPTS) {
        setTimeout(() => {
          setShowResendMessage(true);
          setResendSuccess(false);
          setResendMsg(translations["signUp.welcome.resend.maxAttempts"]);
        }, 3000);
      }
    } else {
      setResendSuccess(false);
      setResendMsg(translations["signUp.welcome.resend.error"]);
    }
  };

  const { performFetch, isLoading, error } = useFetch(
    "/auth/resend-verification-email",
    "GET",
    {},
    {},
    onReceived,
  );

  const isResendDisabled =
    isLoading || cooldownRemaining > 0 || resendAttempts >= MAX_RESEND_ATTEMPTS;

  const getButtonText = () => {
    if (isLoading) return translations["signUp.welcome.resend.sending"];
    if (resendAttempts >= MAX_RESEND_ATTEMPTS)
      return translations["signUp.welcome.resend.maxReached"];
    return translations["signUp.welcome.resend.button"];
  };

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
            <button
              className={`font-semibold underline focus:outline-none inline-block ${
                isResendDisabled
                  ? "text-tertiary2-dark cursor-not-allowed"
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
                  className={`text-bodySmall text-center ${
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
