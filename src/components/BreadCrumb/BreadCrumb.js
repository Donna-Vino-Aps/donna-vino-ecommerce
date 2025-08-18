"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const BREADCRUMB_MAP = {
  wines: "Wines",
  offers: "Offers",
  "grapes-zones": "Grapes & Zones",
};

const Breadcrumb = () => {
  const pathname = usePathname();
  if (pathname === "/") {
    return null;
  }
  const pathParts = pathname.split("/").filter((part) => part !== "");

  const breadcrumbs = [];

  breadcrumbs.push({ label: "Home", href: "/" });

  pathParts.forEach((part, index) => {
    const href = `/${pathParts.slice(0, index + 1).join("/")}`;
    const mappedLabel = BREADCRUMB_MAP[part];
    const label = mappedLabel || part.replace(/-/g, " ");
    breadcrumbs.push({ label, href, icon: "/icons/arrow-right.svg" });
  });

  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <div className="dark:bg-dark bg-white py-5">
      <div className="container mx-auto">
        <div className="mb-8 w-full">
          {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
          <div className="border-light dark:bg-dark-2 dark:border-dark-3 shadow-1 rounded-lg border bg-white px-4 py-4 dark:shadow-card sm:px-6 md:px-8 md:py-5">
            <ul className="flex items-center">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                  <Link
                    href={breadcrumb.href}
                    className="flex items-center text-base font-medium text-primary-normal hover:text-primary-normal dark:text-white dark:hover:text-primary-normal"
                  >
                    {breadcrumb.icon && (
                      <span className="px-3">
                        <Image
                          src={breadcrumb.icon}
                          alt=""
                          width={18}
                          height={18}
                        />
                      </span>
                    )}
                    {breadcrumb.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
