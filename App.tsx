
import React, { ReactNode } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import Chatbot from './components/chatbot/Chatbot';
import ScrollToTop from './components/ScrollToTop';
import AuthorPage from './pages/AuthorPage';
import CategoryPage from './pages/CategoryPage';
import CreatePostPage from './pages/SubmitPostPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }: { children: ReactNode, adminOnly?: boolean }) => {
    const { user, isAdmin } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    if (adminOnly && !isAdmin) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <ScrollToTop />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/author/:authorId" element={<AuthorPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route path="/create-post" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPage /></ProtectedRoute>} />

          {/* Legacy route redirect */}
          <Route path="/submit" element={<Navigate to="/create-post" replace />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;