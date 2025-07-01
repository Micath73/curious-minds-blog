
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if(password.length < 6) {
            setError('Password must be at least 6 characters long.');
            setLoading(false);
            return;
        }
        try {
            await register({ name, email, password });
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Failed to sign up.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-md mx-auto mt-10">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in text-center">
                    <h1 className="text-3xl font-bold font-serif text-green-600 dark:text-green-400 mb-4">Registration Successful!</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Your account has been created and is now awaiting admin approval.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        You will be able to log in and create posts once your account is approved.
                    </p>
                    <Link to="/login" className="mt-6 inline-block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Back to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
                <h1 className="text-3xl font-bold font-serif text-gray-900 dark:text-white mb-6 text-center">Create an Account</h1>
                <form onSubmit={handleSignup} className="space-y-6">
                     <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                           Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                           Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-md bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                        >
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                 <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
                    Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:underline">Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;