
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
      <h1 className="text-4xl font-bold font-serif text-gray-900 dark:text-white mb-6">About Us</h1>
      <div className="prose prose-lg max-w-none text-gray-700 dark:prose-invert dark:text-gray-300">
        <p>
          At Curious Minds, we believe that curiosity is the beginning of wisdom. Our platform is dedicated to uncovering fascinating insights from history, science, world cultures, and thought-provoking topics that matter to inquisitive readers like you.
        </p>
        <p>
          Founded with a passion for learning and storytelling, our goal is to make education exciting and accessible. Whether you're diving into ancient civilizations, decoding scientific wonders, or exploring cultural traditions, you'll find reliable and engaging content here — written for the naturally curious.
        </p>
        <h2 className="font-serif text-gray-900 dark:text-white">What We Offer:</h2>
        <ul>
          <li>In-depth articles on science, history, culture, and technology.</li>
          <li>Well-researched stories that blend education with entertainment.</li>
          <li>A clean, user-friendly, and ad-friendly website experience.</li>
        </ul>
        <p>
          We are committed to delivering high-quality, original content that meets the standards of a global audience. Curious Minds is more than just a website — it's a learning hub for lifelong learners.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;