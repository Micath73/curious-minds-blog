
import React from 'react';
import { Link } from 'react-router-dom';
import LogoIcon from './icons/LogoIcon';
import SubscriptionForm from './SubscriptionForm';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white dark:bg-black">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
               <LogoIcon className="h-8 w-8 text-blue-400" />
               <span className="font-serif text-xl font-bold">Curious Minds</span>
            </div>
            <p className="text-gray-400 text-sm">Exploring the wonders of science, technology, and the human experience.</p>
          </div>
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">All Articles</Link></li>
              <li><Link to="/create-post" className="text-gray-400 hover:text-white transition-colors">Create a Post</Link></li>
            </ul>
          </div>
          <div className="md:col-span-2">
             <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
             <p className="text-gray-400 text-sm mb-4">Get the latest articles and discoveries delivered straight to your inbox.</p>
             <SubscriptionForm />
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-center">
            <div className="mb-4 sm:mb-0">
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
                <span className="mx-2">|</span>
                <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <p>&copy; {new Date().getFullYear()} Curious Minds. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;