import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const CTABanner = () => {
  return (
    <section className="cta-banner container" style={{ padding: '8rem 0' }}>
      <motion.div 
        className="cta-inner"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="cta-text">
          <p className="head-sub" style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>EXCLUSIVE OPPORTUNITY</p>
          <h2 className="serif">Your Legacy <br />Starts Here</h2>
          <p>Book a private site tour and receive a personalized investment portfolio.</p>
        </div>
        <div className="cta-right">
          <motion.button 
            className="book-now-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ cursor: 'pointer' }}
          >
            Schedule Private Visit <ArrowRight size={20} />
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default CTABanner;
