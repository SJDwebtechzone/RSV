import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Heart, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % project.images.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [project.images.length]);

  return (
    <motion.div 
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="card-image">
        <AnimatePresence initial={false}>
          <motion.img 
            key={imgIndex}
            src={project.images[imgIndex]} 
            alt={project.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </AnimatePresence>
        <span className={`tag ${project.tag.toLowerCase()}`}>{project.tag}</span>
        <button className="heart-btn">
          <Heart size={18} />
        </button>
      </div>
      <div className="card-content">
        <h3 className="project-title serif">{project.title}</h3>
        <p className="project-location">
          <MapPin size={16} /> {project.location}
        </p>
        <div className="price-info">
          <span className="price">₹{project.price}<small className="sqft">/Sq.ft</small></span>
          <button className="view-all-btn" style={{ fontSize: '0.7rem' }}>
            DETAILS <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  const projects = [
    {
      title: 'Luxury Residential Villas',
      location: 'Thaiyur, OMR',
      price: '4,999',
      tag: 'Residential',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop'
      ]
    },
    {
      title: 'Prime Commercial Hub',
      location: 'Mahabalipuram, ECR',
      price: '6,499',
      tag: 'Commercial',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop'
      ]
    },
    {
      title: 'Premium Land Plots',
      location: 'West Tambaram',
      price: '3,999',
      tag: 'Land',
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2064&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1629851605336-f3ccb0eceb9e?q=80&w=2074&auto=format&fit=crop'
      ]
    }
  ];

  return (
    <section className="featured-projects" id="projects">
      <div className="container">
      <div className="section-head">
        <div className="head-left">
          <div className="head-bar"></div>
          <p className="head-sub">FEATURED DEVELOPMENTS</p>
          <h2 className="section-title serif">The Art of <br />Elite Living</h2>
        </div>
        <button className="view-all-btn">
          EXPLORE COLLECTION <ArrowRight size={20} />
        </button>
      </div>

      <div className="projects-grid">
        {projects.map((p, i) => <ProjectCard key={i} project={p} />)}
      </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
