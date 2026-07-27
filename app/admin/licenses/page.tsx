'use client';

import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Plus, 
  Search, 
  RefreshCw, 
  X, 
  Check, 
  Laptop, 
  Slash,
  AlertCircle,
  Trash2,
  Lock,
  Unlock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Customer {
  id: number;
  teamName: string;
}

interface Device {
  id: number;
  deviceId: string;
  deviceName: string;
  windowsUsername: string;
  activatedAt: string;
  lastValidation: string;
}

interface License {
  id: number;
  licenseKey: string;
  status: 'ACTIVE' | 'INACTIVE' | 'REVOKED';
  expiryDate: string;
  maxDevices: number;
  createdAt: string;
  customer: Customer;
  devices: Device[];
}

export default function LicenseManagementPage() {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);

  // Form states
  const [customerId, setCustomerId] = useState('');
  const [expiryOption, setExpiryOption] = useState('1y');
  const [maxDevices, setMaxDevices] = useState('1');
  const [customExpiryDate, setCustomExpiryDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [licRes, custRes] = await Promise.all([
        fetch('/api/admin/licenses'),
        fetch('/api/admin/customers')
      ]);

      const licData = await licRes.json();
      const custData = await custRes.json();

      if (licData.success) setLicenses(licData.licenses);
      if (custData.success) setCustomers(custData.customers);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerId || !expiryOption) return;
    setSubmitting(true);

    try {
      const res = await fetch('/api/admin/licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          expiryOption,
          maxDevices,
          customExpiryDate: expiryOption === 'custom' ? customExpiryDate : undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error('Failed to generate license:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAction = async (id: number, action: 'reset' | 'suspend' | 'unsuspend') => {
    let confirmMsg = '';
    if (action === 'reset') confirmMsg = 'Apakah Anda yakin ingin menghapus semua perangkat yang terdaftar di lisensi ini?';
    if (action === 'suspend') confirmMsg = 'Apakah Anda yakin ingin menangguhkan (Suspend/Revoke) lisensi ini?';
    if (action === 'unsuspend') confirmMsg = 'Apakah Anda ingin mengaktifkan kembali lisensi ini?';

    if (!confirm(confirmMsg)) return;

    try {
      const res = await fetch('/api/admin/licenses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
        if (selectedLicense && selectedLicense.id === id) {
          setSelectedLicense(null); // Close details if open
        }
      }
    } catch (err) {
      console.error(`Failed to perform ${action} action:`, err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus lisensi ini secara permanen dari database?')) return;

    try {
      const res = await fetch(`/api/admin/licenses?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
        if (selectedLicense && selectedLicense.id === id) {
          setSelectedLicense(null);
        }
      }
    } catch (err) {
      console.error('Failed to delete license:', err);
    }
  };

  const formatExpiryDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (d.getFullYear() >= 9999) return 'Permanent';
    return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const filteredLicenses = licenses.filter(lic => 
    lic.licenseKey.toLowerCase().includes(search.toLowerCase()) ||
    lic.customer.teamName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dash-card">
      <div className="lic-header">
        <div>
          <h1 className="dash-title">License Keys</h1>
          <p className="dash-subtitle">Buat, pantau, tangguhkan, atau reset lisensi aktivasi software desktop-link</p>
        </div>
        <button className="action-btn action-btn-primary" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Generate License
        </button>
      </div>

      {/* Search and filter row */}
      <div className="search-row">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Cari berdasarkan License Key atau Nama Tim..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="action-btn action-btn-outline" onClick={fetchData} title="Refresh data">
          <RefreshCw size={16} className={loading ? 'spinner' : ''} />
        </button>
      </div>

      {/* Main layout grid */}
      <div className="licenses-layout-grid">
        {/* Table Panel */}
        <div className="licenses-table-panel">
          {loading && licenses.length === 0 ? (
            <div className="loading-container">
              <RefreshCw size={24} className="spinner" />
              <p>Memuat data lisensi...</p>
            </div>
          ) : filteredLicenses.length === 0 ? (
            <div className="empty-panel">Tidak ada lisensi yang ditemukan.</div>
          ) : (
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>License Key</th>
                    <th>Customer Team</th>
                    <th>Status</th>
                    <th>Expiry Date</th>
                    <th>Active Devices</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLicenses.map((lic) => (
                    <tr 
                      key={lic.id}
                      className={selectedLicense?.id === lic.id ? 'row-selected' : ''}
                      onClick={() => setSelectedLicense(selectedLicense?.id === lic.id ? null : lic)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#a855f7' }}>
                        {lic.licenseKey}
                      </td>
                      <td>{lic.customer.teamName}</td>
                      <td>
                        <span className={`badge badge-${lic.status.toLowerCase()}`}>
                          {lic.status}
                        </span>
                      </td>
                      <td>{formatExpiryDate(lic.expiryDate)}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Laptop size={14} style={{ color: '#9ca3af' }} />
                          <span>{lic.devices.length} / {lic.maxDevices}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                        <div className="actions-cell">
                          <button 
                            className="icon-action-btn edit-btn"
                            onClick={() => setSelectedLicense(selectedLicense?.id === lic.id ? null : lic)}
                            title="Detail Devices"
                          >
                            <Laptop size={14} />
                          </button>
                          
                          {lic.status === 'REVOKED' ? (
                            <button 
                              className="icon-action-btn unsusp-btn"
                              onClick={() => handleAction(lic.id, 'unsuspend')}
                              title="Unsuspend License"
                            >
                              <Unlock size={14} />
                            </button>
                          ) : (
                            <button 
                              className="icon-action-btn susp-btn"
                              onClick={() => handleAction(lic.id, 'suspend')}
                              title="Suspend / Revoke"
                            >
                              <Lock size={14} />
                            </button>
                          )}
                          
                          <button 
                            className="icon-action-btn delete-btn"
                            onClick={() => handleDelete(lic.id)}
                            title="Delete License"
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
        </div>

        {/* Selected License details side panel */}
        {selectedLicense && (
          <div className="license-details-sidepanel">
            <div className="details-header">
              <h3>Device Registry</h3>
              <button className="close-btn" onClick={() => setSelectedLicense(null)}>
                <X size={16} />
              </button>
            </div>

            <div className="details-body">
              <div className="info-block">
                <span className="info-label">License Key</span>
                <span className="info-val monospace">{selectedLicense.licenseKey}</span>
              </div>
              <div className="info-block">
                <span className="info-label">Customer / Team</span>
                <span className="info-val">{selectedLicense.customer.teamName}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginTop: '16px' }}>
                <button 
                  className="action-btn action-btn-outline w-full"
                  onClick={() => handleAction(selectedLicense.id, 'reset')}
                  disabled={selectedLicense.devices.length === 0}
                  style={{ justifyContent: 'center' }}
                >
                  Reset Devices
                </button>
              </div>

              <h4 style={{ fontSize: '13px', marginTop: '24px', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                Connected Hardware ({selectedLicense.devices.length})
              </h4>

              {selectedLicense.devices.length === 0 ? (
                <div className="empty-panel" style={{ padding: '16px' }}>
                  Belum ada perangkat terdaftar.
                </div>
              ) : (
                <div className="devices-list">
                  {selectedLicense.devices.map((dev) => (
                    <div key={dev.id} className="device-item">
                      <div className="device-meta">
                        <span className="pc-name">{dev.deviceName}</span>
                        <span className="os-user">User: {dev.windowsUsername}</span>
                      </div>
                      <div className="device-dates">
                        <span>Aktivasi: {new Date(dev.activatedAt).toLocaleDateString('id-ID')}</span>
                        <span>Validasi: {new Date(dev.lastValidation).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Generate Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content modal-content-sm">
            <div className="modal-header">
              <h3>Generate New License</h3>
              <button className="close-btn" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>
            
            <form onSubmit={handleGenerate} className="modal-form">
              <div className="form-group">
                <label>Pilih Customer *</label>
                <select 
                  required
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  disabled={submitting}
                  style={{ width: '100%', background: 'rgba(7, 11, 19, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px', color: '#ffffff' }}
                >
                  <option value="">-- Pilih Customer --</option>
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.teamName}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Masa Berlaku *</label>
                <select 
                  required
                  value={expiryOption}
                  onChange={(e) => setExpiryOption(e.target.value)}
                  disabled={submitting}
                  style={{ width: '100%', background: 'rgba(7, 11, 19, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px', color: '#ffffff' }}
                >
                  <option value="1m">1 Bulan</option>
                  <option value="3m">3 Bulan</option>
                  <option value="6m">6 Bulan</option>
                  <option value="1y">1 Tahun</option>
                  <option value="permanent">Permanent</option>
                  <option value="custom">Custom Date</option>
                </select>
              </div>

              {expiryOption === 'custom' && (
                <div className="form-group">
                  <label>Tanggal Kadaluarsa Custom *</label>
                  <input 
                    type="date" 
                    required
                    value={customExpiryDate}
                    onChange={(e) => setCustomExpiryDate(e.target.value)}
                    disabled={submitting}
                  />
                </div>
              )}

              <div className="form-group">
                <label>Batas Maksimum Device</label>
                <select 
                  value={maxDevices}
                  onChange={(e) => setMaxDevices(e.target.value)}
                  disabled={submitting}
                  style={{ width: '100%', background: 'rgba(7, 11, 19, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', padding: '10px', color: '#ffffff' }}
                >
                  <option value="1">1 Device (Default)</option>
                  <option value="2">2 Device</option>
                  <option value="3">3 Device</option>
                  <option value="5">5 Device</option>
                </select>
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
                  <span> Generate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
