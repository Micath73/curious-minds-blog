
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAuthorById, getPostsByAuthorId } from '../services/blogService';
import type { Author, Post, User } from '../types';
import Spinner from '../components/Spinner';
import BlogPostCard from '../components/BlogPostCard';

const AuthorPage: React.FC = () => {
    const { authorId } = useParams<{ authorId: string }>();
    const [author, setAuthor] = useState<Author | User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!authorId) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const [authorData, postsData] = await Promise.all([
                    getAuthorById(authorId),
                    getPostsByAuthorId(authorId)
                ]);
                setAuthor(authorData);
                setPosts(postsData);
            } catch (error) {
                console.error("Failed to fetch author data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [authorId]);

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    }

    if (!author) {
        return (
            <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold font-serif dark:text-white">Author not found</h2>
                <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <header className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-12 text-center">
                <img src={author.avatarUrl} alt={author.name} className="w-32 h-32 rounded-full mx-auto mb-6 ring-4 ring-blue-200 dark:ring-blue-500/50" />
                <h1 className="text-4xl font-bold font-serif text-gray-900 dark:text-white">{author.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
                    {'bio' in author ? author.bio : 'A passionate contributor to the Curious Minds community.'}
                </p>
            </header>

            <h2 className="text-3xl font-bold font-serif mb-6 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-4">Articles by {author.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <BlogPostCard
                        key={post.id}
                        post={post}
                        style={{ animationDelay: `${index * 100}ms` }}
                    />
                ))}
            </div>
             {posts.length === 0 && (
                <div className="text-center col-span-full py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h3 className="text-xl text-gray-500 dark:text-gray-400">No articles found for this author.</h3>
                </div>
            )}
        </div>
    );
};

export default AuthorPage;