import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import FaqItem from "./FaqItem";

const FAQ_DATA = [
  { id: "q1", questionKey: "faq.question1", answerKey: "faq.answer1" },
  { id: "q2", questionKey: "faq.question2", answerKey: "faq.answer2" },
  { id: "q3", questionKey: "faq.question3", answerKey: "faq.answer3" },
  { id: "q4", questionKey: "faq.question4", answerKey: "faq.answer4" },
  { id: "q5", questionKey: "faq.question5", answerKey: "faq.answer5" },
  { id: "q6", questionKey: "faq.question6", answerKey: "faq.answer6" },
];

const FaqSection = () => {
  const { translations } = useLanguage();

  return (
    <div className="w-full px-4 sm:px-10 lg:px-12">
      <div className="flex flex-col items-center gap-3">
        {FAQ_DATA.map((item) => (
          <FaqItem
            key={item.id}
            question={translations[item.questionKey]}
            answer={translations[item.answerKey]}
          />
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
