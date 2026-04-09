import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Car, Plane, Building2, ShieldCheck, ArrowRight, Info } from 'lucide-react';

const LocationsPage = () => {
  const locations = [
    {
      name: "OMR (Old Mahabalipuram Road)",
      tag: "High ROI Zone",
      desc: "The IT heart of Chennai with multi-national giants and world-class infrastructure.",
      hubs: "TCS, Infosys, CTS",
      travel: "20 mins to City",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "ECR (East Coast Road)",
      tag: "Premium Living",
      desc: "Scenic coastal stretch perfect for luxury villas and weekend retreats.",
      hubs: "Entertainment, Resorts",
      travel: "30 mins to Airport",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "GST Road",
      tag: "Industrial Hub",
      desc: "Fastest-growing corridor with massive industrial and commercial developments.",
      hubs: "SEZs, Manufacturing",
      travel: "15 mins to Airport",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="locations-page-detailed">
      {/* Hero Section */}
      <section className="locations-hero" style={{ 
        height: '60vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        background: 'url(https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat'
      }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.9))' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: '5rem', color: 'white', marginBottom: '1.5rem' }}>Strategic <span className="highlight">Locations.</span></h1>
            <h2 className="serif" style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.8)' }}>Strong Returns.</h2>
          </motion.div>
        </div>
      </section>

      {/* Location Cards */}
      <section style={{ padding: '10rem 0', background: '#f9f9f9' }}>
        <div className="container">
          <div className="section-head" style={{ marginBottom: '6rem', textAlign: 'center' }}>
            <span className="badge-premium">Investment Corridors</span>
            <h2 className="section-title serif">Prime <span className="highlight">Growth Hubs</span></h2>
          </div>

          <div className="projects-grid">
            {locations.map((loc, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -15 }}
                className="location-card-modern"
                style={{ background: 'white', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', borderRadius: '0 40px 0 40px' }}
              >
                <div style={{ height: '250px', background: `url(${loc.image}) center/cover` }} />
                <div style={{ padding: '3rem' }}>
                  <span style={{ background: 'rgba(31,58,36,0.05)', color: 'var(--accent-emerald)', padding: '5px 15px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {loc.tag}
                  </span>
                  <h3 className="serif" style={{ fontSize: '1.8rem', margin: '1.5rem 0', color: 'var(--primary-dark)' }}>{loc.name}</h3>
                  <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.8 }}>{loc.desc}</p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600 }}>
                      <Building2 size={18} color="var(--accent-gold)" /> {loc.hubs}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--primary-dark)', fontWeight: 600 }}>
                      <Car size={18} color="var(--accent-gold)" /> {loc.travel}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container">
          <div style={{ marginBottom: '5rem' }}>
            <h2 className="serif" style={{ fontSize: '3rem' }}>Location <span className="highlight">Comparison</span></h2>
            <p style={{ color: 'var(--text-light)' }}>Analyze ROI and connectivity metrics at a glance.</p>
          </div>

          <div style={{ overflowX: 'auto', background: 'white', borderRadius: '20px', boxShadow: '0 40px 100px rgba(0,0,0,0.05)', padding: '2rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--primary-dark)' }}>
                  <th style={{ padding: '2rem', fontSize: '1.1rem' }}>Location</th>
                  <th style={{ padding: '2rem', fontSize: '1.1rem' }}>Growth Rate</th>
                  <th style={{ padding: '2rem', fontSize: '1.1rem' }}>Connectivity</th>
                  <th style={{ padding: '2rem', fontSize: '1.1rem' }}>Ideal For</th>
                  <th style={{ padding: '2rem', fontSize: '1.1rem' }}>ROI Projection</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "OMR", growth: "Very High", connect: "Excellent", for: "IT Professionals", roi: "15-18%" },
                  { name: "ECR", growth: "Premium", connect: "Good", for: "Luxury Living", roi: "10-12%" },
                  { name: "GST", growth: "Fast Growing", connect: "Strong", for: "Investors", roi: "12-15%" },
                  { name: "Oragadam", growth: "Industrial", connect: "Rising", for: "Mid-Term Inv", roi: "14-20%" }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #eee', transition: '0.3s' }}>
                    <td style={{ padding: '2rem', fontWeight: 700, color: 'var(--primary-dark)' }}>{row.name}</td>
                    <td style={{ padding: '2rem' }}><span style={{ color: '#2d5a27', fontWeight: 600 }}>{row.growth}</span></td>
                    <td style={{ padding: '2rem' }}>{row.connect}</td>
                    <td style={{ padding: '2rem' }}>{row.for}</td>
                    <td style={{ padding: '2rem' }}><TrendingUp size={16} color="var(--accent-gold)" style={{ marginRight: '8px' }} /> {row.roi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Map + Heat Zones Placeholder */}
      <section style={{ padding: '10rem 0', background: 'var(--primary-dark)', color: 'white' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 className="serif" style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>Demand <span className="highlight">Heat Zones</span></h2>
            <p style={{ opacity: 0.7, fontSize: '1.1rem', marginBottom: '3rem', lineHeight: 1.8 }}>
              Discover where the market is moving. Our heat zone mapping identifies areas with high demand, planned infrastructure, and upcoming residential developments.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { label: "Proximity to Metro Phase 2", val: "High Impact" },
                { label: "New IT Park Developments", val: "Market Driver" },
                { label: "Upcoming Multi-specialty Hospitals", val: "Lifestyle Value" }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                  <span style={{ fontWeight: 500 }}>{item.label}</span>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', height: '500px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
             <img 
               src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
               alt="Map Graphic" 
               style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
             />
             <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <MapPin size={48} color="var(--accent-gold)" />
                  <p style={{ marginTop: '1rem', fontWeight: 700, letterSpacing: '2px' }}>INTERACTIVE MAP UI</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Customer Confidence Section */}
      <section style={{ padding: '10rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="badge-premium">Expert Insight</span>
          <h2 className="serif" style={{ fontSize: '3.5rem', margin: '2rem 0' }}>Why <span className="highlight">Location</span> Matters</h2>
          <p style={{ maxWidth: '800px', margin: '0 auto 5rem', color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: 1.8 }}>
            Real estate is not just about the land; it's about what's around it. Connectivity to IT hubs, proximity to the airport, and access to luxury healthcare are the primary drivers of appreciation. We only select sites that pass our rigorous 50-point location audit.
          </p>
          <button className="book-btn" style={{ background: 'var(--primary-dark)', color: 'white' }}>
            Explore Available Plots in These Areas
          </button>
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;

