import { motion } from "framer-motion";
import logo from "../assets/logo.png"; // Adjust path as needed

const LogoMeaning = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-16 text-center">
      {/* Logo */}
      <motion.img
        src={logo}
        alt="Pluma Logo"
        className="w-32 h-32 mb-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Title */}
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-[#b03980] mb-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        The Meaning Behind the Pluma Logo
      </motion.h2>

      {/* Logo description */}
      <motion.p
        className="text-gray-700 max-w-2xl text-lg md:text-xl leading-relaxed mb-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        The word <span className="text-[#b03980] font-semibold">"Pluma"</span> means feather in Spanish — a timeless symbol of
        creativity, lightness, and expression. Just as feathers once helped craft the world’s most powerful words,
        Pluma lets you share your voice in the digital age with simplicity and elegance.
      </motion.p>

      {/* Why we built it */}
      <motion.div
        className="text-gray-700 max-w-3xl text-lg md:text-xl leading-relaxed space-y-6"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <p>
          Pluma was born out of a need for a minimal, distraction-free platform where writers, thinkers,
          and storytellers can truly focus on their words. Most platforms today prioritize algorithms over authenticity —
          we wanted to change that.
        </p>
        <p>
          Our aim is to create a beautiful, intuitive space where everyone can write freely, share meaningfully,
          and connect deeply — without the noise. Whether you’re journaling, educating, or inspiring,
          Pluma is here to amplify your voice.
        </p>
      </motion.div>
    </div>
  );
};

export default LogoMeaning;
