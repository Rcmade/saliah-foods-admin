"use client";
import { useState } from "react";

const FaqSection = () => {
  const [state, setState] = useState("");
  const toggleFaq = (value: any) => {
    state === "" ? setState(value) : setState("");
  };
  return (
    <>
      <div className="bg-primary-100">
        <div className="py-20 max-w-[900px] m-auto">
          <h2 className="text-center text-4xl text-primary-500 mb-10">
            Frequently Asked Questions
          </h2>
          {faqCollection?.map((value, index) => {
            return (
              <>
                <div
                  key={index}
                  className="text-center border-b border-primary-300"
                >
                  <h3
                    className="text-primary-500 text-xl py-4 "
                    onClick={() => toggleFaq(value.question)}
                  >
                    {value.question}
                  </h3>
                  {state === value.question && (
                    <p className="text-light-500 pb-4">{value.answer}</p>
                  )}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default FaqSection;
const faqCollection = [
  {
    question: "Will my personal data be confidential?",
    answer:
      "We take data protection very seriously at Saliah Foods. All information provided through the website is stored on secure servers. All payment transactions carried out through our website are encrypted. Your card details and passwords are not available to any of our employees. Please note, it is your responsibility to keep any website passwords or login codes confidential. For more details, refer to our Privacy Policy.",
  },
  {
    question:
      "What should I do if I am having trouble logging into my account?",
    answer: "updating soon...!!",
  },
  {
    question: "How can I update my account?",
    answer: "updating soon...!!",
  },
];
