import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const ColorInfo = () => {
  const { translations } = useLanguage();

  return (
    <div className="flex justify-center items-center rounded-[0.5rem] bg-tertiary2-normal h-[88px] md:h-10 mt-3 w-full md:max-w-[calc(7*6.282rem-6px)] lg:md:max-w-[calc(7*6.282rem-2px)]">
      <div className="grid grid-cols-2 px-2 gap-6 justify-space-between md:gap-4 md:flex md:flex-row justify-center items-center">
        {[
          { color: "bg-primary-active", key: "today" },
          { color: "bg-calendar-open", key: "available" },
          { color: "bg-calendar-limited", key: "limited" },
          { color: "bg-calendar-full", key: "full" },
        ].map((item) => (
          <article key={item.key} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full ${item.color}`}
              aria-label={translations[`calendar.colorinfo.${item.key}`]}
            ></div>
            <p className="text-labelMedium font-medium relative bottom-[1px]">
              {translations[`calendar.colorinfo.${item.key}`]}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ColorInfo;
