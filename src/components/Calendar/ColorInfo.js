import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const ColorInfo = () => {
  const { translations } = useLanguage();

  return (
    <div className="mt-3 flex h-[88px] w-full items-center justify-center rounded-[0.5rem] bg-tertiary2-normal md:h-10 md:max-w-[calc(7*6.282rem-6px)] lg:md:max-w-[calc(7*6.282rem-2px)]">
      <div className="grid grid-cols-2 items-center justify-between gap-6 px-2 md:flex md:flex-row md:gap-4">
        {[
          { color: "bg-primary-active", key: "today" },
          { color: "bg-calendar-open", key: "available" },
          { color: "bg-calendar-limited", key: "limited" },
          { color: "bg-calendar-full", key: "full" },
        ].map((item) => (
          <article key={item.key} className="flex items-center gap-2">
            <div
              className={`h-4 w-4 rounded-full ${item.color}`}
              aria-label={translations[`calendar.colorinfo.${item.key}`]}
            ></div>
            <p className="relative bottom-[1px] text-labelMedium font-medium">
              {translations[`calendar.colorinfo.${item.key}`]}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ColorInfo;
