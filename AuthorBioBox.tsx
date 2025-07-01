
import React from 'react';
import { Link } from 'react-router-dom';
import type { Author, User } from '../types';

interface AuthorBioBoxProps {
    author: Author | User;
}

const AuthorBioBox: React.FC<AuthorBioBoxProps> = ({ author }) => {
    const bio = 'bio' in author ? author.bio : 'A passionate contributor to the Curious Minds community.';

    return (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 flex items-start bg-gray-50 dark:bg-gray-700/30 p-6 rounded-lg">
            <img src={author.avatarUrl} alt={author.name} className="w-16 h-16 rounded-full mr-6" />
            <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">About the Author</h3>
                <Link to={`/author/${author.id}`} className="text-2xl font-serif font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {author.name}
                </Link>
                <p className="text-gray-600 dark:text-gray-300 mt-2">{bio}</p>
            </div>
        </div>
    )
}

export default AuthorBioBox;