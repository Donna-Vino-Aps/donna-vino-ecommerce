"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

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
    let label = part.replace(/-/g, " ");

    if (label === "wines") {
      label = "Wines";
    } else if (label === "grapes zones") {
      label = "Grapes & Zones";
    } else if (label === "offers") {
      label = "Offers";
    }

    breadcrumbs.push({ label, href, icon: "/icons/arrow-right.svg" });
  });

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
