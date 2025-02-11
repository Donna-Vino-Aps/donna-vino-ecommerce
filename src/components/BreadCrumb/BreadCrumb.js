"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
const Breadcrumb = () => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part !== "");

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Home", href: "/" },
    ...pathParts.map((part, index) => {
      const href = `/${pathParts.slice(0, index + 1).join("/")}`;
      const label = part.replace(/-/g, " ");
      return { label, href, icon: "/icons/arrow-right.svg" };
    }),
  ];

  return (
    <div className="py-10 bg-white dark:bg-dark">
      <div className="container">
        <div className="w-full mb-8">
          <div className="px-4 py-4 bg-white border rounded-lg border-light dark:bg-dark-2 dark:border-dark-3 shadow-1 dark:shadow-card sm:px-6 md:px-8 md:py-5">
            <ul className="flex items-center">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                  <Link
                    href={breadcrumb.href}
                    className="text-base font-medium hover:text-primary dark:hover:text-primary text-primary-normal dark:text-white flex items-center"
                  >
                    {" "}
                    {breadcrumb.icon && (
                      <span className="mr-2">{breadcrumb.icon}</span>
                    )}{" "}
                    {breadcrumb.label}
                  </Link>
                  {index < breadcrumbs.length - 1 && (
                    <span className="px-3 text-primary-normal">
                      <Image
                        src="/icons/arrow-right.svg"
                        alt=""
                        width={18}
                        height={18}
                      />{" "}
                    </span>
                  )}
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
