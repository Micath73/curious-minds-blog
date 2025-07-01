
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitPost, getAllCategories } from '../services/blogService';
import { useAuth } from '../contexts/AuthContext';

const CreatePostPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllCategories().then(cats => setAvailableCategories(cats));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to create a post.');
            return;
        }
        if (!title || !summary || !content || !category) {
            setError('Please fill out all fields.');
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');
        try {
            const newPost = await submitPost({
                title,
                summary,
                content: [content],
                category,
                authorId: user.id
            });
            setMessage('Your post has been submitted for review! Thank you for your contribution.');
            setTitle('');
            setSummary('');
            setContent('');
            setCategory('');
            setTimeout(() => navigate(`/post/${newPost.id}`), 2000);
        } catch (err: any) {
            setError(err.message || 'An error occurred during submission.');
        } finally {
            setLoading(false);
        }
    };

    if (user?.status === 'pending') {
        return (
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in text-center">
                <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-4">Account Pending Approval</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Your account is currently waiting for admin approval. Once approved, you'll be able to create and submit posts.
                </p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Thank you for your patience!
                </p>
            </div>
        );
    }
    
    return (
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
            <h1 className="text-4xl font-bold font-serif text-gray-900 dark:text-white mb-4">Create a New Post</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Share your knowledge with the Curious Minds community. All submissions are reviewed by our team before publishing.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Article Title</label>
                    <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600" required />
                </div>
                <div>
                    <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Summary (1-2 sentences)</label>
                    <input type="text" id="summary" value={summary} onChange={e => setSummary(e.target.value)} className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600" required />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600" required>
                        <option value="">Select a category</option>
                        {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Content (You can use multiple paragraphs)</label>
                    <textarea id="content" rows={15} value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600" required />
                </div>
                <div>
                    <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400">
                       {loading ? 'Submitting...' : 'Submit for Review'}
                    </button>
                </div>
                 {message && <p className="text-green-600 dark:text-green-400 text-sm mt-3">{message}</p>}
                 {error && <p className="text-red-600 dark:text-red-400 text-sm mt-3">{error}</p>}
            </form>
        </div>
    );
};

export default CreatePostPage;