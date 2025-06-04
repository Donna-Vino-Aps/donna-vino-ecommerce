"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import useFetch from "@/hooks/api/useFetch";
import { getSessionItem, SESSION_KEYS } from "@/utils/sessionStorage";
import { logError, logInfo } from "@/utils/logging";

const COOLDOWN_SECONDS = 60;
const MAX_RESEND_ATTEMPTS = 5;

const Pending = () => {
  const { translations } = useLanguage();

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

          <div className="flex justify-center gap-2 text-bodyLarge sm:justify-start">
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
          </div>

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
    </section>
  );
};

export default Pending;
