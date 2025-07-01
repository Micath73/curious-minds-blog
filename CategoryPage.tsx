
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostsByCategory } from '../services/blogService';
import type { Post } from '../types';
import Spinner from '../components/Spinner';
import BlogPostCard from '../components/BlogPostCard';

const CategoryPage: React.FC = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!categoryName) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const postsData = await getPostsByCategory(categoryName);
                setPosts(postsData);
            } catch (err) {
                console.error("Failed to fetch category data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [categoryName]);

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    }

    return (
        <div className="animate-fade-in">
            <header className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg mb-12">
                <h1 className="text-4xl font-bold font-serif text-gray-900 dark:text-white capitalize">
                    Category: <span className="text-blue-600 dark:text-blue-400">{categoryName}</span>
                </h1>
            </header>

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
                    <h3 className="text-xl text-gray-500 dark:text-gray-400">No articles found in this category.</h3>
                     <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Back to Home</Link>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;