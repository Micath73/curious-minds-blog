
import React from 'react';
import { Link } from 'react-router-dom';
import type { Post } from '../types';

interface BlogPostCardProps {
  post: Post;
  style?: React.CSSProperties;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, style }) => {
  return (
    <article 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl dark:shadow-neutral-700/50 dark:hover:shadow-blue-500/20 overflow-hidden flex flex-col group animate-slide-up-fade transition-all duration-300 hover:-translate-y-1 relative"
      style={style}
    >
      {post.isEditorsPick && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
          Editor's Pick
        </div>
      )}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-lg blur opacity-0 group-hover:opacity-60 transition duration-500"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg flex flex-col flex-grow h-full">
        <Link to={`/post/${post.id}`} className="block overflow-hidden">
          <img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" src={post.imageUrl} alt={post.title} />
        </Link>
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-2">
            <Link to={`/category/${post.category.toLowerCase()}`} className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors">
              {post.category}
            </Link>
          </div>
          <h2 className="text-xl font-bold font-serif mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{post.summary}</p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <img src={post.author?.avatarUrl} alt={post.author?.name} className="w-8 h-8 rounded-full mr-3" />
            <div>
              <Link to={`/author/${post.author?.id}`} className="font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">{post.author?.name}</Link>
              <p>{post.date}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;