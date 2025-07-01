
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitComment } from '../services/blogService';
import { useAuth } from '../contexts/AuthContext';

interface CommentFormProps {
    postId: string;
    onCommentSubmitted: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentSubmitted }) => {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to comment.');
            return;
        }
        if (!content) {
            setError('Please write a comment.');
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await submitComment({ 
                postId,
                authorId: user.id,
                authorName: user.name, // denormalized for easy display
                content
            });
            setMessage('Your comment has been submitted for moderation. Thank you!');
            setContent('');
            onCommentSubmitted();
        } catch (err: any) {
            setError(err.message || 'An error occurred while submitting your comment.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                <p className="text-gray-700 dark:text-gray-300">
                    <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Log in</Link> to join the conversation.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h3 className="text-xl font-semibold font-serif mb-4 text-gray-800 dark:text-gray-100">Leave a Reply as {user.name}</h3>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label htmlFor="commentContent" className="sr-only">Comment</label>
                    <textarea
                        id="commentContent"
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your comment here..."
                        className="w-full p-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                    >
                        {loading ? 'Submitting...' : 'Post Comment'}
                    </button>
                </div>
            </div>
            {message && <p className="text-green-600 dark:text-green-400 text-sm mt-3">{message}</p>}
            {error && <p className="text-red-600 dark:text-red-400 text-sm mt-3">{error}</p>}
        </form>
    );
};

export default CommentForm;