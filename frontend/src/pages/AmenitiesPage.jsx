import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Shield, TreePine, Droplets, Waves, Zap, Leaf } from 'lucide-react';

const AmenitiesPage = () => {
  const amenities = [
    { icon: <div style={{ color: 'var(--accent-gold)' }}><Road size={40} /></div>, title: "Blacktop Roads", desc: "40ft & 30ft wide internal bitumen roads for smooth transit." },
    { icon: <div style={{ color: 'var(--accent-gold)' }}><Sun size={40} /></div>, title: "Solar Street Lights", desc: "Energy-efficient automatic solar lighting for all common areas." },
    { icon: <div style={{ color: 'var(--accent-gold)' }}><Shield size={40} /></div>, title: "CCTV Security", desc: "24/7 round-the-clock surveillance for a safe living environment." },
    { icon: <div style={{ color: 'var(--accent-gold)' }}><TreePine size={40} /></div>, title: "Parks & Spaces", desc: "Themed landscaped gardens and dedicated children's play zones." },
    { icon: <div style={{ color: 'var(--accent-gold)' }}><Droplets size={40} /></div>, title: "Water Supply", desc: "Individual water connections and dedicated overhead tanks." },
    { icon: <div style={{ color: 'var(--accent-gold)' }}><Waves size={40} /></div>, title: "Drainage", desc: "Modern underground drainage and sewage collection systems." }
  ];

  return (
    <div className="amenities-page-detailed">
      {/* Hero Section */}
      <section className="amenities-hero" style={{ 
        height: '60vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        background: 'url(https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat'
      }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: '5rem', color: 'white', marginBottom: '1.5rem' }}>Crafted for <br /><span className="highlight">Comfortable Living.</span></h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
              We don't just sell plots; we build infrastructure that enhances your quality of life from day one.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Amenities Grid */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <span className="badge-premium">Lifestyle Essentials</span>
            <h2 className="section-title serif">The <span className="highlight">Greenfield Advantage</span></h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>
            {amenities.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                style={{ padding: '3.5rem', background: 'white', border: '1px solid #eee', borderRadius: '40px', textAlign: 'center', transition: '0.3s' }}
              >
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h3 className="serif" style={{ fontSize: '1.6rem', marginBottom: '1.2rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle Banner */}
      <section style={{ padding: '8rem 0', background: 'var(--primary-dark)', color: 'white' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '2rem' }}>A Community Designed for <span className="highlight">Peace & Growth.</span></h2>
          <p style={{ opacity: 0.6, maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem' }}>
            Every Greenfield project is a masterclass in urban planning, ensuring a harmonious balance between modern amenities and natural serenity.
          </p>
        </div>
      </section>

      {/* Visual Section (Full Width Image) */}
      <section style={{ height: '70vh', position: 'relative', overflow: 'hidden' }}>
        <img 
          src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&q=80&w=1600" 
          alt="Greenery" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div className="container" style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: '3rem', borderRadius: '20px', display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)' }}>
                <h3 className="serif" style={{ fontSize: '2.5rem' }}>Landscaped Perfection</h3>
                <p style={{ marginTop: '1rem' }}>Walking paths & Greenery at every corner.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '10rem 0', background: '#f9f9f9' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
               {[
                 { title: "Safe for Families", icon: <Shield size={24} /> },
                 { title: "Clean Environment", icon: <Leaf size={24} /> },
                 { title: "Long-term Value", icon: <TrendingUp size={24} /> }
               ].map((benefit, i) => (
                 <div key={i} style={{ padding: '2.5rem', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                    <div style={{ color: 'var(--accent-gold)', marginBottom: '1rem' }}>{benefit.icon}</div>
                    <h4 style={{ fontWeight: 700 }}>{benefit.title}</h4>
                 </div>
               ))}
            </div>
            <div>
              <span className="badge-premium">Core Benefits</span>
              <h2 className="serif" style={{ fontSize: '3rem', margin: '2rem 0' }}>Thinking Beyond <span className="highlight">Infrastructure.</span></h2>
              <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '3rem' }}>
                We believe that the best amenities are the ones that blend seamlessly into your daily life. From the width of our roads to the type of light bulbs used, everything is chosen for sustainability and durability.
              </p>
              <button className="book-btn">View Projects with These Amenities</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Road = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
  </svg>
);

const TrendingUp = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);

export default AmenitiesPage;

