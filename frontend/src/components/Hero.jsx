import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, User, Phone, MapPin, Calendar, ArrowRight } from 'lucide-react';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549439602-43ebca2327af?q=80&w=2070&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Updated to 5 seconds
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="hero">
      <div className="hero-bg-overlay"></div>

      <AnimatePresence mode='wait'>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt="Luxury Estate"
          className="hero-image"
          initial={{ opacity: 0, scale: 1.1, x: 20 }}
          animate={{ opacity: 0.85, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 1.05, x: -20 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>

      <div className="container hero-content">
        <motion.div
          className="hero-text-side"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="badge-premium" variants={itemVariants} style={{ marginTop: '5.0rem' }}>
            SIGNATURE COLLECTION
          </motion.div>

          <motion.h1 variants={itemVariants} style={{ fontSize: '7rem' }}>
            Legacy, <br />
            <span className="highlight">Defined.</span>
          </motion.h1>

          <motion.p className="hero-desc" variants={itemVariants}>
            An exclusive collection of signature villa plots nestled within Chennai’s most coveted elite corridors. Designed for those who demand nothing less than architectural perfection.
          </motion.p>

          <motion.div
            className="hero-parameters"
            variants={itemVariants}
            style={{ display: 'flex', gap: '3.5rem', marginTop: '2.5rem', opacity: 0.95 }}
          >
            <div style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '3px' }}>EXCLUSIVITY</p>
              <p className="serif" style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '0.5px' }}>Member Only Estates</p>
            </div>
            <div style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '3px' }}>AUTHENTICITY</p>
              <p className="serif" style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '0.5px' }}>Verified Lineage</p>
            </div>
            <div style={{ borderLeft: '2px solid var(--accent-gold)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 800, letterSpacing: '3px' }}>INVESTMENT</p>
              <p className="serif" style={{ color: 'white', fontSize: '1.2rem', letterSpacing: '0.5px' }}>High Appreciation</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="enquiry-card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <h4 className="serif" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Site Inquiry</h4>
          <p style={{ fontSize: '0.8rem', marginBottom: '1.5rem' }}>Schedule your private consultation.</p>

          <form>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <User size={16} className="input-icon" />
              <input type="text" placeholder="Name" style={{ fontSize: '0.9rem' }} />
            </div>
            <div className="input-group" style={{ marginBottom: '1rem' }}>
              <Phone size={16} className="input-icon" />
              <input type="text" placeholder="Contact" style={{ fontSize: '0.9rem' }} />
            </div>
            <div className="input-group" style={{ marginBottom: '1.5rem' }}>
              <MapPin size={16} className="input-icon" />
              <select style={{ fontSize: '0.9rem' }}>
                <option>Select Region</option>
                <option>OMR Corridor</option>
                <option>ECR Coastal</option>
                <option>West Tambaram</option>
              </select>
            </div>
            <button type="submit" className="submit-btn" style={{ cursor: 'pointer', padding: '1rem' }}>
              Submit <ArrowRight size={16} style={{ marginLeft: '8px' }} />
            </button>
          </form>
        </motion.div>
      </div>

      <motion.div
        className="floating-book-badge"
        initial={{ y: "-50%", x: 100 }}
        animate={{ y: "-50%", x: 0 }}
        transition={{ type: "spring", stiffness: 80, delay: 1 }}
      >
        <Calendar size={18} style={{ marginBottom: '8px' }} />
        <span style={{ fontSize: '0.65rem', letterSpacing: '2px' }}>BOOK TOUR</span>
      </motion.div>
    </section>
  );
};

export default Hero;
