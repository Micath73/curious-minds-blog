
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../services/blogService';
import { summarizeText } from '../services/geminiService';
import type { Post } from '../types';
import Spinner from '../components/Spinner';
import AdPlaceholder from '../components/AdPlaceholder';
import AuthorBioBox from '../components/AuthorBioBox';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import SocialShareButtons from '../components/SocialShareButtons';

const RECENTLY_VIEWED_KEY = 'recentlyViewedPosts';
const MAX_RECENT_POSTS = 4;

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState('');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      setLoading(true);
      const fetchedPost = await getPostById(id);
      
      // Allow viewing pending posts if fetched, but only published ones affect recently viewed
      if (fetchedPost && fetchedPost.status !== 'published') {
          // In a real app, you might add a check here to see if the current user is an admin
          console.log("Viewing a non-published post.");
      }
      setPost(fetchedPost);

      if (fetchedPost && fetchedPost.status === 'published') {
        const storedIds: string[] = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
        const newIds = [id, ...storedIds.filter(storedId => storedId !== id)];
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(newIds.slice(0, MAX_RECENT_POSTS)));
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleSummarize = useCallback(async () => {
    if (!post) return;
    setIsSummarizing(true);
    setSummaryError('');
    setSummary('');
    try {
      const fullText = post.content.join('\n\n');
      const generatedSummary = await summarizeText(fullText);
      setSummary(generatedSummary);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummaryError('Sorry, we couldn\'t generate a summary at this time.');
    } finally {
      setIsSummarizing(false);
    }
  }, [post]);

  const handleCommentSubmitted = () => {
    setCommentSubmitted(c => c + 1);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Spinner /></div>;
  }

  if (!post) {
    return (
      <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold font-serif dark:text-white">Post not found</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">This post may have been removed or is awaiting approval.</p>
        <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
        <article className="bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-lg shadow-2xl animate-fade-in">
             {post.status === 'pending' && (
                <div className="mb-6 p-4 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-l-4 border-yellow-500 rounded-r-lg">
                    <strong>Note:</strong> This post is currently pending review and is not publicly visible.
                </div>
            )}
            <header className="mb-8 border-b dark:border-gray-700 pb-6">
                <div className="mb-4">
                <Link to={`/category/${post.category.toLowerCase()}`} className="text-sm font-semibold inline-block py-1 px-2.5 uppercase rounded-full text-blue-600 bg-blue-100 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/70 transition-colors">
                    {post.category}
                </Link>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900 dark:text-white mb-4">{post.title}</h1>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                <img src={post.author?.avatarUrl} alt={post.author?.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                    <span className="text-sm">By <Link to={`/author/${post.author?.id}`} className="font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">{post.author?.name}</Link></span>
                    <p className="text-sm">{post.date}</p>
                </div>
                </div>
            </header>
            
            <div className="prose prose-lg max-w-none dark:prose-invert prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-headings:font-serif prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:hover:underline">
                <img src={post.imageUrl} alt={post.title} className="rounded-lg mb-8 w-full shadow-md" />

                <div className="my-8 p-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-gray-700/50 rounded-r-lg shadow-md relative">
                <div className="absolute -left-5 top-6 bg-blue-500 text-white rounded-full p-2 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 ml-4">AI-Powered Summary</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 ml-4">Don't have time to read the full article? Get the key points!</p>
                {isSummarizing ? (
                    <div className="ml-4"><Spinner /></div>
                ) : (
                    <button
                    onClick={handleSummarize}
                    disabled={isSummarizing}
                    className="px-4 py-2 ml-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors transform hover:scale-105"
                    >
                    ✨ Generate Summary
                    </button>
                )}
                {summary && <div className="mt-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-sans border-t dark:border-gray-600 pt-4">{summary}</div>}
                {summaryError && <p className="mt-4 text-red-600 dark:text-red-400 ml-4">{summaryError}</p>}
                </div>

                {post.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
                ))}
                
                {post.content.length > 2 && (
                    <div className="my-8">
                        <AdPlaceholder />
                    </div>
                )}
            </div>
            
            <div className="mt-8 pt-6 border-t dark:border-gray-700">
              <SocialShareButtons post={post} />
            </div>

            {post.author && <AuthorBioBox author={post.author} />}
        </article>
        
        <section id="comments" className="mt-12 bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-lg shadow-2xl">
            <h2 className="text-3xl font-bold font-serif mb-6 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-4">Comments</h2>
            <CommentForm postId={post.id} onCommentSubmitted={handleCommentSubmitted} />
            <CommentList postId={post.id} key={commentSubmitted} />
        </section>
    </div>
  );
};

export default PostPage;