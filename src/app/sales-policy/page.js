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
      <main className="w-full flex flex-col gap-3 font-barlow text-tertiary1-darker bg-white">
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
        <div className="py-6 flex flex-col md:flex-row gap-8 md:gap-4 lg:gap-8 md:gap-16 justify-center items-center w-full min-h-[43.75rem] bg-primary-light">
          <div>
            <h1 className="text-displayMedium mt-6 md:mt-0">
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
        <div className="mx-4 my-2 mb-4">
          <div className="flex justify-center flex-col w-full rounded-2xl border-[1px] border-black px-8 py-4 text-bodyLarge">
            <section className="">
              <h2 className="text-displaySmall mt-3 mb-6">Payment Methods</h2>
              <p>We accept the following payment methods:</p>
              <ul className="list-disc font-semibold ml-6 mt-4 mb-4">
                <li>MobilePay</li>
                <li>VISA</li>
                <li>MasterCard</li>
                <li>PayPal</li>
              </ul>
              <p>
                <strong>Payment Timing:</strong> All payments are processed
                securely. The payment will be debited from your account
                immediately upon order confirmation.
              </p>
            </section>
            <section>
              <h2 className="text-displaySmall my-6">Delivery Information</h2>
              <p>We strive to deliver your order as quickly as possible.</p>
              <br />
              <ul className="list-disc font-normal ml-6 mt-4 mb-4">
                <li>
                  <strong className="font-semibold">
                    Standard Delivery Time (Hand Delivery):
                  </strong>{" "}
                  2–5 business days within the Copenhagen area
                </li>
                <br />
                <li>
                  <strong className="font-semibold">
                    International Shipping:
                  </strong>{" "}
                  Currently, we do not offer international shipping.
                </li>
              </ul>
              <br />
              <p>
                <strong>Shipping Providers:</strong> Hand delivery to your
                address or collection from our sales outlet, located at
                Christianshavns Voldgade 54, 1424 København. <br /> Shipping
                confirmation and tracking information will be provided via email
                once your order has been dispatched.
              </p>
            </section>

            <section>
              <h2 className="text-displaySmall my-6">
                Returns and Cancellation Policy
              </h2>
              <p>
                You have the right to cancel your order within 14 days of
                receiving the item.
              </p>
              <p>
                <strong>To be eligible for a return:</strong>
              </p>
              <ul className="list-disc font-semibold ml-6 mt-4 mb-4">
                <li>The item must be unused and in its original packaging.</li>
                <li>Proof of purchase is required.</li>
              </ul>
              <p>
                <strong>To cancel your order or initiate a return:</strong>{" "}
                Please contact us at{" "}
                <a href="mailto:info@donnavino.com">info@donnavino.com</a> with
                your order number and reason for return.
              </p>
              <p>
                <strong>Exclusions:</strong> Some perishable goods and
                customized items may be excluded from the right of cancellation.
                This will be stated clearly on the relevant product pages.
              </p>
              <br />
              <p>
                <strong>
                  Refunds will be processed within 5 business days after we
                  receive and inspect the returned item.
                </strong>
              </p>
            </section>

            <section>
              <h2 className="text-displaySmall my-6">
                Buyer’s Rights and Complaint Period
              </h2>
              <p>
                In accordance with Danish consumer law, customers have a right
                to complain about a product within 24 months of purchase.
              </p>
              <br />
              <p>
                <strong>To file a complaint:</strong>
              </p>
              <ul className="list-disc font-normal ml-6 mt-4 mb-4">
                <li>
                  Contact us at{" "}
                  <a href="mailto:info@donnavino.com">info@donnavino.com</a>{" "}
                  with details and pictures of the issue.
                </li>
                <li>Provide your order number and date of purchase.</li>
              </ul>
              <p>
                If a solution cannot be reached, you may submit your complaint
                to the Consumer Complaints Board via{" "}
                <a href="https://forbrug.dk" target="_blank">
                  forbrug.dk
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-displaySmall my-6">Complaint Procedure</h2>
              <p>
                For any complaints, please contact our customer support team:
              </p>
              <ul className="list-disc font-normal ml-6 mt-4 mb-4">
                <li>
                  Email:{" "}
                  <a href="mailto:info@donnavino.com">info@donnavino.com</a>
                </li>
                <li>Phone: +45 31 62 06 93</li>
              </ul>
              <p>We aim to respond to all inquiries within 2 business days.</p>
            </section>
            <section className="mt-12 mb-4">
              <p>
                <em>
                  This information is provided in compliance with the Consumer
                  Ombudsman’s requirements for use of MobilePay and ensures
                  transparency for our valued customers.
                </em>
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default SalesPolicy;
