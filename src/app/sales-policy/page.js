"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import Head from "next/head";

const SalesPolicy = () => {
  const { translations } = useLanguage();

  return (
    <>
      <Head>
        <title>{translations["sales.title"]} - Donna Vino</title>
        <meta
          name="description"
          content="Read Donna Vino's sales policy regarding payment, shipments, complaints and more."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Sales Policy | Donna Vino" />
        <meta
          property="og:description"
          content="Learn about Donna Vino's sales policies."
        />
        <meta property="og:url" content="https://donnavino.dk/privacy-policy" />
      </Head>
      <main className="w-full flex flex-col gap-8 font-barlow text-tertiary1-darker">
        <section className="px-2 pt-4 sm:mx-8">
          <Button
            text={translations["button.go-back"]}
            icon="/icons/back-arrow.svg"
            variant="redLine"
            ariaLabel="Go back"
            testId="go-back-button"
            onClick={() => {
              history.go(-1);
            }}
          />
        </section>
        <div className="py-6 flex flex-col md:flex-row gap-8 md:gap-16 justify-center items-center w-full min-h-[43.75rem] bg-primary-light">
          <div>
            <h1 className="text-displayMedium">
              {translations["sales.title"]}
            </h1>
            <div className="text-tertiary1-dark text-bodyLarge mt-2">
              <p>{translations["sales.info.p1"]} </p>
              <br></br>
              <p>{translations["sales.info.p2"]}: 45017567</p>
              <p>{translations["sales.info.p3"]}: Donna Vino ApS</p>
              <p>{translations["sales.info.p4"]}: info@donnavino.dk</p>
              <p>{translations["sales.info.p5"]}: +45 31 62 06 93</p>
              <p>
                {translations["sales.info.p6"]}: C/O Glenn Leervad Bjørnhart,
              </p>
              <p>Strandlodsvej 23C, 8. tv, 2300 København S</p>
            </div>
          </div>
          <div className="relative w-[27.5rem] h-[27.5rem] flex justify-center items-center">
            <img
              src="/images/sales-policy-image.png"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 rounded-2xl w-[16.563rem] h-[19.875rem]"
            />
            <img
              src="/icons/ellipse-small.svg"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[21.625rem] h-[21.625rem]"
            />
            <img
              src="/icons/ellipse-big.svg"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[27.5rem] h-[27.5rem]"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default SalesPolicy;
