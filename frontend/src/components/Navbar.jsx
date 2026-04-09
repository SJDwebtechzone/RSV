import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../images/LOGO.png';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Plots', id: 'plots' },
    { name: 'Locations', id: 'locations' },
    { name: 'Projects', id: 'projects' },
    { name: 'Amenities', id: 'amenities' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
      <div className="container nav-content">
        <div className="logo-section" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
          <img src={logoImg} alt="RSV GROUPS logo" className="navbar-logo" />
          <div className="brand-text">
            <span className="brand-main">RSV</span>
            <span className="brand-sub">GROUPS</span>
          </div>
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button 
                onClick={() => handleNavClick(link.id)}
                className={`nav-link-btn ${currentPage === link.id ? 'active' : ''}`}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button 
            className="book-btn hide-mobile"
            onClick={() => handleNavClick('book-visit')}
          >
            Book Site Visit
          </button>
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? (
              <X size={24} color={isScrolled ? "#0F1A11" : "white"} />
            ) : (
              <Menu size={24} color={isScrolled ? "#0F1A11" : "white"} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

