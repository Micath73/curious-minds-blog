
import React, { useState } from 'react';
import { addSubscription } from '../services/blogService';

const SubscriptionForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !email) {
            setError('Name and email are required.');
            return;
        }
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await addSubscription({ name, email });
            setMessage('Thank you for subscribing!');
            setName('');
            setEmail('');
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full sm:w-1/3 p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full sm:w-1/2 p-2 rounded-md bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
                {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
            {message && <p className="text-green-400 text-sm mt-2 w-full">{message}</p>}
            {error && <p className="text-red-400 text-sm mt-2 w-full">{error}</p>}
        </form>
    );
};

export default SubscriptionForm;