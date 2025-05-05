import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="h-fit flex justify-center items-center py-24">
      <motion.div
        className="w-full flex justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-[90%] md:w-[60%] p-8 bg-white rounded-xl border-2">
          <div className="flex justify-center items-center flex-col gap-4">
            <h1 className="text-3xl font-semibold text-center w-full uppercase text-gray-600">
              Privacy Policy
            </h1>
          </div>

          <div className="mt-8 text-gray-600 text-lg">
            <p className="mb-4">
              At <span className="text-[#b935a1] font-extrabold">Pluma</span>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and protect your data when you visit our website and use our services.
            </p>

            <h2 className="text-2xl font-semibold mt-6">1. Information We Collect</h2>
            <p>
              We collect the following types of information:
              <ul className="list-disc list-inside mt-2">
                <li>Personal Identification Information (name, email, etc.)</li>
                <li>Usage data and cookies</li>
                <li>Device and IP address information</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mt-6">2. How We Use Your Information</h2>
            <p>
              The data we collect is used to:
              <ul className="list-disc list-inside mt-2">
                <li>Provide and improve our services</li>
                <li>Respond to your inquiries</li>
                <li>Send newsletters and updates</li>
                <li>Enhance website functionality and user experience</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mt-6">3. Data Protection</h2>
            <p>
              We implement various security measures to safeguard your personal information. However, please note that no method of data transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-semibold mt-6">4. Third-Party Sharing</h2>
            <p>
              We do not sell, trade, or transfer your personal data to third parties without your consent, except when required by law or necessary for the provision of our services.
            </p>

            <h2 className="text-2xl font-semibold mt-6">5. Your Rights</h2>
            <p>
              You have the right to:
              <ul className="list-disc list-inside mt-2">
                <li>Access, update, or delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mt-6">6. Cookies</h2>
            <p>
              Our website uses cookies to enhance your experience. You can manage or disable cookies through your browser settings.
            </p>

            <h2 className="text-2xl font-semibold mt-6">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated date.
            </p>

            <h2 className="text-2xl font-semibold mt-6">8. Contact Us</h2>
            <p>
              If you have any questions or concerns about our Privacy Policy, please contact us at support@pluma.com.
            </p>

            <div className="flex justify-center items-center mt-8">
              <Link
                to="/"
                className="text-center font-semibold text-[#b03980] underline"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
