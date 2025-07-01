
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as blogService from '../services/blogService';
import type { Post, Comment, Subscription, User } from '../types';
import Spinner from '../components/Spinner';
import { useAuth } from '../contexts/AuthContext';

type AdminTab = 'posts' | 'comments' | 'users' | 'subscribers';

const AdminPage: React.FC = () => {
    const { isAdmin } = useAuth();
    const [activeTab, setActiveTab] = useState<AdminTab>('posts');
    const [pendingPosts, setPendingPosts] = useState<Post[]>([]);
    const [pendingComments, setPendingComments] = useState<Comment[]>([]);
    const [pendingUsers, setPendingUsers] = useState<User[]>([]);
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
        }
    }, [isAdmin, navigate]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [posts, comments, users, subs] = await Promise.all([
                blogService.getPosts({ status: 'pending' }),
                blogService.getPendingComments(),
                blogService.getPendingUsers(),
                blogService.getSubscriptions(),
            ]);
            setPendingPosts(posts);
            setPendingComments(comments);
            setPendingUsers(users);
            setSubscriptions(subs);
        } catch (error) {
            console.error("Failed to fetch admin data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAction = async (action: () => Promise<void>) => {
        await action();
        fetchData();
    }

    const renderContent = () => {
        if (loading) return <Spinner />;

        switch (activeTab) {
            case 'posts':
                return (
                    <div className="space-y-4">
                        {pendingPosts.length > 0 ? pendingPosts.map(post => (
                            <div key={post.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <h3 className="font-bold text-lg"><Link to={`/post/${post.id}`} className="hover:underline">{post.title}</Link></h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">By: {post.author?.name || 'N/A'} | Category: {post.category}</p>
                                <p className="my-2">{post.summary}</p>
                                <div className="space-x-2 mt-2">
                                    <button onClick={() => handleAction(() => blogService.approvePost(post.id))} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                                    <button onClick={() => handleAction(() => blogService.rejectPost(post.id))} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                                </div>
                            </div>
                        )) : <p>No pending posts.</p>}
                    </div>
                );
            case 'comments':
                return (
                    <div className="space-y-4">
                        {pendingComments.length > 0 ? pendingComments.map(comment => (
                            <div key={comment.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                <p><strong>{comment.authorName}</strong> commented on post: <Link to={`/post/${comment.postId}`} className="hover:underline" target="_blank" rel="noopener noreferrer">{comment.postId}</Link></p>
                                <p className="italic my-2 bg-white dark:bg-gray-600 p-2 rounded">"{comment.content}"</p>
                                <div className="space-x-2 mt-2">
                                    <button onClick={() => handleAction(() => blogService.approveComment(comment.id))} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
                                    <button onClick={() => handleAction(() => blogService.rejectComment(comment.id))} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
                                </div>
                            </div>
                        )) : <p>No pending comments.</p>}
                    </div>
                );
            case 'users':
                return (
                     <div className="space-y-4">
                        {pendingUsers.length > 0 ? pendingUsers.map(user => (
                            <div key={user.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex justify-between items-center">
                                <div>
                                    <p><strong>Name:</strong> {user.name}</p>
                                    <p><strong>Email:</strong> {user.email}</p>
                                </div>
                                <button onClick={() => handleAction(() => blogService.approveUser(user.id))} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Approve User</button>
                            </div>
                        )) : <p>No pending user registrations.</p>}
                    </div>
                );
            case 'subscribers':
                return (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-200 dark:bg-gray-700">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {subscriptions.length > 0 ? subscriptions.map(sub => (
                                    <tr key={sub.id} className="border-b dark:border-gray-700">
                                        <td className="p-3">{sub.name}</td>
                                        <td className="p-3">{sub.email}</td>
                                        <td className="p-3">{new Date(sub.date).toLocaleDateString()}</td>
                                    </tr>
                                )) : <tr><td colSpan={3} className="p-4 text-center">No subscribers yet.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };
    
    const getTabClass = (tabName: AdminTab) =>
        `px-4 py-2 font-semibold rounded-t-lg transition-colors border-b-2 ${
            activeTab === tabName
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'
        }`;


    return (
        <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
            <h1 className="text-4xl font-bold font-serif text-gray-900 dark:text-white mb-6">Admin Dashboard</h1>
            
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-4 overflow-x-auto">
                    <button onClick={() => setActiveTab('posts')} className={getTabClass('posts')}>Posts ({pendingPosts.length})</button>
                    <button onClick={() => setActiveTab('comments')} className={getTabClass('comments')}>Comments ({pendingComments.length})</button>
                    <button onClick={() => setActiveTab('users')} className={getTabClass('users')}>Users ({pendingUsers.length})</button>
                    <button onClick={() => setActiveTab('subscribers')} className={getTabClass('subscribers')}>Subscribers ({subscriptions.length})</button>
                </nav>
            </div>
            
            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminPage;