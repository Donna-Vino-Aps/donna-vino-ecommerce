import React from "react";

const ColorInfo = () => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.innerWidth < 768,
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex justify-center items-center rounded-[0.5rem] bg-tertiary2-normal h-[88px] md:h-10 mt-3">
      <img
        src={
          isMobile
            ? "/icons/color-info-calendar-mobile.svg"
            : "/icons/color-info-calendar.svg"
        }
        className="md:h-[1rem] w-max-[34rem] mx-8"
      />
    </div>
  );
};

export default ColorInfo;
