import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, Award, Gem, Target, Eye, ShieldCheck, HeartPulse } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { num: "10+", label: "Years Experience" },
    { num: "25+", label: "Projects Completed" },
    { num: "1500+", label: "Happy Customers" },
    { num: "500+", label: "Acres Developed" }
  ];

  return (
    <div className="about-page-detailed">
      {/* Hero Section */}
      <section className="about-hero" style={{ 
        height: '60vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        background: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000) center/cover no-repeat'
      }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: '5rem', color: 'white', marginBottom: '1.5rem' }}>Driven by <span className="highlight">Trust.</span></h1>
            <h2 className="serif" style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.8)' }}>Built on Transparency.</h2>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
          <div>
            <span className="badge-premium">Our Legacy</span>
            <h2 className="serif" style={{ fontSize: '3rem', margin: '2rem 0' }}>Redefining <span className="highlight">Real Estate</span> in Chennai</h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              For over a decade, RSV Groups has been at the forefront of the plotted development industry in Chennai. We believe that land is the most honest form of investment, and our mission is to make land ownership a seamless, secure, and rewarding experience for everyone.
            </p>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Our projects are selected after rigorous legal and geographical audits, ensuring that every square foot you buy from us holds maximum appreciation potential.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
             <img 
               src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
               alt="Modern Office" 
               style={{ width: '100%', borderRadius: '40px 0 40px 0', border: '1px solid #eee' }}
             />
             <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', background: 'var(--accent-gold)', padding: '3rem', borderRadius: '20px', color: 'var(--primary-dark)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <h3 className="serif" style={{ fontSize: '2.5rem' }}>10+</h3>
                <p style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Years of Excellence</p>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '8rem 0', background: 'var(--primary-dark)', color: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem', textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i}>
                <h3 className="serif" style={{ fontSize: '3.5rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>{stat.num}</h3>
                <p style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.6, fontSize: '0.8rem' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: '10rem 0', background: '#fcfcfc' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <motion.div 
               whileHover={{ y: -10 }}
               style={{ padding: '5rem', background: 'white', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', border: '1px solid #eee' }}
            >
               <Target size={48} color="var(--accent-gold)" style={{ marginBottom: '2rem' }} />
               <h3 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our <span className="highlight">Vision</span></h3>
               <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                 To be the most trusted and transparent real estate partner in India, empowering people to secure their future through high-value land investments.
               </p>
            </motion.div>
            <motion.div 
               whileHover={{ y: -10 }}
               style={{ padding: '5rem', background: 'white', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', border: '1px solid #eee' }}
            >
               <Eye size={48} color="var(--accent-gold)" style={{ marginBottom: '2rem' }} />
               <h3 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Our <span className="highlight">Mission</span></h3>
               <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                 To simplify the land-buying process by providing 100% verified properties, ensuring prime location selection, and delivering world-class infrastructure.
               </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <h2 className="serif" style={{ fontSize: '3.5rem' }}>The <span className="highlight">RSV Groups</span> Standard</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4rem' }}>
            {[
              { icon: <ShieldCheck size={32} />, title: "Verified Properties", desc: "Every project goes through a 50-point legal audit before it's offered to you." },
              { icon: <Award size={32} />, title: "Clear Documentation", desc: "No hidden clauses or surprises. We provide full legal clarity from Day 1." },
              { icon: <HeartPulse size={32} />, title: "Customer-First", desc: "Our relationship doesn't end at registration. We offer lifelong support." }
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                <h4 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '8rem 0', background: 'var(--accent-gold)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="serif" style={{ fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '2.5rem' }}>Want to know more about our journey?</h2>
          <button className="book-btn" style={{ background: 'var(--primary-dark)', color: 'white' }}>Contact Our Team</button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

