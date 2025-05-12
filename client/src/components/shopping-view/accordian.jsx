import React, { useState } from "react";

function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const accordionData = [
    {
      id: 1,
      title: "What is Flowbite?",
      content:
        "Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.",
    },
    {
      id: 2,
      title: "Is there a Figma file available?",
      content:
        "Flowbite is first conceptualized and designed using the Figma software so everything you see in the library has a design equivalent in our Figma file.",
    },
    {
      id: 3,
      title: "What are the differences between Flowbite and Tailwind UI?",
      content:
        "The main difference is that the core components from Flowbite are open source under the MIT license, whereas Tailwind UI is a paid product.",
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