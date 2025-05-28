import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const FAQ = () => {
  const { translations } = useLanguage();
  return <div>Question 1</div>;
};

export default FAQ;
