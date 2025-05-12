import React, { useState } from "react";

function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
     {
    id: 1,
    title: "What is your return policy?",
    content:
      "We accept returns within 30 days of delivery. Items must be unused, in original packaging, and accompanied by a receipt or proof of purchase.",
  },
  {
    id: 2,
    title: "Do you offer free shipping?",
    content:
      "Yes, we offer free standard shipping on all domestic orders over $50. Expedited shipping options are available at checkout.",
  },
  {
    id: 3,
    title: "How can I track my order?",
    content:
      "Once your order is shipped, you will receive an email with a tracking number. You can also track your order from your account dashboard.",
  },
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-8 mb-16 ">
    <div id="accordion-collapse" className="w-full space-y-4">
      {accordionData.map((item, index) => (
        <div key={item.id} className="border border-gray-600 rounded-lg">
          <h2>
            <button
              type="button"
              className="flex items-center justify-between w-full p-5 font-medium text-gray-500 hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.title}</span>
              <svg
                className={`w-3 h-3 transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          {openIndex === index && (
            <div className="p-5 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
}

export default Accordion;