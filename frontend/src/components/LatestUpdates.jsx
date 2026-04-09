import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const UpdateCard = ({ title, date, image, index }) => (
  <motion.div 
    className="update-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
  >
    <div className="update-img">
      <img src={image} alt={title} loading="lazy" />
    </div>
    <div className="update-content">
      <div className="date">
        <Calendar size={12} /> {date}
      </div>
      <h4 className="serif">{title}</h4>
      <button className="read-more" style={{ cursor: 'pointer' }}>
        Read Analysis <ArrowRight size={16} />
      </button>
    </div>
  </motion.div>
);

const LatestUpdates = () => {
  const updates = [
    { title: 'The Appreciation Corridor: Why OMR is Chennai’s Best Investment', date: 'JUNE 02, 2024', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop' },
    { title: 'Securing Your Legacy: The Importance of DTCP Approved Layouts', date: 'MAY 28, 2024', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop' },
    { title: 'From Soil to Sanctuary: Designing Your Future Home with Greenfield', date: 'MAY 15, 2024', image: 'https://images.pexels.com/photos/1109541/pexels-photo-1109541.jpeg?auto=compress&cs=tinysrgb&w=800' },
  ];

  return (
    <section className="latest-updates container">
      <motion.div 
        className="section-head"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="head-text">
          <div className="head-bar"></div>
          <p className="head-sub">MARKET INSIGHTS</p>
          <h2 className="section-title serif">The Greenfield <br />Journal</h2>
        </div>
        <button className="view-all-btn" style={{ cursor: 'pointer' }}>
          Explore All Articles <ArrowRight size={18} />
        </button>
      </motion.div>

      <div className="updates-grid">
        {updates.map((u, i) => <UpdateCard key={i} {...u} index={i} />)}
      </div>
    </section>
  );
};

export default LatestUpdates;
