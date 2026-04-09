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
      title: 'The Emerald Corridor',
      location: 'Thaiyur, OMR',
      price: '4,999',
      tag: 'Luxury',
      images: [
        'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      title: 'The Coastal Enclave',
      location: 'Mahabalipuram, ECR',
      price: '6,499',
      tag: 'Elite',
      images: [
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    },
    {
      title: 'Tambaram Heights',
      location: 'West Tambaram',
      price: '3,999',
      tag: 'Prime',
      images: [
        'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=800'
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
