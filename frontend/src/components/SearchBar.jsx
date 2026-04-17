import React, { useState } from 'react';
import { Search, MapPin, Ruler, Wallet } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [sqft, setSqft] = useState('');
  const [price, setPrice] = useState('');

  const handleSearch = () => {
    localStorage.setItem('home_search_filters', JSON.stringify({ location, sqft, price }));
    if (onSearch) onSearch();
  };

  return (
    <div className="search-bar-wrapper container">
      <div className="search-bar-inner">
        <div className="filter-item border-right">
          <div className="filter-text">
            <span>LOCATION corridor</span>
            <select className="serif" value={location} onChange={(e) => setLocation(e.target.value)} style={{ cursor: 'pointer' }}>
              <option value="">Select Destination</option>
              <option value="omr">OMR Corridor</option>
              <option value="ecr">ECR Coastal</option>
              <option value="tambaram">West Tambaram</option>
            </select>
          </div>
        </div>

        <div className="filter-item border-right">
          <div className="filter-text">
            <span>PLOT DIMENSIONS</span>
            <select className="serif" value={sqft} onChange={(e) => setSqft(e.target.value)} style={{ cursor: 'pointer' }}>
              <option value="">Any Dimension</option>
              <option value="1200">600 - 1200 Sq.ft</option>
              <option value="2400">1200 - 2400 Sq.ft</option>
              <option value="4800">2400 - 4800 Sq.ft</option>
            </select>
          </div>
        </div>

        <div className="filter-item">
          <div className="filter-text">
            <span>INVESTMENT RANGE</span>
            <select className="serif" value={price} onChange={(e) => setPrice(e.target.value)} style={{ cursor: 'pointer' }}>
              <option value="">Private Consultation</option>
              <option value="25-50">₹25L - ₹50L</option>
              <option value="50-100">₹50L - ₹1Cr</option>
              <option value="100-plus">₹1Cr +</option>
            </select>
          </div>
        </div>

        <button onClick={handleSearch} className="search-plots-btn" style={{ cursor: 'pointer' }}>
          <Search size={18} />
          <span>Find Estate</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
