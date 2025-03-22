"use client";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const Welcome = () => {
  const router = useRouter();
  return (
    <section className="my-4 bg-primary-light sm:bg-dots-lg sm:bg-dots-size-lg bg-dots-sm bg-dots-size-sm">
      <div className="flex flex-col justify-center items-center sm:py-24 py-4 mx-2">
        <div className="bg-tertiary2-light items-center justify-center rounded-2xl shadow-lg px-5 py-8 sm:px-20 sm:py-10 max-w-[35rem] w-full">
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
            👏 Done! Welcome on board! 👏
          </h1>

          <p className="text-bodyLarge mb-6 sm:mb-4 text-left">
            Your email has been successfully registered in our system.
            <strong> Please check your inbox</strong> for the confirmation email
            regarding your registration. Once confirmed, you will be able to
            access your personalized profile dashboard, where you can upload
            your profile picture, update your information, and complete all the
            required details to streamline your future orders and enhance your
            shopping experience.
          </p>
          <Button
            text="Back to the log in page"
            variant="redWide"
            onClick={() => router.push("/login")}
            testId="login-button"
            ariaLabel="Back to the log in page"
          />
          <div className="text-left mt-6 sm:mt-8">
            <span className="text-bodyLarge">Didn't receive the email? </span>
            <button className="font-semibold underline hover:text-primary-hover_normal focus:outline-none inline-block">
              Resend
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
