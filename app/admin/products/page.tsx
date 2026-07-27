'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  RefreshCw, 
  X, 
  Check, 
  Upload, 
  Image as ImageIcon,
  ExternalLink,
  Layers,
  Tag,
  Eye,
  Globe,
  FileText,
  Sliders,
  ArrowLeft
} from 'lucide-react';

interface ProductItem {
  id: number;
  slug: string;
  name: string;
  subtitle: string | null;
  subtitleEn: string | null;
  badge: string | null;
  badgeEn: string | null;
  badgeType: string;
  category: string;
  price: string;
  stockStatus: string;
  stockStatusEn: string | null;
  description: string | null;
  descriptionEn: string | null;
  longDescription: string | null;
  longDescriptionEn: string | null;
  keySpecsJson: string | null;
  keySpecsJsonEn: string | null;
  image: string;
  mockupType: string;
  specsJson: string | null;
  featuresJson: string | null;
  featuresJsonEn: string | null;
  inTheBoxJson: string | null;
  inTheBoxJsonEn: string | null;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'form'>('table');
  const [activeTab, setActiveTab] = useState<'main' | 'content' | 'specs'>('main');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Master Telemetry Hub');
  const [price, setPrice] = useState('Rp 5.000.000');
  const [stockStatus, setStockStatus] = useState('Ready Stock');
  const [stockStatusEn, setStockStatusEn] = useState('In Stock');
  const [badge, setBadge] = useState('Paling Populer');
  const [badgeEn, setBadgeEn] = useState('Most Popular');
  const [badgeType, setBadgeType] = useState('purple');
  const [image, setImage] = useState('/products/joulemeter.png');
  const [mockupType, setMockupType] = useState('joulemeter');

  const [subtitle, setSubtitle] = useState('');
  const [subtitleEn, setSubtitleEn] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [longDescriptionEn, setLongDescriptionEn] = useState('');
  const [keySpecsText, setKeySpecsText] = useState('');
  const [keySpecsTextEn, setKeySpecsTextEn] = useState('');
  const [inTheBoxText, setInTheBoxText] = useState('');
  const [inTheBoxTextEn, setInTheBoxTextEn] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddForm = () => {
    setEditingId(null);
    setActiveTab('main');
    setName('');
    setSlug('');
    setCategory('Master Telemetry Hub');
    setPrice('Rp 5.000.000');
    setStockStatus('Ready Stock');
    setStockStatusEn('In Stock');
    setBadge('Paling Populer');
    setBadgeEn('Most Popular');
    setBadgeType('purple');
    setImage('/products/joulemeter.png');
    setMockupType('joulemeter');
    setSubtitle('Pusat Komando Telemetri Balap');
    setSubtitleEn('Master Telemetry Command Center');
    setDescription('Sistem telemetri presisi tinggi untuk rekam data kendaraan balap Anda.');
    setDescriptionEn('High precision racing telemetry system for your race vehicle.');
    setLongDescription('Modul perangkat keras SynchroTech yang dirancang khusus untuk lingkungan balapan ekstrem dengan presisi tinggi.');
    setLongDescriptionEn('SynchroTech hardware module engineered for extreme high-precision racing telemetry environments.');
    setKeySpecsText("ADS1256 24-bit Delta-Sigma ADC\nIsolated CAN Bus Interface 2.5kV\n4G LTE Multi-Band Real-Time Streaming");
    setKeySpecsTextEn("ADS1256 24-bit Delta-Sigma ADC\nIsolated CAN Bus Interface 2.5kV\n4G LTE Multi-Band Real-Time Streaming");
    setInTheBoxText("1x SynchroTech Hardware Module\n1x Waterproof M12 Wiring Harness (2m)\n1x Buku Panduan & Kartu Garansi Official");
    setInTheBoxTextEn("1x SynchroTech Hardware Module\n1x Waterproof M12 Wiring Harness (2m)\n1x User Manual & Official Warranty Card");
    setErrorMsg('');
    setViewMode('form');
  };

  const openEditForm = (prod: ProductItem) => {
    setEditingId(prod.id);
    setActiveTab('main');
    setName(prod.name);
    setSlug(prod.slug);
    setCategory(prod.category);
    setPrice(prod.price);
    setStockStatus(prod.stockStatus || 'Ready Stock');
    setStockStatusEn(prod.stockStatusEn || 'In Stock');
    setBadge(prod.badge || 'Paling Populer');
    setBadgeEn(prod.badgeEn || 'Most Popular');
    setBadgeType(prod.badgeType || 'purple');
    setImage(prod.image || '/products/joulemeter.png');
    setMockupType(prod.mockupType || 'joulemeter');
    setSubtitle(prod.subtitle || '');
    setSubtitleEn(prod.subtitleEn || '');
    setDescription(prod.description || '');
    setDescriptionEn(prod.descriptionEn || '');
    setLongDescription(prod.longDescription || '');
    setLongDescriptionEn(prod.longDescriptionEn || '');

    try {
      const parsedKeySpecs = prod.keySpecsJson ? JSON.parse(prod.keySpecsJson) : [];
      setKeySpecsText(Array.isArray(parsedKeySpecs) ? parsedKeySpecs.join('\n') : '');
    } catch (e) {
      setKeySpecsText('');
    }

    try {
      const parsedKeySpecsEn = prod.keySpecsJsonEn ? JSON.parse(prod.keySpecsJsonEn) : [];
      setKeySpecsTextEn(Array.isArray(parsedKeySpecsEn) ? parsedKeySpecsEn.join('\n') : '');
    } catch (e) {
      setKeySpecsTextEn('');
    }

    try {
      const parsedInTheBox = prod.inTheBoxJson ? JSON.parse(prod.inTheBoxJson) : [];
      setInTheBoxText(Array.isArray(parsedInTheBox) ? parsedInTheBox.join('\n') : '');
    } catch (e) {
      setInTheBoxText('');
    }

    try {
      const parsedInTheBoxEn = prod.inTheBoxJsonEn ? JSON.parse(prod.inTheBoxJsonEn) : [];
      setInTheBoxTextEn(Array.isArray(parsedInTheBoxEn) ? parsedInTheBoxEn.join('\n') : '');
    } catch (e) {
      setInTheBoxTextEn('');
    }

    setErrorMsg('');
    setViewMode('form');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/products/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.imageUrl) {
        setImage(data.imageUrl);
      } else {
        setErrorMsg(data.error || 'Gagal mengunggah gambar');
      }
    } catch (err) {
      console.error('Upload catch error:', err);
      setErrorMsg('Gagal mengunggah gambar');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    setSubmitting(true);
    setErrorMsg('');

    const keySpecsArray = keySpecsText.split('\n').map(s => s.trim()).filter(Boolean);
    const keySpecsEnArray = keySpecsTextEn.split('\n').map(s => s.trim()).filter(Boolean);
    const inTheBoxArray = inTheBoxText.split('\n').map(s => s.trim()).filter(Boolean);
    const inTheBoxEnArray = inTheBoxTextEn.split('\n').map(s => s.trim()).filter(Boolean);

    const payload = {
      id: editingId,
      name,
      slug,
      category,
      price,
      stockStatus,
      stockStatusEn,
      badge,
      badgeEn,
      badgeType,
      image,
      mockupType,
      subtitle,
      subtitleEn,
      description,
      descriptionEn,
      longDescription,
      longDescriptionEn,
      keySpecs: keySpecsArray,
      keySpecsEn: keySpecsEnArray,
      inTheBox: inTheBoxArray,
      inTheBoxEn: inTheBoxEnArray,
    };

    try {
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setViewMode('table');
        fetchProducts();
      } else {
        setErrorMsg(data.error || 'Gagal menyimpan produk');
      }
    } catch (err) {
      console.error('Save product error:', err);
      setErrorMsg('Gagal menyimpan data produk');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, prodName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus produk "${prodName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/products?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
      }
    } catch (err) {
      console.error('Delete product error:', err);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  // VIEW MODE: TABLE LIST
  if (viewMode === 'table') {
    return (
      <div className="dash-card">
        <div className="cust-header">
          <div>
            <h1 className="dash-title">Manajemen Produk Telemetri</h1>
            <p className="dash-subtitle">
              Kelola katalog produk, ubah harga, upload gambar perangkat, dan atur detail produk
            </p>
          </div>
          <button onClick={openAddForm} className="action-btn action-btn-primary">
            <Plus size={16} />
            <span>Tambah Produk Baru</span>
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="search-row">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Cari produk berdasarkan nama, slug, atau kategori..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="loading-container">
            <RefreshCw size={24} className="animate-spin text-purple-electric" />
            <span>Memuat data produk...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-panel">Belum ada produk yang cocok.</div>
        ) : (
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Gambar</th>
                  <th>Nama Produk & Slug</th>
                  <th>Kategori</th>
                  <th>Harga Resmi</th>
                  <th>Status Stok</th>
                  <th>Badge</th>
                  <th style={{ textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <div className="w-12 h-12 rounded-lg bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    </td>
                    <td>
                      <div className="font-bold text-white text-sm">{prod.name}</div>
                      <div className="font-mono text-xs text-purple-electric">/products/{prod.slug}</div>
                    </td>
                    <td>
                      <span className="font-mono text-xs text-gray-300">{prod.category}</span>
                    </td>
                    <td>
                      <span className="font-mono font-bold text-white">{prod.price}</span>
                    </td>
                    <td>
                      <span className="badge badge-active">{prod.stockStatus}</span>
                    </td>
                    <td>
                      <span className={`badge ${
                        prod.badgeType === 'blue' 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                          : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      }`}>
                        {prod.badge}
                      </span>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <a
                          href={`/products/${prod.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-action-btn edit-btn"
                          title="Lihat Halaman Publik"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <button 
                          onClick={() => openEditForm(prod)}
                          className="icon-action-btn edit-btn"
                          title="Edit Produk"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(prod.id, prod.name)}
                          className="icon-action-btn delete-btn"
                          title="Hapus Produk"
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
    );
  }

  // VIEW MODE: IN-PAGE FULL FORM PANEL (Fills entire main pane, sidebar remains visible)
  return (
    <div className="w-full space-y-6">
      {/* Top Header & Navigation Bar */}
      <div className="dash-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode('table')}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer flex items-center space-x-2"
          >
            <ArrowLeft size={16} />
            <span className="text-xs font-mono font-bold">Kembali ke Daftar</span>
          </button>

          <div>
            <span className="font-mono text-[10px] text-purple-electric font-bold tracking-widest uppercase block mb-1">
              {editingId ? `ID PRODUK: #${editingId}` : 'FORM PRODUK BARU'}
            </span>
            <h1 className="font-display text-2xl font-extrabold text-white uppercase tracking-tight">
              {editingId ? `Edit Produk: ${name}` : 'Tambah Produk Telemetri Baru'}
            </h1>
          </div>
        </div>

        {/* Tab Navigation Switches */}
        <div className="flex items-center space-x-2 bg-black/60 border border-white/10 p-1.5 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('main')}
            className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
              activeTab === 'main' 
                ? 'bg-purple-electric text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Package size={14} />
            <span>1. Info Utama & Media</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
              activeTab === 'content' 
                ? 'bg-purple-electric text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText size={14} />
            <span>2. Deskripsi (ID/EN)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2.5 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 flex items-center space-x-2 cursor-pointer ${
              activeTab === 'specs' 
                ? 'bg-purple-electric text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Sliders size={14} />
            <span>3. Fitur & Box</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-mono font-semibold rounded-2xl flex items-center space-x-2">
          <span>⚠️ {errorMsg}</span>
        </div>
      )}

      {/* Main Form Body Container */}
      <form onSubmit={handleSave} className="dash-card space-y-8">
        {/* TAB 1: Info Utama & Media */}
        {activeTab === 'main' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns: Core Input Fields */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-2 gap-5">
                <div className="form-group space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Nama Produk *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="mis. Nexus Two 4G" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                  />
                </div>

                <div className="form-group space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Slug URL</label>
                  <input 
                    type="text" 
                    placeholder="mis. nexus-two (otomatis dari nama)" 
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="form-group space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Kategori Hardware *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="mis. Master Telemetry Hub" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                  />
                </div>

                <div className="form-group space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Harga Resmi (IDR) *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="mis. Rp 6.499.000" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                  />
                </div>
              </div>

              {/* Stock Status & Badges */}
              <div className="grid grid-cols-2 gap-5">
                <div className="form-group space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Status Stok (ID)</label>
                  <input 
                    type="text" 
                    value={stockStatus}
                    onChange={(e) => setStockStatus(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                  />
                </div>

                <div className="form-group space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Status Stok (EN)</label>
                  <input 
                    type="text" 
                    value={stockStatusEn}
                    onChange={(e) => setStockStatusEn(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="form-group space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Badge Text (ID)</label>
                  <input 
                    type="text" 
                    value={badge}
                    onChange={(e) => setBadge(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                  />
                </div>

                <div className="form-group space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Badge Text (EN)</label>
                  <input 
                    type="text" 
                    value={badgeEn}
                    onChange={(e) => setBadgeEn(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                  />
                </div>

                <div className="form-group space-y-2">
                  <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Warna Badge</label>
                  <select 
                    value={badgeType}
                    onChange={(e) => setBadgeType(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                  >
                    <option value="purple">Ungu (#A855F7)</option>
                    <option value="blue">Biru (#3B82F6)</option>
                    <option value="dark">Gelap (Neutral)</option>
                  </select>
                </div>
              </div>

              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Tipe Simulasi Dashboard Mockup</label>
                <select 
                  value={mockupType}
                  onChange={(e) => setMockupType(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                >
                  <option value="joulemeter">Joulemeter Power Sim (24-bit Current/Voltage)</option>
                  <option value="nexus">Nexus 4G LTE Sim (Global Cellular + GNSS)</option>
                  <option value="display">Cockpit Display Sim (Race Lap Timer)</option>
                </select>
              </div>
            </div>

            {/* Right 5 Columns: Upload Gambar & Live Card Preview */}
            <div className="lg:col-span-5 space-y-6">
              {/* Upload Box */}
              <div className="rounded-2xl bg-black/50 border border-white/10 p-6 space-y-4">
                <label className="text-xs font-mono font-bold text-purple-electric uppercase flex items-center space-x-2">
                  <ImageIcon size={16} />
                  <span>Upload & Kelola Gambar Perangkat</span>
                </label>

                <div className="w-full h-52 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center relative group">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-mono text-gray-400">URL Gambar Publik:</label>
                  <input 
                    type="text" 
                    value={image} 
                    onChange={(e) => setImage(e.target.value)} 
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-white/10 text-white text-xs font-mono"
                  />
                </div>

                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                  className="w-full py-4 rounded-xl bg-linear-to-r from-purple-electric to-[#9333EA] text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all cursor-pointer disabled:opacity-50"
                >
                  {uploadingImage ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Mengunggah File...</span>
                    </>
                  ) : (
                    <>
                      <Upload size={16} />
                      <span>Pilih File Dari Komputer</span>
                    </>
                  )}
                </button>
              </div>

              {/* Live Preview Card */}
              <div className="rounded-2xl bg-white/2 border border-purple-electric/30 p-6 backdrop-blur-xl space-y-3">
                <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  👁️ Live Card Preview di /products:
                </span>
                <div className="rounded-xl bg-surface border border-white/10 p-5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-electric/20 text-[#C084FC] border border-purple-electric/30">
                      {badge || 'Paling Populer'}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold">
                      ● {stockStatus || 'Ready Stock'}
                    </span>
                  </div>
                  <h4 className="font-display text-xl font-bold text-white">{name || 'Nama Produk'}</h4>
                  <p className="text-xs font-mono text-purple-electric">{subtitle || 'Subtitle Produk'}</p>
                  <div className="font-mono text-lg font-bold text-white pt-2 border-t border-white/10">
                    {price || 'Rp 0'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Konten Deskripsi (ID & EN) */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-purple-electric uppercase flex items-center space-x-2">
                  <Globe size={14} />
                  <span>Subtitle Bahasa Indonesia (ID)</span>
                </label>
                <input 
                  type="text" 
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="mis. Pusat Komando Telemetri 4G LTE"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                />
              </div>

              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-sky-400 uppercase flex items-center space-x-2">
                  <Globe size={14} />
                  <span>Subtitle English (EN)</span>
                </label>
                <input 
                  type="text" 
                  value={subtitleEn}
                  onChange={(e) => setSubtitleEn(e.target.value)}
                  placeholder="e.g. Master 4G LTE Telemetry Hub"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-purple-electric uppercase">
                  Deskripsi Singkat Katalog (ID)
                </label>
                <textarea 
                  rows={4} 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tuliskan 1-2 kalimat ringkasan produk untuk kartu katalog..."
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                />
              </div>

              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-sky-400 uppercase">
                  Short Description Catalog (EN)
                </label>
                <textarea 
                  rows={4} 
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  placeholder="Write 1-2 sentence catalog summary in English..."
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-purple-electric uppercase">
                  Deskripsi Detail Panjang (ID)
                </label>
                <textarea 
                  rows={8} 
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  placeholder="Tuliskan penjelasan teknis lengkap mengenai kapabilitas produk..."
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                />
              </div>

              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-sky-400 uppercase">
                  Long Detail Description (EN)
                </label>
                <textarea 
                  rows={8} 
                  value={longDescriptionEn}
                  onChange={(e) => setLongDescriptionEn(e.target.value)}
                  placeholder="Write full technical explanation in English..."
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Fitur & Kelengkapan Box */}
        {activeTab === 'specs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-purple-electric uppercase">
                  Fitur Utama Checklist (ID) — 1 Poin per Baris
                </label>
                <textarea 
                  rows={7} 
                  value={keySpecsText}
                  onChange={(e) => setKeySpecsText(e.target.value)}
                  placeholder="ADS1256 24-bit Delta-Sigma ADC&#10;Isolasi CAN Bus 2.5kV RMS&#10;Streaming 4G LTE Multi-Band"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-mono focus:border-purple-electric"
                />
              </div>

              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-sky-400 uppercase">
                  Key Features Checklist (EN) — 1 Point per Line
                </label>
                <textarea 
                  rows={7} 
                  value={keySpecsTextEn}
                  onChange={(e) => setKeySpecsTextEn(e.target.value)}
                  placeholder="ADS1256 24-bit Delta-Sigma ADC&#10;2.5kV RMS Isolated CAN Bus&#10;4G LTE Multi-Band Live Streaming"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-mono focus:border-purple-electric"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-purple-electric uppercase">
                  Kelengkapan Paket / In The Box (ID) — 1 Item per Baris
                </label>
                <textarea 
                  rows={6} 
                  value={inTheBoxText}
                  onChange={(e) => setInTheBoxText(e.target.value)}
                  placeholder="1x Modul Hardware SynchroTech&#10;1x Kabel Harness M12 Waterproof (2m)&#10;1x Buku Panduan & Kartu Garansi Official"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-mono focus:border-purple-electric"
                />
              </div>

              <div className="form-group space-y-2">
                <label className="text-xs font-mono font-bold text-sky-400 uppercase">
                  What's Included / In The Box (EN) — 1 Item per Line
                </label>
                <textarea 
                  rows={6} 
                  value={inTheBoxTextEn}
                  onChange={(e) => setInTheBoxTextEn(e.target.value)}
                  placeholder="1x SynchroTech Hardware Module&#10;1x M12 Waterproof Wiring Harness (2m)&#10;1x User Manual & Official Warranty Card"
                  className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm font-mono focus:border-purple-electric"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer Action Buttons */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-gray-400">
            Langkah {activeTab === 'main' ? '1/3' : activeTab === 'content' ? '2/3' : '3/3'}: <span className="text-purple-electric font-bold uppercase">{activeTab}</span>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white font-mono text-xs font-bold uppercase hover:bg-white/10 transition-colors"
            >
              Batal & Kembali
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-10 py-3.5 rounded-xl bg-linear-to-r from-purple-electric to-[#9333EA] text-white font-display text-xs font-bold uppercase tracking-wider flex items-center space-x-2 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition-all cursor-pointer disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Menyimpan Produk...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Simpan Perubahan Produk</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
