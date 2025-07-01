
import React from 'react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
      <div className="prose prose-lg max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
        <p><em>Effective Date: June 30, 2025</em></p>
        <p>
          At Curious Minds, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
        </p>

        <h2 className="font-serif text-gray-900 dark:text-white">1. Information We Collect</h2>
        <p>
          We may collect personal information that you voluntarily provide when you:
        </p>
        <ul>
            <li>Subscribe to our newsletter.</li>
            <li>Fill out contact forms.</li>
            <li>Leave comments or feedback.</li>
        </ul>
        <p>We also collect non-personal data such as:</p>
        <ul>
            <li>Browser type</li>
            <li>Device used</li>
            <li>IP address</li>
            <li>Pages visited and time spent (via analytics tools like Google Analytics)</li>
        </ul>

        <h2 className="font-serif text-gray-900 dark:text-white">2. How We Use Your Information</h2>
        <p>
          Your information helps us:
        </p>
        <ul>
            <li>Improve our website content and user experience.</li>
            <li>Respond to your inquiries or messages.</li>
            <li>Deliver relevant ads through services like Google AdSense.</li>
        </ul>
        

        <h2 className="font-serif text-gray-900 dark:text-white">3. Cookies</h2>
        <p>
            We use cookies to:
        </p>
        <ul>
            <li>Analyze traffic and site interaction.</li>
            <li>Personalize content and ads.</li>
            <li>Remember user preferences.</li>
        </ul>
        <p>You can disable cookies through your browser settings.</p>

        <h2 className="font-serif text-gray-900 dark:text-white">4. Third-Party Services</h2>
        <p>
          We may use trusted third-party services (e.g., Google AdSense, Google Analytics) that collect, monitor, and analyze website activity. These services may use cookies or tracking technologies.
        </p>

        <h2 className="font-serif text-gray-900 dark:text-white">5. Your Rights</h2>
        <p>
          You can request access to your personal data or ask us to delete it. Please contact us at <a href="mailto:curiousminds.team@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">curiousminds.team@gmail.com</a>.
        </p>

        <h2 className="font-serif text-gray-900 dark:text-white">6. Changes to This Policy</h2>
        <p>
          We reserve the right to update this policy. Changes will be posted here.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;