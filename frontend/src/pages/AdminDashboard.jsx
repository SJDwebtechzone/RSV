import React, { useState, useEffect } from 'react';
import '../Admin.css';
import { 
  LayoutDashboard, 
  Map, 
  MapPin, 
  Users, 
  Layers, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUpRight,
  Search,
  Bell,
  LogOut,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../images/LOGO.png';
const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingProperties, setPendingProperties] = useState([]);

  useEffect(() => {
    const loadPending = () => {
      const props = JSON.parse(localStorage.getItem('user_properties') || '[]');
      setPendingProperties(props.filter(p => p.status === 'pending'));
    };
    loadPending();
  }, [activeTab]);

  const handleApprove = (id) => {
    const props = JSON.parse(localStorage.getItem('user_properties') || '[]');
    const updated = props.map(p => p.id === id ? { ...p, status: 'approved' } : p);
    localStorage.setItem('user_properties', JSON.stringify(updated));
    setPendingProperties(updated.filter(p => p.status === 'pending'));
  };

  const handleReject = (id) => {
    const props = JSON.parse(localStorage.getItem('user_properties') || '[]');
    const updated = props.map(p => p.id === id ? { ...p, status: 'rejected' } : p);
    localStorage.setItem('user_properties', JSON.stringify(updated));
    setPendingProperties(updated.filter(p => p.status === 'pending'));
  };

  const [plots, setPlots] = useState([
    { id: 1, name: "Premium Plot A1", location: "OMR, Chennai", price: "45L", size: "1200 Sq.ft", status: "Available", project: "The Royal Estate" },
    { id: 2, name: "Emerald Plot B4", location: "ECR, Chennai", price: "85L", size: "2400 Sq.ft", status: "Booked", project: "Emerald Valley" },
    { id: 3, name: "Heritage Plot C9", location: "GST Road", price: "32L", size: "1000 Sq.ft", status: "Available", project: "Heritage West" },
  ]);

  const [leads, setLeads] = useState([
    { id: 1, name: "Anish Kumar", phone: "+91 98765 43210", email: "anish@email.com", interest: "OMR Plots", status: "New", date: "2024-03-20" },
    { id: 2, name: "Priya Sharma", phone: "+91 87654 32109", email: "priya@email.com", interest: "ECR Luxury", status: "Contacted", date: "2024-03-19" },
    { id: 3, name: "Vikram Singh", phone: "+91 76543 21098", email: "vikram@email.com", interest: "Heritage West", status: "Sold", date: "2024-03-18" },
  ]);

  const [projects, setProjects] = useState([
    { id: 1, name: "The Royal Estate", location: "OMR, Chennai", units: "45/60", status: "Active" },
    { id: 2, name: "Emerald Valley", location: "ECR, Chennai", units: "12/24", status: "Limited" },
    { id: 3, name: "Heritage West", location: "GST Road", units: "10/10", status: "Sold Out" },
  ]);

  const [settings, setSettings] = useState({
    companyName: "RSV Groups",
    contactEmail: "info@rsvgroups.com",
    contactPhone: "+91 90000 00000",
    address: "Anna Salai, Chennai",
  });

  const filteredPlots = plots.filter(plot => 
    plot.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    plot.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plot.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: "Total Plots", value: plots.length, icon: <Map size={24}/>, trend: "+12%" },
    { label: "Active Leads", value: leads.length, icon: <Users size={24}/>, trend: "+5%" },
    { label: "Total Projects", value: projects.length, icon: <Layers size={24}/>, trend: "Stable" },
    { label: "Bookings", value: "24", icon: <ArrowUpRight size={24}/>, trend: "+18%" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return (
          <>
            <div className="admin-stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="admin-stat-card">
                  <h4>{stat.label}</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                     <span className="value">{stat.value}</span>
                     <span style={{ color: stat.trend.includes('+') ? '#2ed573' : 'white', fontSize: '0.8rem', fontWeight: 600 }}>{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="admin-table-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 className="serif" style={{ fontSize: '1.5rem' }}>Recent Plots</h3>
                <button className="book-btn" style={{ gap: '10px', fontSize: '0.8rem', padding: '0.8rem 1.5rem' }} onClick={() => setShowAddModal(true)}>
                  <Plus size={18} /> Add New Plot
                </button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Plot Name</th>
                    <th>Project</th>
                    <th>Location</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plots.slice(0, 5).map((plot) => (
                    <tr key={plot.id}>
                      <td style={{ fontWeight: 600 }}>{plot.name}</td>
                      <td>{plot.project}</td>
                      <td>{plot.location}</td>
                      <td style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{plot.price}</td>
                      <td><span className={`status-badge ${plot.status === 'Available' ? 'status-available' : 'status-booked'}`}>{plot.status}</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <Edit3 size={18} style={{ cursor: 'pointer', opacity: 0.6 }} />
                          <Trash2 size={18} style={{ cursor: 'pointer', opacity: 0.6, color: '#ff4757' }} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case 'Plots':
        return (
          <div className="admin-table-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 className="serif" style={{ fontSize: '1.5rem' }}>Inventory Management</h3>
              <button className="book-btn" style={{ gap: '10px', fontSize: '0.8rem', padding: '0.8rem 1.5rem' }} onClick={() => setShowAddModal(true)}>
                <Plus size={18} /> Add New Plot
              </button>
            </div>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Plot Name</th>
                  <th>Location</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plots.map((plot) => (
                  <tr key={plot.id}>
                    <td style={{ fontWeight: 600 }}>{plot.name}</td>
                    <td>{plot.location}</td>
                    <td>{plot.size}</td>
                    <td style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>{plot.price}</td>
                    <td><span className={`status-badge ${plot.status === 'Available' ? 'status-available' : 'status-booked'}`}>{plot.status}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <Edit3 size={18} style={{ cursor: 'pointer', opacity: 0.6 }} />
                        <Trash2 size={18} style={{ cursor: 'pointer', opacity: 0.6, color: '#ff4757' }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'Leads':
        return (
          <div className="admin-table-container">
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Customer Inquiries</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Interest</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td style={{ fontWeight: 600 }}>{lead.name}</td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{lead.phone}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{lead.email}</div>
                    </td>
                    <td>{lead.interest}</td>
                    <td>{lead.date}</td>
                    <td><span className={`status-badge ${lead.status === 'New' ? 'status-available' : 'status-booked'}`}>{lead.status}</span></td>
                    <td><Edit3 size={18} style={{ cursor: 'pointer', opacity: 0.6 }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'Projects':
        return (
          <div className="admin-table-container">
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Our Developments</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Location</th>
                  <th>Units Sold</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td style={{ fontWeight: 600 }}>{project.name}</td>
                    <td>{project.location}</td>
                    <td>{project.units}</td>
                    <td><span className={`status-badge ${project.status === 'Active' ? 'status-available' : 'status-booked'}`}>{project.status}</span></td>
                    <td><Edit3 size={18} style={{ cursor: 'pointer', opacity: 0.6 }} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'Settings':
        return (
          <div className="admin-table-container" style={{ maxWidth: '800px' }}>
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Configuration</h3>
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div className="admin-input-group">
                <label>Company Name</label>
                <input type="text" value={settings.companyName} onChange={(e) => setSettings({...settings, companyName: e.target.value})} />
              </div>
              <div className="admin-input-group">
                <label>Admin Email</label>
                <input type="email" value={settings.contactEmail} onChange={(e) => setSettings({...settings, contactEmail: e.target.value})} />
              </div>
              <div className="admin-input-group">
                <label>Support Phone</label>
                <input type="text" value={settings.contactPhone} onChange={(e) => setSettings({...settings, contactPhone: e.target.value})} />
              </div>
              <div className="admin-input-group">
                <label>Office Address</label>
                <textarea 
                  style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#fdfdfd', border: '1px solid #eee' }} 
                  value={settings.address} 
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                />
              </div>
              <button className="book-btn" style={{ width: 'fit-content', padding: '1rem 3rem' }}>Save Changes</button>
            </div>
          </div>
        );

      case 'Approvals':
        return (
          <div className="admin-table-container">
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Property Approvals</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingProperties.length === 0 ? (
                  <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>No pending properties at the moment.</td></tr>
                ) : pendingProperties.map((prop) => (
                  <tr key={prop.id || prop.title}>
                    <td style={{ fontWeight: 600 }}>{prop.title}</td>
                    <td>{prop.location}</td>
                    <td><span style={{ textTransform: 'capitalize' }}>{prop.type}</span></td>
                    <td>
                      <div>{prop.ownerName}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{prop.phone}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={() => handleApprove(prop.id)} style={{ background: '#288849', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Approve</button>
                        <button onClick={() => handleReject(prop.id)} style={{ background: '#d32f2f', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Reject</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar - Same as before ... */}
      <aside className="admin-sidebar">
        <div className="admin-logo" style={{ cursor: 'pointer', padding: '0 10px' }}>
           <img src={logo} alt="RSV Groups Logo" style={{ width: '100%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} />
        </div>
        <nav className="admin-nav">
          {[
            { id: 'Dashboard', icon: <LayoutDashboard size={20}/> },
            { id: 'Plots', icon: <Map size={20}/> },
            { id: 'Leads', icon: <Users size={20}/> },
            { id: 'Projects', icon: <Layers size={20}/> },
            { id: 'Approvals', icon: <CheckCircle size={20}/> },
            { id: 'Settings', icon: <Settings size={20}/> },
          ].map((item) => (
            <div 
              key={item.id} 
              className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon} {item.id}
            </div>
          ))}
        </nav>
        <div 
          style={{ marginTop: 'auto' }} 
          className="admin-nav-item"
          onClick={onLogout}
        >
          <LogOut size={20} /> Logout
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <h1 className="serif">{activeTab}</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>RSV Management Hub</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
               <input 
                 type="text" 
                 placeholder={`Search in ${activeTab}...`} 
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 style={{ 
                   background: 'rgba(15, 26, 17, 0.04)', 
                   border: '1px solid var(--admin-border)', 
                   padding: '12px 20px 12px 45px', 
                   borderRadius: '100px', 
                   color: 'var(--admin-text)', 
                   outline: 'none',
                   width: '300px'
                 }} 
               />
               <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text)', opacity: 0.5 }} />
            </div>
            <Bell size={24} style={{ color: 'var(--admin-text)', opacity: 0.5 }} />
            <div style={{ width: '45px', height: '45px', borderRadius: '50%', border: '2px solid white', background: 'url(https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100) center/cover' }}></div>
          </div>
        </header>

        {renderTabContent()}
      </main>

      {/* Add Plot Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="admin-modal"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
            >
              <h2 className="serif" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Add New <span className="highlight">Villa Plot</span></h2>
              <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="admin-input-group">
                  <label>Plot Name</label>
                  <input type="text" placeholder="e.g. Plot #102" />
                </div>
                <div className="admin-input-group">
                  <label>Project</label>
                  <select>
                    <option>The Royal Estate</option>
                    <option>Emerald Valley</option>
                    <option>Heritage West</option>
                  </select>
                </div>
                <div className="admin-input-group">
                  <label>Price</label>
                  <input type="text" placeholder="e.g. 45L" />
                </div>
                <div className="admin-input-group">
                  <label>Size (Sq.ft)</label>
                  <input type="text" placeholder="e.g. 1200" />
                </div>
                <div className="admin-input-group" style={{ gridColumn: 'span 2' }}>
                  <label>Image URL</label>
                  <input type="text" placeholder="https://unsplash.com/..." />
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', gap: '2rem', marginTop: '2rem' }}>
                  <button className="book-btn" style={{ flex: 1 }} onClick={(e) => { e.preventDefault(); setShowAddModal(false); }}>Add Property</button>
                  <button 
                    className="book-btn" 
                    style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
