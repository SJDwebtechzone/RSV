import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Arjun Raghavan",
      role: "Luxury Homeowner",
      text: "The attention to detail in the layout and the transparency in the registration process was refreshing. Greenfield truly understands premium living.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Priya Sundar",
      role: "Investor",
      text: "I've invested in multiple plots across Chennai, but the infrastructure quality provided here is by far the best. A solid long-term asset.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Vikram Seth",
      role: "NRI Client",
      text: "Remote coordination was seamless. The team handled everything from site visits to documentation with absolute professionalism. Highly recommended.",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <motion.div 
          className="section-head"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '6rem', justifyContent: 'center', textAlign: 'center', flexDirection: 'column', alignItems: 'center' }}
        >
          <div className="head-bar"></div>
          <p className="head-sub">VOICES OF TRUST</p>
          <h2 className="section-title serif">The Greenfield Experience</h2>
        </motion.div>

        <div className="testimonial-grid">
          {reviews.map((r, i) => (
            <motion.div 
              key={i} 
              className="testimonial-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
            >
              <Quote size={40} className="quote-icon" />
              <p className="testimonial-text">"{r.text}"</p>
              <div className="user-profile">
                <div className="profile-img">
                  <img src={r.img} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="user-info">
                  <h5 className="serif">{r.name}</h5>
                  <p>{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
