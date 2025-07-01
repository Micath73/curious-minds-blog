
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
      <h1 className="text-4xl font-bold font-serif text-gray-900 dark:text-white mb-6">Contact Us</h1>
      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 space-y-4">
        <p>
          Have a question, suggestion, or just want to say hello? We’d love to hear from you!
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:curiousminds.team@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">curiousminds.team@gmail.com</a>
        </p>
        <p>
          <strong>Location:</strong> Addis Ababa, Ethiopia
        </p>
        <p>
          <strong>Business Hours:</strong> Monday – Friday, 9 AM – 5 PM (GMT+3)
        </p>
        <p>
          Feel free to contact us for feedback, content inquiries, or collaboration opportunities.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;