"use client";
import React from "react";
import Button from "@/components/Button/Button";
import { useLanguage } from "@/context/LanguageContext";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SalesPolicy = () => {
  const { translations } = useLanguage();
  const router = useRouter();

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
        <meta
          property="og:url"
          content="https://shop.donnavino.dk/sales-policy"
        />
      </Head>
      <main className="flex w-full flex-col gap-3 bg-white font-barlow text-tertiary1-darker">
        <section className="px-2 pt-4 sm:mx-8">
          <Button
            text={translations["button.go-back"]}
            icon="/icons/back-arrow.svg"
            color="transparent"
            width="medium"
            variant="outline"
            border="primary"
            ariaLabel="Go back"
            testId="go-back-button"
            onClick={() => router.back()}
          />
        </section>
        <div className="flex min-h-[43.75rem] w-full flex-col items-center justify-center gap-8 bg-primary-light py-6 md:flex-row md:gap-4 lg:gap-8">
          <div>
            <h1 className="mt-6 text-displayMedium md:mt-0">
              {translations["sales.title"]}
            </h1>
            <div className="mt-3 text-bodyLarge text-tertiary1-dark">
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
          <div className="relative flex h-[27.5rem] w-[27.5rem] items-center justify-center">
            <Image
              src="/images/sales-policy-image.png"
              alt="Sales policy"
              width={186.67} // equivalent to 11.667rem
              height={224} // equivalent to 14rem
              className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-xl md:h-[19.875rem] md:w-[16.563rem] md:rounded-2xl"
              priority
            />
            <Image
              src="/icons/ellipse-small.svg"
              alt="Decorative ellipse small"
              width={250} // 15.625rem
              height={250}
              className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 md:h-[21.625rem] md:w-[21.625rem]"
              priority
            />
            <Image
              src="/icons/ellipse-big.svg"
              alt="Decorative ellipse big"
              width={312} // 19.5rem
              height={312}
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 md:h-[27.5rem] md:w-[27.5rem]"
              priority
            />
          </div>
        </div>
        <div className="mx-4 my-2 mb-4">
          <div className="flex w-full flex-col justify-center rounded-2xl border-[1px] border-black px-4 py-4 text-bodyLarge md:px-8">
            <section className="" id="payment">
              <h2 className="mb-6 mt-3 text-displaySmall">
                {translations["sales.payment.h2"]}
              </h2>
              <p>{translations["sales.payment.p1"]}</p>
              <ul className="mb-4 ml-6 mt-4 list-disc font-semibold">
                <li>MobilePay</li>
                <li>VISA</li>
                <li>MasterCard</li>
                <li>PayPal</li>
              </ul>
              <p>
                <strong>{translations["sales.payment.p2"]}</strong>
                {translations["sales.payment.p3"]}
              </p>
            </section>
            <section id="shipping">
              <h2 className="my-6 text-displaySmall">
                {translations["sales.delivery.h2"]}
              </h2>
              <p>{translations["sales.delivery.p1"]}</p>
              <br />
              <ul className="mb-4 ml-6 mt-4 list-disc font-normal">
                <li>
                  <strong className="font-semibold">
                    {translations["sales.delivery.li1-1"]}
                  </strong>
                  : {translations["sales.delivery.li1-2"]}
                </li>
                <br />
                <li>
                  <strong className="font-semibold">
                    {translations["sales.delivery.li2-1"]}
                  </strong>
                  : {translations["sales.delivery.li2-2"]}
                </li>
              </ul>
              <br />
              <p>
                <strong>{translations["sales.delivery.p2"]}</strong>{" "}
                {translations["sales.delivery.p3"]}
                <br /> {translations["sales.delivery.p4"]}
              </p>
            </section>

            <section id="returns">
              <h2 className="my-6 text-displaySmall">
                {translations["sales.returns.h2"]}
              </h2>
              <p>{translations["sales.returns.p1"]}</p>
              <p>
                <strong>{translations["sales.returns.p2"]}</strong>
              </p>
              <ul className="mb-4 ml-6 mt-4 list-disc font-semibold">
                <li>{translations["sales.returns.li1"]}</li>
                <li>{translations["sales.returns.li2"]}</li>
              </ul>
              <p>
                <strong>{translations["sales.returns.p3"]}</strong>{" "}
                {translations["sales.returns.p4"]}{" "}
                <a href="mailto:info@donnavino.dk">info@donnavino.dk</a>{" "}
                {translations["sales.returns.p5"]}
              </p>
              <p>
                <strong>{translations["sales.returns.p6"]}:</strong>{" "}
                {translations["sales.returns.p7"]}
              </p>
              <br />
              <p>
                <strong>{translations["sales.returns.p8"]}</strong>
              </p>
            </section>

            <section>
              <h2 className="my-6 text-displaySmall">
                {translations["sales.rights.h2"]}
              </h2>
              <p>{translations["sales.rights.p1"]}</p>
              <br />
              <p>
                <strong>{translations["sales.rights.p2"]}</strong>
              </p>
              <ul className="mb-4 ml-6 mt-4 list-disc font-normal">
                <li>
                  {translations["sales.rights.li1-1"]}{" "}
                  <a href="mailto:info@donnavino.dk">info@donnavino.dk</a>{" "}
                  {translations["sales.rights.li1-2"]}
                </li>
                <li>{translations["sales.rights.li2"]}</li>
              </ul>
              <p>
                {translations["sales.rights.p3"]}{" "}
                <a
                  href="https://forbrug.dk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  forbrug.dk
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="my-6 text-displaySmall">
                {translations["sales.complaints.h2"]}
              </h2>
              <p>{translations["sales.complaints.p1"]}</p>
              <ul className="mb-4 ml-6 mt-4 list-disc font-normal">
                <li>
                  {translations["sales.complaints.li1"]}:{" "}
                  <a href="mailto:info@donnavino.dk">info@donnavino.dk</a>
                </li>
                <li>{translations["sales.complaints.li2"]}: +45 31 62 06 93</li>
              </ul>
              <p>{translations["sales.complaints.p2"]}</p>
            </section>
            <section className="mb-4 mt-12">
              <p>
                <em>{translations["sales.footer"]}</em>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default SalesPolicy;
