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
          e.target.src = 'https://images.unsplash.com/photo-1541888052187-5735165dcba9?q=80&w=200';
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
    { name: 'OMR', plots: '120+', image: 'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?q=80&w=2070&auto=format&fit=crop' },
    { name: 'ECR', plots: '95+', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Tambaram', plots: '80+', image: 'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2010&auto=format&fit=crop' },
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
