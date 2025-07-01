
import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';

interface RecentPostCardProps {
  post: Post;
}

const RecentPostCard: React.FC<RecentPostCardProps> = ({ post }) => {
  return (
    <Link 
      to={`/post/${post.id}`} 
      className="flex-shrink-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl dark:shadow-neutral-700/50 dark:hover:shadow-blue-500/20 transition-all duration-300 group hover:-translate-y-1 relative"
    >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-lg h-full overflow-hidden">
          <img className="w-full h-32 object-cover" src={post.imageUrl} alt={post.title} />
          <div className="p-4">
            <h3 className="text-md font-bold font-serif text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
              {post.title}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">{post.category}</span>
          </div>
        </div>
    </Link>
  );
};

export default RecentPostCard;