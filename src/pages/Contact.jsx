import { motion } from "framer-motion";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_1him9ee',       // Your EmailJS service ID
        'template_0ogct5r',      // Your EmailJS template ID
        form.current,
        'rua3staf5Dmfu_ISR'      // Your EmailJS public key (user ID)
      )
      .then(
        (result) => {
          toast.success('Message sent successfully!');
          form.current.reset(); // Clear form after success
        },
        (error) => {
          toast.error('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-pink-50 to-pink-100 flex items-center justify-center px-6 py-10 md:py-20">
      <div className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-xl mt-10 md:mt-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[#b03980] text-center mb-6"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Get in Touch with Pluma
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Have feedback, questions, or want to collaborate? We'd love to hear from you.
          Fill out the form below and our team will get back to you as soon as possible.
        </motion.p>

        <form ref={form} onSubmit={sendEmail} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="col-span-1 md:col-span-2 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#b03980]"
          />
          <input
            type="email"
            name="reply_to"
            placeholder="Your Email"
            required
            className="col-span-1 md:col-span-2 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#b03980]"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            required
            className="col-span-1 md:col-span-2 border border-gray-300 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#b03980]"
          ></textarea>

          <motion.button
            type="submit"
            className="col-span-1 md:col-span-2 bg-[#b03980] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#9b2d70] transition duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
