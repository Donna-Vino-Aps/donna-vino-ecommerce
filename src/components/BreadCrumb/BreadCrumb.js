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
    breadcrumbs.push({ label, href, icon: "/icons/arrow-right-dark.svg" });
  });

  return (
    <div className="bg-white py-4">
      <div className="container mx-auto">
        <div className="mb-8 w-full">
          <div className="rounded-lg border bg-white px-4 py-4 sm:px-6 md:px-8 md:py-5">
            <ul className="flex items-center">
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={index} className="flex items-center">
                  <Link
                    href={breadcrumb.href}
                    //change text color to real primary-dark (Halyna will add this color in her PR)
                    className="flex items-center text-base font-medium text-primary-dark hover:text-primary-normal"
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
