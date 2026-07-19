'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Edit2, 
  Trash2, 
  Search, 
  RefreshCw,
  X,
  Check
} from 'lucide-react';

interface Customer {
  id: number;
  teamName: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  createdAt: string;
  licenses?: any[];
}

export default function CustomerManagementPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Form states
  const [editId, setEditId] = useState<number | null>(null);
  const [teamName, setTeamName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/customers');
      const data = await res.json();
      if (data.success) {
        setCustomers(data.customers);
      }
    } catch (err) {
      console.error('Failed to fetch customers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const openAddModal = () => {
    setEditId(null);
    setTeamName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setModalOpen(true);
  };

  const openEditModal = (cust: Customer) => {
    setEditId(cust.id);
    setTeamName(cust.teamName);
    setEmail(cust.email || '');
    setPhone(cust.phone || '');
    setNotes(cust.notes || '');
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName) return;
    setSubmitting(true);

    try {
      const method = editId ? 'PUT' : 'POST';
      const body = editId 
        ? { id: editId, teamName, email, phone, notes }
        : { teamName, email, phone, notes };

      const res = await fetch('/api/admin/customers', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchCustomers();
      }
    } catch (err) {
      console.error('Failed to save customer:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus customer ini? Semua lisensi terkait juga akan terhapus.')) return;
    
    try {
      const res = await fetch(`/api/admin/customers?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchCustomers();
      }
    } catch (err) {
      console.error('Failed to delete customer:', err);
    }
  };

  const filteredCustomers = customers.filter(cust => 
    cust.teamName.toLowerCase().includes(search.toLowerCase()) ||
    (cust.email && cust.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="dash-card">
      <div className="cust-header">
        <div>
          <h1 className="dash-title">Customer Management</h1>
          <p className="dash-subtitle">Kelola data tim balap dan informasi kontak pelanggan software desktop-link</p>
        </div>
        <button className="action-btn action-btn-primary" onClick={openAddModal}>
          <UserPlus size={16} /> Add Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="search-row">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan nama tim atau email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="action-btn action-btn-outline" onClick={fetchCustomers} title="Refresh data">
          <RefreshCw size={16} className={loading ? 'spinner' : ''} />
        </button>
      </div>

      {/* Content area */}
      {loading && customers.length === 0 ? (
        <div className="loading-container">
          <RefreshCw size={24} className="spinner" />
          <p>Memuat data customer...</p>
        </div>
      ) : filteredCustomers.length === 0 ? (
        <div className="empty-panel">
          Tidak ada data customer yang ditemukan.
        </div>
      ) : (
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Email</th>
                <th>WhatsApp</th>
                <th>Licenses</th>
                <th>Notes</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((cust) => (
                <tr key={cust.id}>
                  <td style={{ fontWeight: 600, color: '#ffffff' }}>{cust.teamName}</td>
                  <td>{cust.email || '-'}</td>
                  <td>{cust.phone || '-'}</td>
                  <td>
                    <span className="badge badge-active" style={{ fontSize: '10px' }}>
                      {cust.licenses?.length || 0} Keys
                    </span>
                  </td>
                  <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {cust.notes || '-'}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="actions-cell">
                      <button 
                        className="icon-action-btn edit-btn" 
                        onClick={() => openEditModal(cust)}
                        title="Edit Customer"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        className="icon-action-btn delete-btn" 
                        onClick={() => handleDelete(cust.id)}
                        title="Delete Customer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Popup */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editId ? 'Edit Customer' : 'Tambah Customer Baru'}</h3>
              <button className="close-btn" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group">
                <label>Team Name *</label>
                <input 
                  type="text" 
                  placeholder="Nama Tim / Organisasi" 
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label>Email (Opsional)</label>
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label>WhatsApp / No. HP (Opsional)</label>
                <input 
                  type="text" 
                  placeholder="+62 8..." 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={submitting}
                />
              </div>

              <div className="form-group">
                <label>Catatan (Opsional)</label>
                <textarea 
                  placeholder="Catatan tambahan..." 
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  disabled={submitting}
                ></textarea>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="action-btn action-btn-outline" 
                  onClick={() => setModalOpen(false)}
                  disabled={submitting}
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="action-btn action-btn-primary"
                  disabled={submitting}
                >
                  {submitting ? <RefreshCw size={14} className="spinner" /> : <Check size={14} />} 
                  {editId ? ' Simpan Perubahan' : ' Tambahkan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  );
}
