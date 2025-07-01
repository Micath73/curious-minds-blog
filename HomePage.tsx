import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import BlogPostCard from '../components/BlogPostCard';
import RecentPostCard from '../components/RecentPostCard';
import AdPlaceholder from '../components/AdPlaceholder';
import BlogPostCardSkeleton from '../components/BlogPostCardSkeleton';
import { getPosts, getPostsByIds, getAllCategories } from '../services/blogService';
import type { Post } from '../types';
import { useAuth } from '../contexts/AuthContext';

const RECENTLY_VIEWED_KEY = 'recentlyViewedPosts';
const POSTS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Post[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [visiblePostsCount, setVisiblePostsCount] = useState(POSTS_PER_PAGE);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      
      const [fetchedPosts, fetchedCategories] = await Promise.all([
        getPosts(),
        getAllCategories()
      ]);
      
      setAllPosts(fetchedPosts);
      setCategories(['All', ...fetchedCategories]);

      const storedIds: string[] = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
      if (storedIds.length > 0) {
        const recentPostsData = await getPostsByIds(storedIds);
        setRecentlyViewed(recentPostsData);
      }

      // Simulate a slightly longer load time to showcase skeleton loaders
      setTimeout(() => setLoading(false), 500);
    };
    fetchAllData();
  }, []);
  
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') {
      return allPosts;
    }
    return allPosts.filter(post => post.category === activeCategory);
  }, [allPosts, activeCategory]);

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visiblePostsCount);
  }, [filteredPosts, visiblePostsCount]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisiblePostsCount(POSTS_PER_PAGE); // Reset pagination on category change
  }

  const loadMorePosts = () => {
    setVisiblePostsCount(prevCount => prevCount + POSTS_PER_PAGE);
  }

  if (loading) {
    return (
        <div className="space-y-16 animate-fade-in">
            {/* Skeleton for Category filters */}
            <div className="space-y-4">
                <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700/50 rounded-lg animate-pulse"></div>
                <div className="flex flex-wrap gap-3">
                    <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700/50 rounded-full animate-pulse"></div>
                    <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700/50 rounded-full animate-pulse"></div>
                    <div className="h-10 w-16 bg-gray-200 dark:bg-gray-700/50 rounded-full animate-pulse"></div>
                    <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700/50 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Skeleton for Posts grid */}
            <div>
                 <div className="h-8 w-56 bg-gray-200 dark:bg-gray-700/50 rounded-lg animate-pulse mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => <BlogPostCardSkeleton key={i} />)}
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="space-y-16 animate-fade-in">
      
      <section className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-fade-in">
          <h1 className="text-4xl font-bold font-serif mb-4 text-gray-900 dark:text-white">Welcome to Curious Minds</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              At Curious Minds, we believe that curiosity is the beginning of wisdom. Our platform is dedicated to uncovering fascinating insights from history, science, world cultures, and thought-provoking topics that matter to inquisitive readers like you.
          </p>
      </section>

      <section className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-lg shadow-inner text-center animate-fade-in" style={{animationDelay: '100ms'}}>
        {user ? (
            <>
                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4 text-gray-900 dark:text-white">
                    Welcome back, {user.name}!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                    Ready to share your insights? Contribute to our community by writing your own article.
                </p>
                {user.status === 'approved' ? (
                    <Link to="/create-post" className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105">
                        Create a Post
                    </Link>
                ) : (
                    <div className="inline-block px-8 py-3 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 font-semibold rounded-lg">
                        Your account is pending approval to create posts.
                    </div>
                )}
            </>
        ) : (
            <>
                <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4 text-gray-900 dark:text-white">
                    Join the Conversation
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                    Become a part of the Curious Minds community. Sign up to comment, create your own posts, and connect with other curious readers.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Link to="/signup" className="w-full sm:w-auto inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105">
                        Sign Up Now
                    </Link>
                    <Link to="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                        or Login
                    </Link>
                </div>
            </>
        )}
      </section>
      
      {recentlyViewed.length > 0 && (
        <section className="animate-fade-in" style={{animationDelay: '150ms'}}>
          <h2 className="text-3xl font-bold font-serif mb-6 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-4">Recently Viewed</h2>
          <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4">
            {recentlyViewed.map(post => (
              <RecentPostCard key={`recent-${post.id}`} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="animate-fade-in" style={{animationDelay: '200ms'}}>
        <h2 className="text-3xl font-bold font-serif mb-6 text-gray-800 dark:text-gray-100 border-b dark:border-gray-700 pb-4">Filter by Category</h2>
        <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                        activeCategory === category
                            ? 'bg-blue-600 text-white shadow-lg'
                            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
      </section>

      <AdPlaceholder className="my-8" />
      
      <section className="animate-fade-in" style={{animationDelay: '300ms'}}>
        <h2 className="text-3xl font-bold font-serif mb-8 text-gray-800 dark:text-gray-100">{activeCategory} Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post, index) => (
            <BlogPostCard 
              key={post.id} 
              post={post}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
        {visiblePosts.length === 0 && (
             <div className="text-center col-span-full py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h3 className="text-xl text-gray-500 dark:text-gray-400">No articles found in this category yet.</h3>
             </div>
        )}
        {visiblePosts.length < filteredPosts.length && (
          <div className="text-center mt-12">
            <button
              onClick={loadMorePosts}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              Load More Articles
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;