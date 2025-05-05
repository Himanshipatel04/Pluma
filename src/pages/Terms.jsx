import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Terms = () => {
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
              Terms and Conditions
            </h1>
          </div>

          <div className="mt-8 text-gray-600 text-lg">
            <p className="mb-4">
              These Terms and Conditions outline the rules and regulations for the use of <span className="text-[#b935a1] font-extrabold">Pluma</span> website and services. By accessing or using our website, you agree to be bound by these terms.
            </p>

            <h2 className="text-2xl font-semibold mt-6">1. Acceptance of Terms</h2>
            <p>
              By accessing or using our services, you agree to comply with these terms. If you disagree with any part of the terms, you may not use our website.
            </p>

            <h2 className="text-2xl font-semibold mt-6">2. Use of Our Services</h2>
            <p>
              You are granted a limited, non-exclusive, non-transferable license to access and use the services provided by *Pluma*. You agree not to use the website for unlawful purposes.
            </p>

            <h2 className="text-2xl font-semibold mt-6">3. User Accounts</h2>
            <p>
              To access certain features of the website, you may need to create an account. You are responsible for maintaining the confidentiality of your account and agree to notify us immediately of any unauthorized use.
            </p>

            <h2 className="text-2xl font-semibold mt-6">4. Content and User-Generated Material</h2>
            <p>
              By submitting content to our platform, you grant *Pluma* a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content.
            </p>

            <h2 className="text-2xl font-semibold mt-6">5. Prohibited Activities</h2>
            <p>
              You agree not to engage in activities such as:
              <ul className="list-disc list-inside mt-2">
                <li>Infringing on intellectual property rights</li>
                <li>Spamming or transmitting malicious software</li>
                <li>Discriminatory or unlawful behavior</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mt-6">6. Limitation of Liability</h2>
            <p>
              In no event shall *Pluma* be liable for any damages arising from the use or inability to use the website or services. We are not responsible for any third-party content or links.
            </p>

            <h2 className="text-2xl font-semibold mt-6">7. Changes to the Terms</h2>
            <p>
              We reserve the right to modify or update these terms at any time. Any changes will be reflected on this page with the updated date.
            </p>

            <h2 className="text-2xl font-semibold mt-6">8. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the jurisdiction in which *Pluma* operates. Any disputes will be resolved through arbitration or in the appropriate courts.
            </p>

            <h2 className="text-2xl font-semibold mt-6">9. Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms and Conditions, please contact us at support@pluma.com.
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

export default Terms;
