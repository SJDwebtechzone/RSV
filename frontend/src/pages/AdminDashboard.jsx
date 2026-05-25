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
  CheckCircle,
  BadgeCheck,
  TrendingUp,
  Handshake,
  X,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../images/LOGO.png';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Default sample data - always available
const DEFAULT_SOLD_LEASED = [
  ];

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSoldModal, setShowSoldModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pendingProperties, setPendingProperties] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [editingItem, setEditingItem] = useState(null);

  // Initialize with default data directly, trying localStorage first
  const [soldLeasedData, setSoldLeasedData] = useState(() => {
    const saved = localStorage.getItem('sold_leased_data');
    return saved ? JSON.parse(saved) : DEFAULT_SOLD_LEASED;
  });

  // Sold/Leased form state
  const [soldForm, setSoldForm] = useState({
    project_name: '',
    location: '',
    area_sqft: '',
    transaction_type: 'Sold',
    represented: 'Both Buyer & Seller',
    description: ''
  });

  // Compute stats from current data
  const soldLeasedStats = {
    total: soldLeasedData.length,
    sold: soldLeasedData.filter(d => d.transaction_type === 'Sold').length,
    leased: soldLeasedData.filter(d => d.transaction_type === 'Leased').length
  };

  useEffect(() => {
    const loadPending = () => {
      const props = JSON.parse(localStorage.getItem('user_properties') || '[]');
      setPendingProperties(props.filter(p => p.status === 'pending'));
    };
    loadPending();
  }, [activeTab]);

  // Try to fetch from API on mount, fallback to localStorage, and update localStorage when API succeeds
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
        const saved = localStorage.getItem('sold_leased_data');
        if (saved) {
          setSoldLeasedData(JSON.parse(saved));
        }
      }
    };
    fetchFromAPI();
  }, []);

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

  // ===== Sold/Leased CRUD =====
  const handleAddSoldLeased = (e) => {
    e.preventDefault();
    const newItem = {
      ...soldForm,
      id: Date.now()
    };
    setSoldLeasedData(prev => {
      const updated = [newItem, ...prev];
      localStorage.setItem('sold_leased_data', JSON.stringify(updated));
      return updated;
    });

    // Also try API
    try {
      fetch(`${API}/api/sold-leased`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(soldForm)
      }).catch(() => {});
    } catch (err) {}

    setShowSoldModal(false);
    resetSoldForm();
  };

  const handleEditSoldLeased = (e) => {
    e.preventDefault();
    const updatedForm = { ...soldForm };
    setSoldLeasedData(prev => {
      const updated = prev.map(d => 
        d.id === editingItem.id ? { ...d, ...updatedForm } : d
      );
      localStorage.setItem('sold_leased_data', JSON.stringify(updated));
      return updated;
    });

    // Also try API
    try {
      fetch(`${API}/api/sold-leased/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(soldForm)
      }).catch(() => {});
    } catch (err) {}

    setEditingItem(null);
    setShowSoldModal(false);
    resetSoldForm();
  };

  const handleDeleteSoldLeased = (id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    setSoldLeasedData(prev => {
      const updated = prev.filter(d => d.id !== id);
      localStorage.setItem('sold_leased_data', JSON.stringify(updated));
      return updated;
    });

    // Also try API
    try {
      fetch(`${API}/api/sold-leased/${id}`, { method: 'DELETE' }).catch(() => {});
    } catch (err) {}
  };

  const resetSoldForm = () => {
    setSoldForm({
      project_name: '', location: '', area_sqft: '', transaction_type: 'Sold',
      represented: 'Both Buyer & Seller', description: ''
    });
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setSoldForm({
      project_name: item.project_name || '',
      location: item.location || '',
      area_sqft: item.area_sqft || '',
      transaction_type: item.transaction_type || 'Sold',
      represented: item.represented || 'Both Buyer & Seller',
      description: item.description || ''
    });
    setShowSoldModal(true);
  };

  const formatCurrency = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '₹0';
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
    return `₹${num.toLocaleString('en-IN')}`;
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

  const filteredSoldLeased = soldLeasedData.filter(item => {
    const matchesSearch = 
      (item.project_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.area_sqft || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'All' || item.transaction_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Plots", value: plots.length, icon: <Map size={24}/>, trend: "+12%" },
    { label: "Active Leads", value: leads.length, icon: <Users size={24}/>, trend: "+5%" },
    { label: "Total Projects", value: projects.length, icon: <Layers size={24}/>, trend: "Stable" },
    { label: "Sold / Leased", value: soldLeasedStats.total, icon: <BadgeCheck size={24}/>, trend: `+${soldLeasedStats.sold} sold` },
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

            {/* Recent Sold/Leased on Dashboard */}
            <div className="admin-table-container" style={{ marginTop: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 className="serif" style={{ fontSize: '1.5rem' }}>Recent Sold / Leased</h3>
                <button 
                  className="book-btn" 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', padding: '0.8rem 1.5rem' }} 
                  onClick={() => setActiveTab('Sold Leased')}
                >
                  View All <ArrowUpRight size={16} />
                </button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Location</th>
                    <th>Area</th>
                    <th>Type</th>
                    <th>Represented</th>
                  </tr>
                </thead>
                <tbody>
                  {soldLeasedData.slice(0, 3).map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 600 }}>{item.project_name}</td>
                      <td>{item.location}</td>
                      <td>{item.area_sqft}</td>
                      <td>
                        <span className={`status-badge ${item.transaction_type === 'Sold' ? 'status-sold' : 'status-leased'}`}>
                          {item.transaction_type}
                        </span>
                      </td>
                      <td><span className="represented-badge">{item.represented}</span></td>
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

      case 'Sold Leased':
        return (
          <>
            {/* Sold Leased Banner */}
            <div className="sold-leased-banner">
              <div className="sold-banner-bg"></div>
              <div className="sold-banner-content">
                <div className="sold-banner-left">
                  <div className="sold-banner-badge">
                    <BadgeCheck size={16} /> SOLD & LEASED RECORDS
                  </div>
                  <h2 className="serif sold-banner-title">
                    Successful <span className="highlight">Transactions</span>
                  </h2>
                  <p className="sold-banner-desc">
                    Track all completed property deals — from premium plots to commercial spaces. RSV Groups delivering trust and results.
                  </p>
                </div>
                <div className="sold-banner-stats">
                  <div className="sold-mini-stat">
                    <div className="sold-mini-icon"><TrendingUp size={20} /></div>
                    <div>
                      <span className="sold-mini-value">{soldLeasedStats.sold}</span>
                      <span className="sold-mini-label">Properties Sold</span>
                    </div>
                  </div>
                  <div className="sold-mini-stat">
                    <div className="sold-mini-icon sold-mini-icon-leased"><Handshake size={20} /></div>
                    <div>
                      <span className="sold-mini-value">{soldLeasedStats.leased}</span>
                      <span className="sold-mini-label">Properties Leased</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter & Actions Bar */}
            <div className="sold-actions-bar">
              <div className="sold-filter-group">
                <button 
                  className={`sold-filter-btn ${filterType === 'All' ? 'active' : ''}`} 
                  onClick={() => setFilterType('All')}
                >All ({soldLeasedStats.total})</button>
                <button 
                  className={`sold-filter-btn ${filterType === 'Sold' ? 'active' : ''}`} 
                  onClick={() => setFilterType('Sold')}
                >Sold ({soldLeasedStats.sold})</button>
                <button 
                  className={`sold-filter-btn ${filterType === 'Leased' ? 'active' : ''}`} 
                  onClick={() => setFilterType('Leased')}
                >Leased ({soldLeasedStats.leased})</button>
              </div>
              <button 
                className="book-btn sold-add-btn" 
                onClick={() => { resetSoldForm(); setEditingItem(null); setShowSoldModal(true); }}
              >
                <Plus size={18} /> Add Record
              </button>
            </div>

            {/* Sold Leased Table */}
            <div className="admin-table-container sold-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Location</th>
                    <th>Area</th>
                    <th>Type</th>
                    <th>Represented</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSoldLeased.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                          <BadgeCheck size={48} style={{ opacity: 0.2 }} />
                          <span>No records found. Add your first sold/leased property!</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredSoldLeased.map((item) => (
                    <tr key={item.id} className="sold-table-row">
                      <td style={{ fontWeight: 700 }}>{item.project_name}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                          <span>{item.location}</span>
                        </div>
                      </td>
                      <td style={{ fontWeight: 600 }}>{item.area_sqft}</td>
                      <td>
                        <span className={`status-badge ${item.transaction_type === 'Sold' ? 'status-sold' : 'status-leased'}`}>
                          {item.transaction_type}
                        </span>
                      </td>
                      <td>
                        <span className="represented-badge">{item.represented}</span>
                      </td>
                      <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.85rem', color: '#777' }}>
                        {item.description || '-'}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <button onClick={() => { setViewItem(item); setShowViewModal(true); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} title="View">
                            <Eye size={17} style={{ color: 'var(--accent-gold)' }} />
                          </button>
                          <button onClick={() => openEditModal(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} title="Edit">
                            <Edit3 size={17} style={{ color: '#555' }} />
                          </button>
                          <button onClick={() => handleDeleteSoldLeased(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }} title="Delete">
                            <Trash2 size={17} style={{ color: '#ff4757' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
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

      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
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
            { id: 'Sold Leased', icon: <BadgeCheck size={20}/> },
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

      {/* ===== Add/Edit Sold Leased Modal ===== */}
      <AnimatePresence>
        {showSoldModal && (
          <motion.div 
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSoldModal(false)}
          >
            <motion.div 
              className="admin-modal sold-modal"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="sold-modal-close" onClick={() => setShowSoldModal(false)}>
                <X size={20} />
              </button>
              <h2 className="serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                {editingItem ? 'Edit' : 'Add New'} <span className="highlight">Sold / Leased</span> Record
              </h2>
              <p style={{ color: '#999', marginBottom: '2rem', fontSize: '0.9rem' }}>Fill in all the transaction details below</p>
              
              <form onSubmit={editingItem ? handleEditSoldLeased : handleAddSoldLeased}>
                <div className="sold-form-grid">
                  {/* Row 1 */}
                  <div className="admin-input-group">
                    <label>Project Name *</label>
                    <input type="text" placeholder="e.g. RSV Nagar Phase 1" value={soldForm.project_name} onChange={(e) => setSoldForm({...soldForm, project_name: e.target.value})} required />
                  </div>
                  <div className="admin-input-group">
                    <label>Location *</label>
                    <input type="text" placeholder="e.g. Kundrathur Rajagopal Nagar" value={soldForm.location} onChange={(e) => setSoldForm({...soldForm, location: e.target.value})} required />
                  </div>

                  {/* Row 2 */}
                  <div className="admin-input-group">
                    <label>Area (Sq.ft)</label>
                    <input type="text" placeholder="e.g. 600 - 2400 sqft" value={soldForm.area_sqft} onChange={(e) => setSoldForm({...soldForm, area_sqft: e.target.value})} />
                  </div>
                  <div className="admin-input-group">
                    <label>Transaction Type</label>
                    <select value={soldForm.transaction_type} onChange={(e) => setSoldForm({...soldForm, transaction_type: e.target.value})}>
                      <option value="Sold">Sold</option>
                      <option value="Leased">Leased</option>
                    </select>
                  </div>

                  {/* Row 3 */}
                  <div className="admin-input-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Represented</label>
                    <select value={soldForm.represented} onChange={(e) => setSoldForm({...soldForm, represented: e.target.value})}>
                      <option value="Both Buyer & Seller">Both Buyer & Seller</option>
                      <option value="Buyer">Buyer Only</option>
                      <option value="Seller">Seller Only</option>
                    </select>
                  </div>

                  {/* Full width description */}
                  <div className="admin-input-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Description</label>
                    <textarea 
                      style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: '#fdfdfd', border: '1px solid #eee', minHeight: '90px', fontFamily: 'Outfit, sans-serif', resize: 'vertical', fontSize: '0.95rem' }}
                      placeholder="e.g. Sold Out! 600 sqft to 2400 sqft Land in Kundrathur..."
                      value={soldForm.description} 
                      onChange={(e) => setSoldForm({...soldForm, description: e.target.value})} 
                    />
                  </div>

                  {/* Buttons */}
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                    <button type="submit" className="book-btn" style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <BadgeCheck size={18} />
                      {editingItem ? 'Update Record' : 'Add Record'}
                    </button>
                    <button 
                      type="button"
                      className="book-btn" 
                      style={{ flex: 1, background: 'transparent', border: '1px solid #ddd', color: '#666', padding: '1rem' }}
                      onClick={() => { setShowSoldModal(false); setEditingItem(null); resetSoldForm(); }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== View Detail Modal ===== */}
      <AnimatePresence>
        {showViewModal && viewItem && (
          <motion.div 
            className="admin-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowViewModal(false)}
          >
            <motion.div 
              className="admin-modal sold-view-modal"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="sold-modal-close" onClick={() => setShowViewModal(false)}>
                <X size={20} />
              </button>
              
              <div className="sold-view-header">
                <span className={`status-badge ${viewItem.transaction_type === 'Sold' ? 'status-sold' : 'status-leased'}`} style={{ fontSize: '0.85rem', padding: '8px 20px' }}>
                  {viewItem.transaction_type}
                </span>
                <h2 className="serif" style={{ fontSize: '1.8rem', marginTop: '1rem' }}>{viewItem.project_name}</h2>
                <p style={{ color: 'var(--accent-gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '0.5rem' }}>
                  <MapPin size={16} /> {viewItem.location}
                </p>
              </div>

              <div className="sold-view-grid">
                <div className="sold-view-item">
                  <span className="sold-view-label">Area</span>
                  <span className="sold-view-value">{viewItem.area_sqft}</span>
                </div>
                <div className="sold-view-item">
                  <span className="sold-view-label">Transaction Type</span>
                  <span className="sold-view-value">{viewItem.transaction_type}</span>
                </div>
                <div className="sold-view-item">
                  <span className="sold-view-label">Represented</span>
                  <span className="sold-view-value">{viewItem.represented}</span>
                </div>
              </div>

              {viewItem.description && (
                <div className="sold-view-desc">
                  <span className="sold-view-label">Description</span>
                  <p style={{ marginTop: '0.5rem', lineHeight: 1.7, color: '#555' }}>{viewItem.description}</p>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button className="book-btn" style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} onClick={() => { setShowViewModal(false); openEditModal(viewItem); }}>
                  <Edit3 size={16} /> Edit Record
                </button>
                <button 
                  className="book-btn" 
                  style={{ flex: 1, background: 'transparent', border: '1px solid #ddd', color: '#666', padding: '1rem' }}
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
