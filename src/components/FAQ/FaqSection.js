import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import FaqItem from "./FaqItem";

const FaqSection = () => {
  const { translations } = useLanguage();
  const QuestionsArray = [
    {
      question: translations["faq.question1"],
      answer: translations["faq.answer1"],
    },
    {
      question: translations["faq.question2"],
      answer: translations["faq.answer2"],
    },
    {
      question: translations["faq.question3"],
      answer: translations["faq.answer3"],
    },
    {
      question: translations["faq.question4"],
      answer: translations["faq.answer4"],
    },
    {
      question: translations["faq.question5"],
      answer: translations["faq.answer5"],
    },
    {
      question: translations["faq.question6"],
      answer: translations["faq.answer6"],
    },
  ];
  return (
    <div className="">
      {QuestionsArray.map((item, index) => (
        <FaqItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
};

export default FaqSection;
