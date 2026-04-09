import React from 'react';
import { motion } from 'framer-motion';
import { Building, Clock, ArrowRight, Download, ShieldCheck, LayoutGrid } from 'lucide-react';

const ProjectsPage = () => {
  const projects = [
    {
      name: "The Greenfield Signature",
      status: "Available",
      range: "₹45L - ₹95L",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
      highlights: ["40ft Main Road", "Solar Grid", "Parks"]
    },
    {
      name: "Heritage West",
      status: "Fast Filling",
      range: "₹32L - ₹65L",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
      highlights: ["DTCP Approved", "CCTV Security", "Drainage"]
    },
    {
      name: "Oceanic Breeze",
      status: "Sold Out",
      range: "₹85L - ₹2.5Cr",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      highlights: ["Luxury Lifestyle", "Beach Access", "Clubhouse"]
    }
  ];

  return (
    <div className="projects-page-detailed">
      {/* Hero Section */}
      <section className="projects-hero" style={{ 
        height: '60vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        background: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000) center/cover no-repeat'
      }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.8), rgba(15,26,17,0.95))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: '4.5rem', color: 'white', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Premium Projects <br /><span className="highlight">Designed for Value.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '600px' }}>
              From luxury gated communities to strategic investment layouts, our projects are the gold standard of real estate in Chennai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Cards Section */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container">
          <div className="projects-grid">
            {projects.map((project, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="project-card-luxury"
                style={{ background: 'white', border: '1px solid #eee', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', borderRadius: '20px', overflow: 'hidden' }}
              >
                <div style={{ position: 'relative', height: '350px' }}>
                  <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '20px', right: '20px', background: project.status === 'Sold Out' ? '#ff4757' : 'var(--accent-emerald)', color: 'white', padding: '5px 15px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {project.status}
                  </div>
                </div>
                <div style={{ padding: '3rem' }}>
                  <h3 className="serif" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>{project.name}</h3>
                  <p style={{ color: 'var(--accent-gold)', fontWeight: 700, fontSize: '1.2rem', marginBottom: '2rem' }}>{project.range}</p>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                    {project.highlights.map((h, j) => (
                      <span key={j} style={{ background: '#f5f5f5', padding: '6px 15px', borderRadius: '4px', fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600 }}>
                        {h}
                      </span>
                    ))}
                  </div>

                  <button className="view-all-btn" style={{ width: '100%', justifyContent: 'center', background: 'var(--primary-dark)', color: 'white', padding: '1rem', borderRadius: '4px' }}>
                    View Project Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Highlights (Icons) */}
      <section style={{ padding: '10rem 0', background: '#fcfcfc' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '5rem' }}>Project <span className="highlight">Excellence</span></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '3rem' }}>
            {[
              { icon: <ShieldCheck size={32} />, title: "DTCP Approved", desc: "Legal security guaranteed" },
              { icon: <Building size={32} />, title: "30-40 Ft Roads", desc: "Spacious commute" },
              { icon: <Clock size={32} />, title: "Solar Lights", desc: "24/7 sustainable lighting" },
              { icon: <LayoutGrid size={32} />, title: "Drainage System", desc: "Modern infrastructure" }
            ].map((item, i) => (
              <div key={i} className="highlight-item" style={{ padding: '3rem', background: 'white', border: '1px solid #eee', borderRadius: '20px' }}>
                <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem' }}>{item.icon}</div>
                <h4 className="serif" style={{ fontSize: '1.3rem', marginBottom: '0.75rem' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.85rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expandable / Detailed Section Placeholder */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ background: 'var(--primary-dark)', padding: '6rem', borderRadius: '40px', color: 'white' }}>
            <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Comprehensive <span className="highlight">Documentation</span></h2>
            <p style={{ maxWidth: '700px', margin: '0 auto 4rem', opacity: 0.7, fontSize: '1.1rem' }}>
              We believe in total transparency. Access layout plans, legal documents, and nearby facility guides for every project.
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <button className="book-btn" style={{ gap: '10px' }}><Download size={18} /> Download Brochure</button>
              <button className="book-btn" style={{ background: 'transparent', border: '1px solid white' }}>Legal Checklist</button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: '3.5rem', marginBottom: '5rem' }}>Trusted by <span className="highlight">Hundreds</span></h2>
          <div className="testimonial-grid">
            {[
              { quote: "Professional and transparent process.", author: "Arun Kumar, OMR" },
              { quote: "Excellent location and pricing.", author: "Priya S, Adyar" },
              { quote: "Legal documentation was crystal clear.", author: "Rajesh V, ECR" }
            ].map((t, i) => (
              <div key={i} style={{ padding: '3rem', background: 'white', border: '1px solid #eee', position: 'relative', textAlign: 'left' }}>
                <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '2rem', color: 'var(--text-light)' }}>"{t.quote}"</p>
                <div style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>{t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="cta-wide" style={{ background: 'var(--accent-gold)', padding: '6rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="serif" style={{ fontSize: '2.5rem', color: 'var(--primary-dark)' }}>Ready to secure your piece of Chennai?</h2>
          <button className="book-btn" style={{ background: 'var(--primary-dark)', border: 'none' }}>Book Your Visit</button>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;

