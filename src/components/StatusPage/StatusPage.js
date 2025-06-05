"use client";

import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import Button from "@/components/Button/Button";

const StatusPage = ({
  title,
  message,
  button,
  image,
  titleId = "status-page-title",
  dataTestId = "status-page-message",
}) => {
  return (
    <section className="my-4 bg-primary-light bg-dots-sm bg-dots-size-sm sm:bg-dots-lg sm:bg-dots-size-lg">
      <div className="mx-2 flex flex-col items-center justify-center py-8 sm:py-24">
        <div className="flex w-full max-w-[35rem] flex-col items-center justify-center gap-4 rounded-lg bg-tertiary2-light px-5 py-8 shadow-lg sm:gap-6 sm:px-20 sm:py-10">
          {image && (
            <div className="mb-2 flex justify-center sm:mb-0">
              <Image
                src={image.src}
                alt={image.alt || ""}
                width={image.width || 50}
                height={image.height || 50}
              />
            </div>
          )}

          <h1
            id={titleId}
            data-testid={titleId}
            className="text-center text-titleLarge sm:text-headlineMedium"
          >
            {title}
          </h1>

          <p
            className="text-center text-bodyMedium sm:text-bodyLarge"
            data-testid={dataTestId}
          >
            {message}
          </p>

          {button && (
            <div className="mt-4 w-full">
              <Button
                text={button.text}
                linkUrl={button.linkUrl}
                color="primary"
                width="full"
                linkWidth="w-full"
                testId={button.testId || "status-page-button"}
                ariaLabel={button.ariaLabel || button.text}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

StatusPage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  button: PropTypes.shape({
    text: PropTypes.string.isRequired,
    linkUrl: PropTypes.string.isRequired,
    testId: PropTypes.string,
    ariaLabel: PropTypes.string,
  }),
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  titleId: PropTypes.string,
  dataTestId: PropTypes.string,
};

export default StatusPage;
