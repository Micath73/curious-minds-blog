
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import LogoIcon from './icons/LogoIcon';
import { getAllCategories } from '../services/blogService';
import ThemeToggleButton from './ThemeToggleButton';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getAllCategories().then(setCategories);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }): string =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white'
        : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
    }`;
  
  const mobileLinkClasses = `block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700`;

  const UserMenu = () => (
    <div className="relative">
      <button
        onMouseEnter={() => setIsUserMenuOpen(true)}
        onMouseLeave={() => setIsUserMenuOpen(false)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <span>{user?.name}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      {isUserMenuOpen && (
        <div 
            onMouseEnter={() => setIsUserMenuOpen(true)}
            onMouseLeave={() => setIsUserMenuOpen(false)}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 animate-fade-in border dark:border-gray-700"
        >
          {isAdmin && <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Admin</Link>}
          <Link to="/create-post" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Create Post</Link>
          <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">Logout</button>
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800 dark:text-white">
              <LogoIcon className="h-8 w-8 text-blue-600" />
              <div>
                <span className="font-serif">Curious Minds</span>
                <p className="text-xs font-sans text-gray-500 dark:text-gray-400">Where Curiosity Meets Discovery</p>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <nav className="flex items-baseline space-x-1">
              <NavLink to="/" className={navLinkClasses} end>Home</NavLink>
              <div className="relative">
                <button
                  onMouseEnter={() => setIsCategoryOpen(true)}
                  onMouseLeave={() => setIsCategoryOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 flex items-center"
                >
                  Categories
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {isCategoryOpen && (
                  <div 
                    onMouseEnter={() => setIsCategoryOpen(true)}
                    onMouseLeave={() => setIsCategoryOpen(false)}
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 animate-fade-in border dark:border-gray-700"
                  >
                    {categories.map(cat => (
                      <Link key={cat} to={`/category/${cat.toLowerCase()}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                        {cat}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <NavLink to="/about" className={navLinkClasses}>About</NavLink>
              <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
            </nav>
            <div className="pl-2 border-l border-gray-200 dark:border-gray-700 flex items-center space-x-2">
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClasses}>Login</NavLink>
                  <NavLink to="/signup" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">Sign Up</NavLink>
                </>
              )}
              <ThemeToggleButton />
            </div>
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggleButton />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileLinkClasses} onClick={()=>setIsMenuOpen(false)} end>Home</NavLink>
             {user ? (
               <>
                <NavLink to="/create-post" className={mobileLinkClasses} onClick={()=>setIsMenuOpen(false)}>Create Post</NavLink>
                {isAdmin && <NavLink to="/admin" className={mobileLinkClasses} onClick={()=>setIsMenuOpen(false)}>Admin</NavLink>}
               </>
             ) : (
               <>
                <NavLink to="/login" className={mobileLinkClasses} onClick={()=>setIsMenuOpen(false)}>Login</NavLink>
                <NavLink to="/signup" className={mobileLinkClasses} onClick={()=>setIsMenuOpen(false)}>Sign Up</NavLink>
               </>
             )}
            <div className="px-3 py-2 font-medium text-gray-500 dark:text-gray-400">Categories</div>
            {categories.map(cat => (
                <NavLink key={`mobile-${cat}`} to={`/category/${cat.toLowerCase()}`} className="block pl-6 pr-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700" onClick={()=>setIsMenuOpen(false)}>
                    {cat}
                </NavLink>
            ))}
            <NavLink to="/about" className={mobileLinkClasses} onClick={()=>setIsMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className={mobileLinkClasses} onClick={()=>setIsMenuOpen(false)}>Contact</NavLink>
            {user && <button onClick={() => {handleLogout(); setIsMenuOpen(false);}} className={`${mobileLinkClasses} w-full text-left`}>Logout</button>}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;