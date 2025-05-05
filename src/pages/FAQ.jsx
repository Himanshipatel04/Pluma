import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const faqs = [
    {
      question: "What is Pluma?",
      answer:
        "Pluma is a blogging platform where users can share and explore articles on various topics. It provides a space for bloggers to connect and grow their audience.",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Register' button on the homepage, fill in your details, and submit. You will receive a confirmation email to complete your registration.",
    },
    {
      question: "Is Pluma free to use?",
      answer:
        "Yes, Pluma is completely free to use. You can create an account, publish blogs, and interact with other users without any charges.",
    },
    {
      question: "How can I write and publish a blog?",
      answer:
        "Once you’re logged in, you can click on the 'Create New Post' button, write your blog, add images or videos, and then hit 'Publish'. Your post will be visible to all users.",
    },
    {
      question: "Can I edit or delete my posts?",
      answer:
        "Yes, you can edit or delete your posts anytime by going to your profile and selecting the post you wish to edit or remove.",
    },
    {
      question: "How can I contact Pluma support?",
      answer:
        "For any issues or questions, you can contact our support team at support@pluma.com. We’re here to help!",
    },
  ];

  return (
    <div className="h-fit flex justify-center items-center py-24">
      <motion.div
        className="w-full flex justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-[90%] md:w-[60%] p-4 bg-white rounded-xl border-2">
          <div className="flex justify-center items-center flex-col gap-4">
            <h1 className="text-3xl font-semibold text-center w-full uppercase text-gray-600">
              Frequently Asked Questions
            </h1>
          </div>

          <div className="mt-8 text-gray-600 text-lg">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-6">
                <div
                  className="cursor-pointer flex justify-between items-center p-4 bg-[#f5f5f5] rounded-md shadow-md"
                  onClick={() => toggleAnswer(index)}
                >
                  <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
                  <span className="text-[#b03980]">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </div>
                {activeIndex === index && (
                  <p className="mt-4 px-4 text-gray-700">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FAQ;
