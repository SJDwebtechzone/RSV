import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, BadgeCheck } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const SoldLeasedPage = () => {
  const [soldLeasedData, setSoldLeasedData] = useState(() => {
    const saved = localStorage.getItem('sold_leased_data');
    return saved ? JSON.parse(saved) : [];
  });
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFromAPI = async () => {
      try {
        const res = await fetch(`${API}/api/sold-leased`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setSoldLeasedData(data);
            localStorage.setItem('sold_leased_data', JSON.stringify(data));
          }
        }
      } catch (err) {
        console.error('Failed to fetch from API:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFromAPI();
  }, []);

  const stats = {
    total: soldLeasedData.length,
    sold: soldLeasedData.filter(d => d.transaction_type === 'Sold').length,
    leased: soldLeasedData.filter(d => d.transaction_type === 'Leased').length
  };

  const filteredData = soldLeasedData.filter(item => {
    const matchesSearch = 
      (item.project_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filterType === 'All' || 
      item.transaction_type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="sold-leased-page-detailed">

      {/* ===== Hero Banner — Same style as About/Contact pages ===== */}
      <section style={{ 
        height: '60vh', 
        position: 'relative', 
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <motion.div 
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop) center/cover no-repeat',
            zIndex: 0
          }}
        />
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(15,26,17,0.7), rgba(15,26,17,0.92))', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="serif" style={{ fontSize: 'var(--font-hero)', color: 'white', marginBottom: '1.5rem' }}>Sold & <span className="highlight">Leased.</span></h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 'var(--font-base)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.8 }}>
              Our track record speaks for itself. Browse through successfully completed property transactions by RSV Groups across Chennai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Stats Bar & Filters & Search ===== */}
      <section className="sl-filters-section" style={{ background: '#fdfcf0', borderBottom: '1px solid rgba(15, 26, 17, 0.08)' }}>
        <div className="container sl-filters-bar">
          {/* Filters */}
          <div className="sl-filter-tabs">
            <button 
              className={`sl-filter-tab ${filterType === 'All' ? 'active' : ''}`}
              onClick={() => setFilterType('All')}
            >
              All ({stats.total})
            </button>
            <button 
              className={`sl-filter-tab ${filterType === 'Sold' ? 'active' : ''}`}
              onClick={() => setFilterType('Sold')}
            >
              Sold ({stats.sold})
            </button>
            <button 
              className={`sl-filter-tab ${filterType === 'Leased' ? 'active' : ''}`}
              onClick={() => setFilterType('Leased')}
            >
              Leased ({stats.leased})
            </button>
          </div>

          {/* Search Box */}
          <div className="sl-search-wrap" style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid rgba(15,26,17,0.1)', borderRadius: '12px', padding: '6px 16px', minWidth: '300px' }}>
            <Search size={18} style={{ color: 'rgba(15,26,17,0.4)', marginRight: '10px' }} />
            <input 
              type="text" 
              placeholder="Search by project, location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: '0.9rem', color: '#0f1a11' }}
            />
          </div>
        </div>
      </section>

      {/* ===== Records Cards Section ===== */}
      <section className="sl-table-section" style={{ background: 'var(--primary-bg)', padding: '4rem 0 8rem 0' }}>
        <div className="container">
          {filteredData.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'rgba(15,26,17,0.4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <BadgeCheck size={48} style={{ opacity: 0.15, color: 'var(--accent-gold)' }} />
                <h3 className="serif" style={{ color: '#0f1a11', margin: 0, fontSize: '1.4rem' }}>No Records Found</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Check back later or refine your search filters.</p>
              </div>
            </div>
          ) : (
            <div className="sl-cards-grid">
              {filteredData.map((item) => (
                <div key={item.id} className="sl-card" style={{ opacity: 1, transform: 'translateY(0)' }}>
                  <div className="sl-card-header">
                    <span className={`sl-card-type ${item.transaction_type === 'Sold' ? 'sl-type-sold' : 'sl-type-leased'}`}>
                      {item.transaction_type}
                    </span>
                    <span className="sl-card-date">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Recent'}
                    </span>
                  </div>

                  <h3 className="sl-card-title serif" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.project_name}</h3>
                  
                  <div className="sl-card-location" style={{ marginBottom: '1.2rem' }}>
                    <MapPin size={16} style={{ color: 'var(--accent-gold)' }} />
                    <span style={{ color: 'var(--text-light)', fontWeight: 500 }}>{item.location}</span>
                  </div>

                  <div className="sl-card-details" style={{ padding: '1rem', background: '#faf9f4', borderRadius: '12px', marginBottom: '1.2rem' }}>
                    <div className="sl-card-detail">
                      <span className="sl-detail-label" style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontWeight: 700 }}>Area</span>
                      <span className="sl-detail-value" style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', fontWeight: 700 }}>{item.area_sqft}</span>
                    </div>
                    <div className="sl-card-detail">
                      <span className="sl-detail-label" style={{ fontSize: '0.65rem', color: 'var(--text-light)', fontWeight: 700 }}>Represented</span>
                      <span className="sl-detail-value" style={{ fontSize: '0.9rem', color: 'var(--primary-dark)', fontWeight: 600 }}>{item.represented}</span>
                    </div>
                  </div>

                  {item.description && (
                    <div className="sl-card-desc">
                      <span className="sl-detail-label" style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-light)', fontWeight: 700, marginBottom: '6px' }}>Description</span>
                      <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(15,26,17,0.7)', lineHeight: '1.6' }}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default SoldLeasedPage;
