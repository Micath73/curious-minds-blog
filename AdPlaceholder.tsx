
import React from 'react';

interface AdPlaceholderProps {
  className?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ className = '' }) => {
  return (
    <div className={`bg-gray-200 dark:bg-gray-700/50 border border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm rounded-lg min-h-[100px] w-full ${className}`}>
      Advertisement
    </div>
  );
};

export default AdPlaceholder;