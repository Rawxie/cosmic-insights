import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I format my birth details?",
      answer: "Enter your birth details in the following format: Date of Birth (DD/MM/YYYY), Time of Birth (HH:MM AM/PM), and Place of Birth (City, Country). For example: 15/04/1990, 10:30 AM, New York, USA"
    },
    {
      question: "What kind of questions can I ask?",
      answer: "You can ask about your personality traits, career prospects, relationships, upcoming challenges, and general life guidance. Our AI will analyze your birth chart to provide personalized insights."
    },
    {
      question: "How accurate are the readings?",
      answer: "Our readings are based on traditional astrological principles combined with advanced AI analysis. While we strive for accuracy, remember that astrology is a tool for guidance and self-reflection."
    },
    {
      question: "Can I ask follow-up questions?",
      answer: "Yes! After receiving your initial reading, you can ask follow-up questions to dive deeper into specific areas of your life or clarify any points from your reading."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl font-space-grotesk">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-gray-300 font-space-mono">
            Everything you need to know about getting your astrology reading
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700/50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-white font-space-grotesk">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-purple-400 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`px-6 py-4 text-gray-300 font-space-mono transition-all duration-300 ${
                  openIndex === index ? 'block' : 'hidden'
                }`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ; 