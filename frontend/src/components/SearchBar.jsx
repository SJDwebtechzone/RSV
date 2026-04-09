import React from 'react';
import { Search, MapPin, Ruler, Wallet } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="search-bar-wrapper container">
      <div className="search-bar-inner">
        <div className="filter-item border-right">
          <div className="filter-text">
            <span>LOCATION corridor</span>
            <select className="serif" style={{ cursor: 'pointer' }}>
              <option>Select Destination</option>
              <option>OMR Corridor</option>
              <option>ECR Coastal</option>
              <option>West Tambaram</option>
            </select>
          </div>
        </div>

        <div className="filter-item border-right">
          <div className="filter-text">
            <span>PLOT DIMENSIONS</span>
            <select className="serif" style={{ cursor: 'pointer' }}>
              <option>Any Dimension</option>
              <option>600 - 1200 Sq.ft</option>
              <option>1200 - 2400 Sq.ft</option>
              <option>2400 - 4800 Sq.ft</option>
            </select>
          </div>
        </div>

        <div className="filter-item">
          <div className="filter-text">
            <span>INVESTMENT RANGE</span>
            <select className="serif" style={{ cursor: 'pointer' }}>
              <option>Private Consultation</option>
              <option>₹25L - ₹50L</option>
              <option>₹50L - ₹1Cr</option>
              <option>₹1Cr +</option>
            </select>
          </div>
        </div>

        <button className="search-plots-btn" style={{ cursor: 'pointer' }}>
          <Search size={18} />
          <span>Find Estate</span>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
