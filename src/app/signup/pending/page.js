"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useAPI } from "@/context/ApiProvider";
import { getSessionItem, SESSION_KEYS } from "@/utils/sessionStorage";
import SEO from "@/components/SEO/SEO";

const COOLDOWN_SECONDS = 60;
const MAX_RESEND_ATTEMPTS = 3;

const Pending = () => {
  const { translations } = useLanguage();
  const { post, isLoading, error: apiError } = useAPI();

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccessStatus] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const [resendAttempts, setResendAttempts] = useState(0);

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
    if (apiError) {
      const errorMessage =
        typeof apiError === "string"
          ? apiError
          : apiError.message || translations["signUp.welcome.resend.error"];
      setMsg(errorMessage);
      setSuccessStatus(false);
    }
  }, [apiError, translations]);

  const handleResendVerification = async () => {
    if (!email) {
      setMsg(translations["signUp.welcome.resend.noEmail"]);
      setSuccessStatus(false);
      return;
    }

    const response = await post("/register/email/resend", {
      payload: { email },
    });

    if (response && response.success) {
      setMsg(translations["signUp.welcome.resend.success"]);
      setSuccessStatus(true);

      const newAttemptCount = resendAttempts + 1;
      setResendAttempts(newAttemptCount);

      if (newAttemptCount < MAX_RESEND_ATTEMPTS) {
        setCooldownRemaining(COOLDOWN_SECONDS);
      }
    } else {
      const errorMessage =
        response?.message || translations["signUp.welcome.resend.error"];
      setMsg(errorMessage);
      setSuccessStatus(false);
    }
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
      <div className="mx-2 flex flex-col items-center justify-center py-8 sm:py-24">
        <div className="w-full max-w-[35rem] items-center justify-center rounded-lg bg-tertiary2-light px-5 py-8 sm:px-20 sm:py-10">
          <div className="mb-6 flex justify-center sm:mb-4">
            <img
              src="/icons/success-glasses.svg"
              alt="clinking glasses"
              className="h-[100px] w-[103px] sm:h-[150px] sm:w-[154px]"
            />
          </div>
          <h1
            id="email-verification-title"
            className="mb-6 text-center text-titleLarge sm:mb-4 sm:text-headlineMedium"
          >
            {translations["signUp.welcome.title"]}
          </h1>
          <div className="mb-6 flex flex-col items-center gap-6 text-center text-bodyMedium sm:mb-4 sm:text-bodyLarge">
            <p>
              {translations["signUp.welcome.paragraph1"]}
              <br />
              <span className="font-semibold">
                {translations["signUp.welcome.paragraph2"]}
              </span>
            </p>
            <p>{translations["signUp.welcome.paragraph3"]}</p>
          </div>

          <div className="flex flex-wrap items-baseline justify-center gap-2 text-bodyLarge sm:justify-start">
            <span>{translations["signUp.welcome.resend"]}</span>
            <button
              className={`inline-block font-medium underline ${
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
              <span className="text-bodySmall text-tertiary2-dark">
                ({cooldownRemaining}s)
              </span>
            )}
          </div>

          {msg && (
            <div className="mt-2">
              <p
                className={`text-center text-bodySmall ${
                  success ? "text-others-confirm" : "text-others-negative"
                }`}
                aria-live="polite"
                data-testid="resend-message"
              >
                {msg}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pending;
