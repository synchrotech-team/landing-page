'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Globe, 
  ArrowRight, 
  Search, 
  SlidersHorizontal, 
  MessageSquare, 
  Cpu, 
  Radio, 
  Zap, 
  Tv, 
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PRODUCTS_DATA, Product } from '@/lib/products';

export default function ProductsPage() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const products = Object.values(PRODUCTS_DATA);

  // Filter products based on search query and category filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    if (selectedCategory === 'hub') return matchesSearch && product.slug === 'nexus-one';
    if (selectedCategory === 'energy') return matchesSearch && product.slug === 'joulemeter';
    if (selectedCategory === 'display') return matchesSearch && product.slug === 'display';
    return matchesSearch;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#120720', color: '#fff' }}>
      {/* Top Utility Navigation */}
      <nav className="top-utility-bar" aria-label="Utility Links">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="links">
            <Link href="/">{lang === 'id' ? '← Beranda SynchroTech' : '← SynchroTech Home'}</Link>
            <Link href="/#contact">{lang === 'id' ? 'Hubungi Tim' : 'Contact Us'}</Link>
          </div>
          <div className="global-selector" role="button" tabIndex={0} onClick={() => setLang(lang === 'en' ? 'id' : 'en')}>
            <Globe size={12} />
            <span>{lang === 'en' ? 'English (EN)' : 'Bahasa Indonesia (ID)'}</span>
          </div>
        </div>
      </nav>

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <Link href="/" className="logo" aria-label="SynchroTech Homepage">
            <img 
              src="/logotype.png" 
              alt="SynchroTech" 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
            />
          </Link>
          <nav aria-label="Main Navigation">
            <ul className="nav-menu" style={{ display: 'flex', gap: '32px', listStyle: 'none' }}>
              <li><Link href="/products" style={{ color: '#A855F7', fontWeight: 700 }}>{lang === 'id' ? 'Produk' : 'Products'}</Link></li>
              <li><Link href="/#solutions" style={{ color: '#e2d6f5' }}>{lang === 'id' ? 'Solusi' : 'Solutions'}</Link></li>
              <li><Link href="/#support" style={{ color: '#e2d6f5' }}>{lang === 'id' ? 'Dukungan' : 'Support'}</Link></li>
              <li><Link href="/#contact" style={{ color: '#e2d6f5' }}>{lang === 'id' ? 'Kontak' : 'Contact'}</Link></li>
            </ul>
          </nav>
          <div>
            <Link href="/#contact" className="btn btn-secondary">
              {lang === 'id' ? 'Pesan Online' : 'Buy Online'}
            </Link>
          </div>
        </div>
      </header>

      {/* Page Hero Banner */}
      <section style={{
        background: 'linear-gradient(180deg, #1A0A2E 0%, #120720 100%)',
        borderBottom: '1px solid rgba(168, 85, 247, 0.15)',
        padding: '60px 0 40px'
      }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px', color: '#9ca3af', marginBottom: '20px' }}>
            <Link href="/" style={{ color: '#b8a8d0' }}>Beranda</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#A855F7', fontWeight: 600 }}>Katalog Produk</span>
          </div>

          <span style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: '#A855F7',
            textTransform: 'uppercase',
            marginBottom: '8px',
            display: 'inline-block'
          }}>
            {lang === 'id' ? 'LINI PERANGKAT KERAS TELEMETRI' : 'TELEMETRY HARDWARE LINEUP'}
          </span>

          <h1 style={{
            fontSize: '38px',
            fontWeight: 800,
            fontFamily: 'var(--font-tech), sans-serif',
            color: '#ffffff',
            marginBottom: '16px',
            lineHeight: '1.2'
          }}>
            {lang === 'id' ? 'Katalog Perangkat Keras Balap' : 'Racing Hardware Catalog'}
          </h1>

          <p style={{
            fontSize: '16px',
            color: '#d1c4e9',
            lineHeight: '1.6',
            marginBottom: '36px'
          }}>
            {lang === 'id'
              ? 'Temukan sistem telemetri presisi yang dirancang khusus untuk memantau, menganalisis, dan meningkatkan performa kendaraan balap Anda di lintasan.'
              : 'Discover precision telemetry systems designed to capture, analyze, and optimize your vehicle performance on track.'}
          </p>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section style={{ padding: '32px 0 60px', flex: 1 }}>
        <div className="container">
          {/* Controls Bar */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(26, 10, 46, 0.8)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '16px',
            padding: '16px 24px',
            marginBottom: '40px'
          }}>
            {/* Category Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedCategory('all')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === 'all' ? '#A855F7' : 'rgba(255,255,255,0.05)',
                  color: selectedCategory === 'all' ? '#ffffff' : '#d1c4e9',
                  transition: 'all 0.2s'
                }}
              >
                {lang === 'id' ? 'Semua Produk' : 'All Products'} ({products.length})
              </button>
              <button
                onClick={() => setSelectedCategory('hub')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === 'hub' ? '#A855F7' : 'rgba(255,255,255,0.05)',
                  color: selectedCategory === 'hub' ? '#ffffff' : '#d1c4e9',
                  transition: 'all 0.2s'
                }}
              >
                4G LTE Telemetry Hub
              </button>
              <button
                onClick={() => setSelectedCategory('energy')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === 'energy' ? '#A855F7' : 'rgba(255,255,255,0.05)',
                  color: selectedCategory === 'energy' ? '#ffffff' : '#d1c4e9',
                  transition: 'all 0.2s'
                }}
              >
                {lang === 'id' ? 'Perekam Energi' : 'Energy Logger'}
              </button>
              <button
                onClick={() => setSelectedCategory('display')}
                style={{
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === 'display' ? '#A855F7' : 'rgba(255,255,255,0.05)',
                  color: selectedCategory === 'display' ? '#ffffff' : '#d1c4e9',
                  transition: 'all 0.2s'
                }}
              >
                Cockpit Display
              </button>
            </div>

            {/* Search Input Box */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              <input 
                type="text"
                placeholder={lang === 'id' ? 'Cari produk...' : 'Search products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  borderRadius: '10px',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  background: 'rgba(18, 7, 32, 0.8)',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', background: 'rgba(26, 10, 46, 0.5)', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '8px' }}>Tidak ada produk yang cocok</h3>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>Coba ubah kata kunci pencarian atau kategori filter Anda.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px'
            }}>
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.slug}
                  style={{
                    background: 'linear-gradient(135deg, rgba(26, 10, 46, 0.9) 0%, rgba(45, 27, 78, 0.9) 100%)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    borderRadius: '20px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div>
                    {/* Header Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        backgroundColor: prod.badgeType === 'blue' ? 'rgba(59, 130, 246, 0.2)' : prod.badgeType === 'purple' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        color: prod.badgeType === 'blue' ? '#60A5FA' : prod.badgeType === 'purple' ? '#C084FC' : '#E5E7EB',
                      }}>
                        {prod.badge}
                      </span>
                      <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 600 }}>
                        {prod.stockStatus}
                      </span>
                    </div>

                    {/* Product Image Box */}
                    <div style={{
                      width: '100%',
                      height: '200px',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      background: '#070b13',
                      marginBottom: '20px',
                      border: '1px solid rgba(168, 85, 247, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>

                    {/* Title & Subtitle */}
                    <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '4px', fontFamily: 'var(--font-tech), sans-serif' }}>
                      {prod.name}
                    </h2>
                    <p style={{ fontSize: '13px', color: '#A855F7', fontWeight: 600, marginBottom: '12px' }}>
                      {prod.subtitle}
                    </p>
                    <p style={{ fontSize: '14px', color: '#d1c4e9', lineHeight: '1.5', marginBottom: '20px' }}>
                      {prod.description}
                    </p>

                    {/* Key Specs */}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', marginBottom: '24px' }}>
                      <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
                        Fitur Utama:
                      </div>
                      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {prod.keySpecs.slice(0, 3).map((spec, i) => (
                          <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#e2d6f5' }}>
                            <Check size={14} color="#A855F7" style={{ flexShrink: 0 }} />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                      <span style={{ fontSize: '12px', color: '#9ca3af' }}>Harga Resmi:</span>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-tech), sans-serif' }}>
                        {prod.price}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link 
                        href={`/products/${prod.slug}`}
                        className="btn btn-primary"
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '12px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 600
                        }}
                      >
                        Detail Produk <ArrowRight size={14} />
                      </Link>

                      <a 
                        href={`https://wa.me/628132595764?text=${encodeURIComponent(`Halo SynchroTech, saya tertarik untuk bertanya mengenai produk ${prod.name}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '12px',
                          borderRadius: '10px',
                          backgroundColor: '#25D366',
                          color: '#fff'
                        }}
                        aria-label="Tanya via WhatsApp"
                      >
                        <MessageSquare size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Integrated System Section */}
          <div style={{
            marginTop: '80px',
            background: 'linear-gradient(135deg, rgba(45, 27, 78, 0.9) 0%, rgba(26, 10, 46, 0.9) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '24px',
            padding: '48px 36px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '12px', color: '#F7941D', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              EKOSISTEM SYNCHROTECH
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', marginTop: '8px', marginBottom: '16px', fontFamily: 'var(--font-tech), sans-serif' }}>
              Bekerja Bersama Dalam Satu Jaringan CAN Bus Presisi
            </h2>
            <p style={{ fontSize: '15px', color: '#d1c4e9', maxWidth: '680px', margin: '0 auto 32px', lineHeight: '1.6' }}>
              Nexus One, Joulemeter, dan Display dirancang secara modular. Terhubung tanpa celah melalui jaringan CAN Bus untuk mengirimkan telemetry data real-time langsung ke aplikasi Podium Cloud.
            </p>
            <Link href="/#contact" className="btn btn-secondary">
              Konsultasi Sistem Balap Anda <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ borderTop: '1px solid rgba(168, 85, 247, 0.15)', background: '#0a0314' }}>
        <div className="container">
          <div className="footer-bottom">
            <div>© 2023 SynchroTech Racing Systems. All rights reserved.</div>
            <div className="footer-bottom-links">
              <Link href="/">{lang === 'id' ? 'Beranda' : 'Home'}</Link>
              <Link href="/#contact">{lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
