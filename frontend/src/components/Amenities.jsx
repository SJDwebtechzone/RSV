import React from 'react';
import { motion } from 'framer-motion';
import { Route, Zap, Droplets, Lock, Lamp, Trees, Filter, ShieldCheck } from 'lucide-react';

const AmenityItem = ({ icon: Icon, label, index }) => (
  <motion.div 
    className="amenity-item"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
  >
    <div className="icon-wrapper">
      <Icon size={20} />
    </div>
    <div className="amenity-text">
        <h4>{label}</h4>
        <p>Premium Quality</p>
    </div>
  </motion.div>
);

const Amenities = () => {
  const list = [
    { icon: Route, label: 'Standard Roads' },
    { icon: Zap, label: 'Power Ready' },
    { icon: Droplets, label: 'Pure Water' },
    { icon: Lock, label: 'Secure Gated' },
    { icon: Lamp, label: 'Solar Lights' },
    { icon: Trees, label: 'Estate Green' },
    { icon: Filter, label: 'Deep Drainage' },
    { icon: ShieldCheck, label: 'Live Security' },
  ];

  return (
    <section className="amenities" id="amenities">
      <div className="container">
      <div className="section-grid">
        <motion.div 
          className="amenities-left"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="head-bar"></div>
          <p className="head-sub">THE GOLD STANDARD</p>
          <h2 className="section-title serif">Elite <br />Infrastructure</h2>
          <div className="amenities-grid">
            {list.map((a, i) => <AmenityItem key={i} {...a} index={i} />)}
          </div>
        </motion.div>

        <motion.div 
          className="stats-right"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <p className="head-sub">A LEGACY OF TRUST</p>
          <h2 className="section-title serif">Built for <br />Generations</h2>
          <div className="stats-grid">
            {[
              { val: '10+', label: 'Years Of Mastery' },
              { val: '25+', label: 'Premium Estates' },
              { val: '1k+', label: 'Loyal Families' },
              { val: '100+', label: 'Acres Restored' }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                className="stat-card"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="serif">{s.val}</h3>
                <p>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Amenities;
