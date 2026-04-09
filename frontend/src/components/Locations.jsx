import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const LocationPill = ({ name, plots, image, index }) => (
  <motion.div 
    className="location-pill"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="pill-img">
      <img 
        src={image} 
        alt={name} 
        onError={(e) => {
          e.target.src = 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=200';
          e.target.onerror = null; 
        }}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
      />
    </div>
    <div className="pill-text">
      <h5 className="serif">{name} Corridor</h5>
      <p>{plots} EXCLUSIVE PLOTS</p>
    </div>
    <ArrowRight size={16} className="arrow" />
  </motion.div>
);

const Locations = () => {
  const locations = [
    { name: 'OMR', plots: '120+', image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'ECR', plots: '95+', image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Tambaram', plots: '80+', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=200' },
  ];

  return (
    <section className="popular-locations container">
      <motion.div 
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="head-text">
          <div className="head-bar"></div>
          <p className="head-sub">PRIME DESTINATIONS</p>
          <h2 className="section-title serif">The Most <br />Coveted Corridors</h2>
        </div>
        <button className="view-all-btn" style={{ cursor: 'pointer' }}>
          Explore Map <ArrowRight size={18} />
        </button>
      </motion.div>

      <div className="locations-scroll">
        {locations.map((l, i) => <LocationPill key={i} {...l} index={i} />)}
      </div>
    </section>
  );
};

export default Locations;
