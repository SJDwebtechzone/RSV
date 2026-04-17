import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Star, Users, MapPin, Target, Shield, TrendingUp, Award } from 'lucide-react';

const CareerPage = () => {
  const stats = [
    { num: "50+", label: "Elite Advisors" },
    { num: "₹500Cr+", label: "Assets Traded" },
    { num: "100%", label: "Meritocracy" },
    { num: "3", label: "Core Branches" }
  ];

  const jobs = [
    { title: "Senior Sales Executive", type: "Full Time", location: "OMR, Chennai", dept: "Sales" },
    { title: "Real Estate Manager", type: "Full Time", location: "ECR, Chennai", dept: "Management" },
    { title: "Investment Advisor", type: "Full Time", location: "Tambaram", dept: "Consulting" },
    { title: "Marketing Analyst", type: "Full Time", location: "Head Office", dept: "Marketing" }
  ];

  return (
    <div className="career-page-detailed">
      {/* Hero Section - Matched to AboutPage style */}
      <section className="career-hero" style={{ 
        height: '60vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        background: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000) center/cover no-repeat'
      }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: '5rem', color: 'white', marginBottom: '1.5rem' }}>Shape the <span className="highlight">Skyline.</span></h1>
            <h2 className="serif" style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.8)' }}>Forge Your Real Estate Legacy.</h2>
          </motion.div>
        </div>
      </section>

      {/* Career Overview - Matched to AboutPage 'Company Overview' */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
          <div>
            <span className="badge-premium">Life at RSV</span>
            <h2 className="serif" style={{ fontSize: '3rem', margin: '2rem 0' }}>A Network of <span className="highlight">Unrivaled Excellence</span></h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              At RSV Groups, you aren't just selling land; you're advising high-net-worth individuals, families, and corporations on secure, high-yield asset investments. Our reputation for zero-compromise legal audits and prime locations makes our portfolio the most coveted in Chennai.
            </p>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              We are seeking driven, sharp, and ethically grounded professionals. Whether you are a seasoned broker or a high-potential talent looking to enter the luxury market, we provide the mentorship, inventory, and brand power you need to close multi-million rupee deals.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
             <img 
               src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" 
               alt="Team Collaboration" 
               style={{ width: '100%', borderRadius: '40px 0 40px 0', border: '1px solid #eee' }}
             />
             <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', background: 'var(--accent-gold)', padding: '3rem', borderRadius: '20px', color: 'var(--primary-dark)', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <h3 className="serif" style={{ fontSize: '2.5rem' }}>Top 1%</h3>
                <p style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>Industry Performers</p>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Matched to AboutPage Stats */}
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

      {/* Career Values - Matched to AboutPage Vision/Mission */}
      <section style={{ padding: '10rem 0', background: '#fcfcfc' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            <motion.div 
               whileHover={{ y: -10 }}
               style={{ padding: '5rem', background: 'white', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', border: '1px solid #eee' }}
            >
               <TrendingUp size={48} color="var(--accent-gold)" style={{ marginBottom: '2rem' }} />
               <h3 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Uncapped <span className="highlight">Growth</span></h3>
               <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                 Your earning potential is tied directly to your ambition. With industry-leading commission structures, performance bonuses, and access to an exclusive inventory, your success has no ceiling.
               </p>
            </motion.div>
            <motion.div 
               whileHover={{ y: -10 }}
               style={{ padding: '5rem', background: 'white', borderRadius: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', border: '1px solid #eee' }}
            >
               <Shield size={48} color="var(--accent-gold)" style={{ marginBottom: '2rem' }} />
               <h3 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Absolute <span className="highlight">Integrity</span></h3>
               <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', lineHeight: 1.8 }}>
                 We sell peace of mind. As a representative of RSV Groups, you operate with absolute transparency. You'll never have to sell a property that lacks clear documentation or regulatory approvals.
               </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions Grid */}
      <section className="container" style={{ padding: '10rem 2rem' }}>
        <div className="section-head text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '6rem' }}>
          <div className="head-bar" style={{ marginBottom: '1.5rem' }}></div>
          <h2 className="section-title serif">Current <span className="highlight">Openings</span></h2>
          <p className="head-sub" style={{ marginTop: '1rem', color: 'var(--text-light)' }}>Find where your expertise aligns with our mission.</p>
        </div>

        <div className="jobs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {jobs.map((job, idx) => (
            <motion.div 
              key={idx} 
              className="glass-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              style={{ padding: '3rem', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div>
                <h3 className="serif" style={{ fontSize: '1.8rem', color: 'var(--primary-dark)', marginBottom: '0.5rem' }}>{job.title}</h3>
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-light)', fontSize: '0.9rem', marginTop: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Briefcase size={16} color="var(--accent-gold)"/> {job.dept}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={16} color="var(--accent-gold)"/> {job.location}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star size={16} color="var(--accent-gold)"/> {job.type}</span>
                </div>
              </div>
              <button className="book-btn" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Apply Now <ArrowRight size={14}/>
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA - Matched to AboutPage CTA */}
      <section style={{ padding: '8rem 0', background: 'var(--accent-gold)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="serif" style={{ fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '2.5rem' }}>Ready to redefine real estate with us?</h2>
          <button className="book-btn" style={{ background: 'var(--primary-dark)', color: 'white' }}>Send Your Resume</button>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
