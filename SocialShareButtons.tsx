
import React from 'react';
import type { Post } from '../types';

interface SocialShareButtonsProps {
  post: Post;
}

const SocialShareButtons: React.FC<SocialShareButtonsProps> = ({ post }) => {
  const url = window.location.href;
  const title = post.title;

  const platforms = [
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
        </svg>
      ),
      color: 'bg-[#1DA1F2] hover:bg-[#0c85d0]',
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"></path>
        </svg>
      ),
      color: 'bg-[#1877F2] hover:bg-[#125aae]',
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(post.summary)}`,
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.5 2.5-2.5c1.6 0 2.5 1.2 2.5 2.5s-1 2.5-2.5 2.5zM22 21.5h-5v-6.5c0-1.5-.5-2.5-2-2.5s-2.5 1-2.5 2.5V21.5h-5v-13h5V10s1-2 4-2c3 0 5 2 5 6v7.5z"></path>
        </svg>
      ),
      color: 'bg-[#0A66C2] hover:bg-[#084e94]',
    },
     {
      name: 'Email',
      url: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${url}`)}`,
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>
      ),
      color: 'bg-gray-500 hover:bg-gray-600',
    }
  ];

  return (
    <div className="flex items-center gap-3">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Share this post:</h3>
        <div className="flex gap-2">
        {platforms.map((platform) => (
            <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${platform.name}`}
            className={`flex items-center justify-center w-9 h-9 rounded-full text-white transition-colors ${platform.color}`}
            >
            {platform.icon}
            </a>
        ))}
        </div>
    </div>
  );
};

export default SocialShareButtons;