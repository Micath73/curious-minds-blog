
import React from 'react';

const BlogPostCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700/50"></div>
      <div className="p-6">
        <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700/50 rounded mb-4"></div>
        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700/50 rounded mb-2"></div>
        <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700/50 rounded mb-4"></div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700/50 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700/50 rounded mb-4"></div>
        <div className="flex items-center mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700/50 mr-3"></div>
          <div>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700/50 rounded mb-1"></div>
            <div className="h-3 w-16 bg-gray-300 dark:bg-gray-700/50 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCardSkeleton;