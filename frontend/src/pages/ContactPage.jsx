import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, Send } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="contact-page-detailed">
      {/* Hero Section */}
      <section className="contact-hero" style={{ 
        height: '50vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat'
      }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.6), rgba(15,26,17,0.9))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: '4.5rem', color: 'white' }}>We’re Here to <span className="highlight">Help You.</span></h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginTop: '1rem' }}>Get in touch with our experts for a personalized investment consultation.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section style={{ padding: '8rem 0', background: '#f9f9f9' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
            {[
              { icon: <Phone size={32} />, title: "Call Us", val: "+91 98765 43210", desc: "Available Mon-Sat, 9AM-7PM" },
              { icon: <Mail size={32} />, title: "Email Us", val: "info@greenfield.com", desc: "Expect a reply within 24 hours" },
              { icon: <MapPin size={32} />, title: "Visit Us", val: "Anna Nagar, Chennai", desc: "Our corporate headquarters" }
            ].map((card, i) => (
              <div key={i} style={{ padding: '3.5rem', background: 'white', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', textAlign: 'center', border: '1px solid #eee' }}>
                <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{card.icon}</div>
                <h3 className="serif" style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{card.title}</h3>
                <p style={{ fontWeight: 700, color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>{card.val}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8rem', alignItems: 'center' }}>
          <div>
            <span className="badge-premium">Get a Quote</span>
            <h2 className="serif" style={{ fontSize: '3.5rem', margin: '2rem 0' }}>Request <span className="highlight">Personalized</span> Details</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '3.5rem' }}>
              Whether you're looking for an immediate investment or a long-term villa plot, our team will help you find the right fit based on your budget and preferred location.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--accent-emerald)', fontWeight: 700 }}>
              <ShieldCheck size={24} /> <span>"We respond within 24 business hours"</span>
            </div>
          </div>
          <div style={{ background: 'white', padding: '5rem', borderRadius: '40px', boxShadow: '0 40px 100px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="input-group-modern">
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Full Name</label>
                  <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', font: 'inherit' }} />
                </div>
                <div className="input-group-modern">
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', font: 'inherit' }} />
                </div>
              </div>
              <div className="input-group-modern">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Preferred Location</label>
                <select style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', font: 'inherit', background: 'transparent' }}>
                  <option>OMR, Chennai</option>
                  <option>ECR, Chennai</option>
                  <option>GST Road, Chennai</option>
                  <option>Oragadam</option>
                </select>
              </div>
              <div className="input-group-modern">
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>Investment Budget</label>
                <select style={{ width: '100%', padding: '12px 0', border: 'none', borderBottom: '1px solid #ddd', outline: 'none', font: 'inherit', background: 'transparent' }}>
                  <option>25L - 50L</option>
                  <option>50L - 1Cr</option>
                  <option>Above 1Cr</option>
                </select>
              </div>
              <button 
                className="submit-btn" 
                style={{ marginTop: '2.5rem', background: 'var(--primary-dark)', color: 'white', padding: '1.2rem', fontWeight: 700, borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                onClick={(e) => e.preventDefault()}
              >
                <Send size={18} /> Send Inquiry
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section style={{ height: '500px', background: '#eee', position: 'relative' }}>
         <img 
           src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600" 
           alt="Map" 
           style={{ width: '100%', height: '100%', objectFit: 'cover' }}
         />
         <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,26,17,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '2rem 4rem', borderRadius: '10px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', textAlign: 'center' }}>
               <MapPin size={32} color="var(--accent-gold)" />
               <h3 className="serif" style={{ marginTop: '1rem' }}>Find Us on Google Maps</h3>
               <button style={{ marginTop: '1.5rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Get Directions</button>
            </div>
         </div>
      </section>

      {/* Quick Actions */}
      <section style={{ padding: '6rem 0', background: 'var(--primary-dark)', color: 'white' }}>
         <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: '4rem' }}>
            <button className="book-btn" style={{ gap: '12px' }}><Phone size={18} /> Call Now</button>
            <button className="book-btn" style={{ background: 'transparent', border: '1px solid #25D366', color: '#25D366', gap: '12px' }}>
               <MessageSquare size={18} /> WhatsApp Chat
            </button>
         </div>
      </section>
    </div>
  );
};

export default ContactPage;

