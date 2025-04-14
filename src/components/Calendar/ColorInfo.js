import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const ColorInfo = () => {
  // const [isMobile, setIsMobile] = React.useState(
  //   typeof window !== "undefined" && window.innerWidth < 768,
  // );

  const { translations } = useLanguage();

  // React.useEffect(() => {
  //   // const handleResize = () => {
  //   //   setIsMobile(window.innerWidth < 768);
  //   // };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  return (
    <div className="flex justify-center items-center rounded-[0.5rem] bg-tertiary2-normal h-[88px] md:h-10 mt-3 w-full md:max-w-[calc(7*6.22rem-6px)] lg:md:max-w-[calc(7*6.22rem-2px)]">
      <div className="grid grid-cols-2 px-2 gap-6 justify-space-between md:gap-4 md:flex md:flex-row justify-center items-center">
        <article className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary-active"></div>
          <p className="text-labelMedium font-medium relative bottom-[1px]">
            {translations["calendar.colorinfo.today"]}
          </p>
        </article>
        <article className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-calendar-open"></div>
          <p className="text-labelMedium font-medium relative bottom-[1px]">
            {translations["calendar.colorinfo.available"]}
          </p>
        </article>
        <article className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-calendar-limited"></div>
          <p className="text-labelMedium font-medium relative bottom-[1px]">
            {translations["calendar.colorinfo.limited"]}
          </p>
        </article>
        <article className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-calendar-full"></div>
          <p className="text-labelMedium font-medium relative bottom-[1px]">
            {translations["calendar.colorinfo.full"]}
          </p>
        </article>
      </div>
    </div>
  );
};

export default ColorInfo;
