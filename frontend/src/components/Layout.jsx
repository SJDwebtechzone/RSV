import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, onNavigate, currentPage }) => {
  const isAdminPage = currentPage === 'admin';

  return (
    <div className="layout">
      {!isAdminPage && <Navbar onNavigate={onNavigate} currentPage={currentPage} />}
      <main>{children}</main>
      {!isAdminPage && <Footer onNavigate={onNavigate} />}
      
      {/* Sticky Book Visit Button */}
      {!isAdminPage && currentPage !== 'book-visit' && (
        <button 
          className="sticky-visit-btn"
          onClick={() => onNavigate('book-visit')}
        >
          Book Site Visit
        </button>
      )}
    </div>
  );
};

export default Layout;
