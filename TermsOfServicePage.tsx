
import React from 'react';

const TermsOfServicePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
      <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-6">Terms of Service</h1>
      <div className="prose prose-lg max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
        <p><em>Effective Date: June 30, 2025</em></p>
        <p>
          Welcome to Curious Minds. By accessing or using our website, you agree to the following terms:
        </p>

        <h2 className="font-serif text-gray-900 dark:text-white">1. Use of Content</h2>
        <p>
          All content published on Curious Minds is for informational and educational purposes only. You may not reproduce, distribute, or copy content without prior written permission.
        </p>

        <h2 className="font-serif text-gray-900 dark:text-white">2. User Conduct</h2>
        <p>
          When interacting with our website, you agree not to:
        </p>
        <ul>
            <li>Post offensive or misleading content.</li>
            <li>Attempt to access restricted areas of the site.</li>
            <li>Use the site for illegal or harmful activities.</li>
        </ul>

        <h2 className="font-serif text-gray-900 dark:text-white">3. Third-Party Links</h2>
        <p>
          Our site may contain links to third-party websites or services. We are not responsible for the content or practices of these external sites.
        </p>

        <h2 className="font-serif text-gray-900 dark:text-white">4. Ad Policy</h2>
        <p>
          We may display advertisements through services like Google AdSense. Ads are shown based on user interests and cookies. We strive to ensure ads are safe and appropriate for all audiences.
        </p>
        
        <h2 className="font-serif text-gray-900 dark:text-white">5. Content Disclaimer</h2>
        <p>
          While we strive for accuracy, we do not guarantee that all information is 100% complete or current. We are not liable for any loss or damage from using our content.
        </p>

        <h2 className="font-serif text-gray-900 dark:text-white">6. Changes to Terms</h2>
        <p>
          We reserve the right to update these terms. Continued use of the site means you accept the revised terms.
        </p>
      </div>
    </div>
  );
};

export default TermsOfServicePage;