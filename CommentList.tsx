
import React, { useState, useEffect } from 'react';
import { getCommentsByPostId } from '../services/blogService';
import type { Comment } from '../types';
import Spinner from './Spinner';

interface CommentListProps {
    postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true);
            try {
                const fetchedComments = await getCommentsByPostId(postId);
                setComments(fetchedComments);
            } catch (error) {
                console.error("Failed to fetch comments:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchComments();
    }, [postId]);

    if (loading) {
        return <Spinner />;
    }

    if (comments.length === 0) {
        return <p className="text-gray-500 dark:text-gray-400">Be the first to comment!</p>;
    }

    return (
        <div className="space-y-6">
            {comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center font-bold text-lg text-gray-600 dark:text-gray-200">
                        {comment.authorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-gray-800 dark:text-gray-100">{comment.authorName}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(comment.date).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mt-1">{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CommentList;