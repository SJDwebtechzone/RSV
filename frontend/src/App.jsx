import React, { useState, useEffect } from 'react';
import './App.css';

import Layout from './components/Layout';
import Home from './pages/Home';
import PlotsPage from './pages/PlotsPage';
import LocationsPage from './pages/LocationsPage';
import ProjectsPage from './pages/ProjectsPage';
import AmenitiesPage from './pages/AmenitiesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BookVisitPage from './pages/BookVisitPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import BuyPage from './pages/BuyPage';
import SellPage from './pages/SellPage';
import SoldLeasedPage from './pages/SoldLeasedPage';
const API = import.meta.env.VITE_API_URL;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    let path = '/';
    if (pageId === 'admin') {
      path = '/soldleased#admin';
    } else {
      const pageToPathMap = {
        'home': '/',
        'about': '/about',
        'contact': '/contact',
        'plots': '/plots',
        'locations': '/locations',
        'projects': '/projects',
        'amenities': '/amenities',
        'book-visit': '/book-visit',
        'sold-leased': '/soldleased',
      };
      path = pageToPathMap[pageId] || `/${pageId}`;
    }
    window.history.pushState(null, '', path);
  };

  // Handle scroll to top, URL path routing, and hash-based admin access
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // URL path routing
  useEffect(() => {
    const handlePath = () => {
      let path = window.location.pathname.replace('/', '').toLowerCase();
      const hash = window.location.hash;

      if (path === 'admin-dashboard') {
        window.history.replaceState(null, '', '/soldleased');
        path = 'soldleased';
      }

      if (hash === '#admin') {
        setCurrentPage('admin');
        return;
      }

      const pathMap = {
        '': 'home',
        'home': 'home',
        'about': 'about',
        'contact': 'contact',
        'plots': 'plots',
        'locations': 'locations',
        'projects': 'projects',
        'amenities': 'amenities',
        'book-visit': 'book-visit',
        'soldleased': 'sold-leased',
        'sold-leased': 'sold-leased',
        'buy': 'buy',
        'sell': 'sell',
      };

      if (pathMap[path]) {
        setCurrentPage(pathMap[path]);
      }
    };
    
    handlePath(); // Check on mount
    window.addEventListener('hashchange', handlePath);
    window.addEventListener('popstate', handlePath);
    return () => {
      window.removeEventListener('hashchange', handlePath);
      window.removeEventListener('popstate', handlePath);
    };
  }, []);

  const renderPage = () => {
    if (currentPage.startsWith('buy')) {
      const category = currentPage.split('-')[1] || 'all';
      return <BuyPage category={category} />;
    }
    
    if (currentPage.startsWith('sell')) {
      const category = currentPage.split('-')[1] || '';
      return <SellPage category={category} />;
    }

    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'plots':
        return <PlotsPage />;
      case 'locations':
        return <LocationsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'amenities':
        return <AmenitiesPage />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage />;
      case 'book-visit':
        return <BookVisitPage />;
      case 'sold-leased':
        return <SoldLeasedPage />;
      case 'admin':
        if (!isAdminAuthenticated) {
          return <AdminLogin 
            onLogin={() => setIsAdminAuthenticated(true)} 
            onBack={() => handleNavigate('home')}
          />;
        }
        return <AdminDashboard onLogout={() => {
          setIsAdminAuthenticated(false);
          handleNavigate('home');
        }} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      <Layout currentPage={currentPage} onNavigate={handleNavigate}>
        {renderPage()}
      </Layout>
    </div>
  );
}

export default App;

