'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Check, 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Radio, 
  Cpu, 
  MapPin, 
  Battery, 
  Activity, 
  Sliders, 
  Sun, 
  Tv, 
  MessageSquare, 
  FileText, 
  PackageCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { PRODUCTS_DATA, Product } from '@/lib/products';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();
  const product: Product | undefined = PRODUCTS_DATA[slug];

  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [activeViewTab, setActiveViewTab] = useState<'photo' | 'sim'>('photo');
  const [simLapTime, setSimLapTime] = useState(0);
  const [simCurrent, setSimCurrent] = useState(24.5);
  const [simLteRssi, setSimLteRssi] = useState(-68);

  // Live simulation effect for mockups
  useEffect(() => {
    const interval = setInterval(() => {
      setSimLapTime(prev => parseFloat((prev + 0.1).toFixed(1)));
      setSimCurrent(prev => parseFloat((24.0 + (Math.sin(Date.now() / 500) * 4.5)).toFixed(2)));
      setSimLteRssi(prev => -65 - Math.floor(Math.random() * 8));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Format running lap time to M:SS.S
  const formatTime = (timeInSeconds: number) => {
    const baseTime = 262.3 + timeInSeconds;
    const minutes = Math.floor(baseTime / 60);
    const seconds = (baseTime % 60).toFixed(1);
    return `${minutes}:${parseFloat(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu size={22} />;
      case 'ShieldCheck': return <ShieldCheck size={22} />;
      case 'Zap': return <Zap size={22} />;
      case 'Radio': return <Radio size={22} />;
      case 'MapPin': return <MapPin size={22} />;
      case 'Battery': return <Battery size={22} />;
      case 'Activity': return <Activity size={22} />;
      case 'Sliders': return <Sliders size={22} />;
      case 'Sun': return <Sun size={22} />;
      case 'Tv': return <Tv size={22} />;
      default: return <Cpu size={22} />;
    }
  };

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#120720', color: '#fff' }}>
        <header className="main-header">
          <div className="container">
            <Link href="/" className="logo">
              <img src="/logotype.png" alt="SynchroTech" style={{ height: '36px', width: 'auto' }} />
            </Link>
          </div>
        </header>
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', color: '#fff', marginBottom: '16px', fontFamily: 'var(--font-tech), sans-serif' }}>
              Produk Tidak Ditemukan
            </h1>
            <p style={{ color: '#9ca3af', marginBottom: '24px' }}>
              Maaf, halaman detail untuk produk "{slug}" tidak ditemukan.
            </p>
            <Link href="/#products" className="btn btn-primary">
              Kembali ke Katalog Produk
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const waMessage = `Halo SynchroTech, saya tertarik untuk bertanya/memesan produk ${product.name} (${product.subtitle}). Mohon informasi lebih lanjut.`;
  const waUrl = `https://wa.me/628132595764?text=${encodeURIComponent(waMessage)}`;

  const otherProducts = Object.values(PRODUCTS_DATA).filter(p => p.slug !== product.slug);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#120720', color: '#fff' }}>
      {/* Top Utility Bar */}
      <nav className="top-utility-bar" aria-label="Utility Links">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="links" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link href="/#products" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#b8a8d0' }}>
              <ArrowLeft size={12} /> {lang === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
            </Link>
            <span style={{ opacity: 0.3 }}>/</span>
            <span style={{ color: '#A855F7', fontWeight: 600 }}>{product.name}</span>
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
          <Link href="/" className="logo">
            <img src="/logotype.png" alt="SynchroTech" style={{ height: '36px', width: 'auto' }} />
          </Link>
          <nav>
            <ul className="nav-menu" style={{ display: 'flex', gap: '24px', listStyle: 'none' }}>
              <li><Link href="/#products" style={{ color: '#e2d6f5' }}>{lang === 'id' ? 'Semua Produk' : 'All Products'}</Link></li>
              <li><Link href="/#contact" style={{ color: '#e2d6f5' }}>{lang === 'id' ? 'Kontak & Workshop' : 'Contact Us'}</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Product Main Showcase */}
      <main style={{ flex: 1, padding: '40px 0 80px' }}>
        <div className="container">
          {/* Breadcrumb path */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#9ca3af', marginBottom: '32px' }}>
            <Link href="/" style={{ color: '#b8a8d0' }}>Beranda</Link>
            <ChevronRight size={14} />
            <Link href="/#products" style={{ color: '#b8a8d0' }}>Produk</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#fff', fontWeight: 600 }}>{product.name}</span>
          </div>

          {/* Product Overview Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '40px',
            alignItems: 'start',
            marginBottom: '64px'
          }}>
            {/* Left Column: Visual Mockup Showcase */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(26, 10, 46, 0.9) 0%, rgba(45, 27, 78, 0.9) 100%)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Badge Overlay */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: '20px',
                  backgroundColor: product.badgeType === 'blue' ? 'rgba(59, 130, 246, 0.25)' : product.badgeType === 'purple' ? 'rgba(168, 85, 247, 0.25)' : 'rgba(255, 255, 255, 0.15)',
                  color: product.badgeType === 'blue' ? '#60A5FA' : product.badgeType === 'purple' ? '#C084FC' : '#E5E7EB',
                  letterSpacing: '0.05em'
                }}>
                  {product.badge}
                </span>
                <span style={{ fontSize: '12px', color: '#10B981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }} />
                  {product.stockStatus}
                </span>
              </div>

              {/* View Mode Tab Switcher */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '10px' }}>
                <button
                  onClick={() => setActiveViewTab('photo')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: activeViewTab === 'photo' ? '#A855F7' : 'transparent',
                    color: activeViewTab === 'photo' ? '#ffffff' : '#9ca3af',
                    transition: 'all 0.2s'
                  }}
                >
                  {lang === 'id' ? 'Foto Perangkat' : 'Hardware Photo'}
                </button>
                <button
                  onClick={() => setActiveViewTab('sim')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backgroundColor: activeViewTab === 'sim' ? '#A855F7' : 'transparent',
                    color: activeViewTab === 'sim' ? '#ffffff' : '#9ca3af',
                    transition: 'all 0.2s'
                  }}
                >
                  {lang === 'id' ? 'Simulasi Live Telemetri' : 'Live Telemetry Sim'}
                </button>
              </div>

              {/* Dynamic Showcase Container */}
              <div style={{
                background: '#070b13',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '16px',
                padding: activeViewTab === 'photo' ? '12px' : '24px',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.8)',
                overflow: 'hidden'
              }}>
                {activeViewTab === 'photo' ? (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '12px' }} 
                    />
                  </div>
                ) : (
                  <>
                    {product.mockupType === 'display' && (
                      <div className="display-mockup" style={{ width: '100%' }}>
                        <div className="top-row">
                          <div>LAP 3/8</div>
                          <div>04:22</div>
                          <div className="lap-status">BAT 78%</div>
                        </div>
                        <div className="main-time">{formatTime(simLapTime)}</div>
                        <div className="grid-stats">
                          <div className="stat-item">
                            <div className="stat-label">Target</div>
                            <div className="stat-value green">4:22.5</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-label">Best</div>
                            <div className="stat-value blue">4:18.2</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-label">Last</div>
                            <div className="stat-value">4:21.4</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-label">Avg</div>
                            <div className="stat-value orange">4:25.1</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {product.mockupType === 'nexus' && (
                      <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#38bdf8' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '16px' }}>
                          <span style={{ color: '#a855f7', fontWeight: 'bold' }}>[NEXUS-1] TELEMETRY HUB</span>
                          <span style={{ color: '#4ade80' }}>STATUS: ONLINE</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>4G LTE NETWORK</div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#38bdf8', marginTop: '4px' }}>
                              GLOBAL LTE ({simLteRssi} dBm)
                            </div>
                          </div>
                          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>GNSS POSITION</div>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#4ade80', marginTop: '4px' }}>
                              25Hz FIX (12 SATS)
                            </div>
                          </div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', fontSize: '11px', color: '#cbd5e1' }}>
                          <div>&gt; CAN Bus stream active: 100 msg/sec</div>
                          <div>&gt; IMU Accel: X: +0.02G, Y: -0.85G, Z: +1.01G</div>
                          <div>&gt; Internal Power: Li-Po 2000mAh (Charging 98%)</div>
                        </div>
                      </div>
                    )}

                    {product.mockupType === 'joulemeter' && (
                      <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#fbbf24' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', marginBottom: '16px' }}>
                          <span style={{ color: '#f59e0b', fontWeight: 'bold' }}>[JOULEMETER 24-BIT]</span>
                          <span style={{ color: '#4ade80' }}>ADS1256 ACTIVE</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>CURRENT READOUT</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#fbbf24', marginTop: '4px' }}>
                              {simCurrent} A
                            </div>
                          </div>
                          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                            <div style={{ fontSize: '10px', color: '#94a3b8' }}>BUS VOLTAGE</div>
                            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#38bdf8', marginTop: '4px' }}>
                              48.2 V
                            </div>
                          </div>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', fontSize: '11px', color: '#cbd5e1' }}>
                          <div>&gt; Instantaneous Power: {(simCurrent * 48.2).toFixed(1)} Watts</div>
                          <div>&gt; Total Energy Consumed: 142.8 Wh</div>
                          <div>&gt; Shunt Temp: 34°C (Manganin 0.1% Nominal)</div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Specs Summary Checklist */}
              <div style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                  Spesifikasi Utama:
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {product.keySpecs.map((spec, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#e2d6f5' }}>
                      <Check size={16} color="#A855F7" style={{ flexShrink: 0 }} />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Title, Details, Price & Actions */}
            <div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#F7941D', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {product.category}
              </span>
              <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', marginTop: '4px', marginBottom: '8px', fontFamily: 'var(--font-tech), sans-serif' }}>
                {product.name}
              </h1>
              <p style={{ fontSize: '16px', color: '#a855f7', fontWeight: 600, marginBottom: '20px' }}>
                {product.subtitle}
              </p>

              {/* Price Banner */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '16px',
                padding: '20px 24px',
                marginBottom: '24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Harga Resmi / Unit:
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-tech), sans-serif', marginTop: '2px' }}>
                    {product.price}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', color: '#10B981', backgroundColor: 'rgba(16, 185, 129, 0.15)', padding: '4px 10px', borderRadius: '12px', fontWeight: 600 }}>
                    {product.stockStatus}
                  </span>
                </div>
              </div>

              {/* Long Description */}
              <p style={{ fontSize: '15px', color: '#d1c4e9', lineHeight: '1.7', marginBottom: '32px' }}>
                {product.longDescription}
              </p>

              {/* CTA Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                <a 
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    fontSize: '15px',
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    boxShadow: '0 8px 20px rgba(37, 211, 102, 0.3)',
                    transition: 'all 0.2s'
                  }}
                >
                  <MessageSquare size={20} />
                  {lang === 'id' ? `Tanya / Pesan ${product.name} via WhatsApp` : `Order ${product.name} via WhatsApp`}
                </a>

                <Link 
                  href="/#contact"
                  className="btn btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    padding: '14px 24px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '14px'
                  }}
                >
                  <FileText size={18} />
                  {lang === 'id' ? 'Kirim Pesan Inquiry / Demo' : 'Send Inquiry Message'}
                </Link>
              </div>

              {/* Guarantee items */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9ca3af' }}>
                  <ShieldCheck size={16} color="#A855F7" />
                  <span>Garansi Resmi 1 Tahun</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9ca3af' }}>
                  <Radio size={16} color="#F7941D" />
                  <span>Dukungan Firmware Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features Grid Section */}
          <div style={{ marginBottom: '64px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '24px', fontFamily: 'var(--font-tech), sans-serif' }}>
              {lang === 'id' ? 'Fitur Unggulan & Kapabilitas' : 'Key Features & Capabilities'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
              {product.features.map((feat, idx) => (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(26, 10, 46, 0.6)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    borderRadius: '16px',
                    padding: '24px'
                  }}
                >
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(168, 85, 247, 0.15)',
                    color: '#A855F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}>
                    {renderIcon(feat.iconName)}
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#ffffff', marginBottom: '8px', fontFamily: 'var(--font-tech), sans-serif' }}>
                    {feat.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: '1.6' }}>
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Specs & In-The-Box Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', marginBottom: '64px' }}>
            {/* Technical Specs Table */}
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginBottom: '20px', fontFamily: 'var(--font-tech), sans-serif' }}>
                {lang === 'id' ? 'Spesifikasi Detail' : 'Detailed Specifications'}
              </h2>
              <div style={{
                background: 'rgba(26, 10, 46, 0.8)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '16px',
                overflow: 'hidden'
              }}>
                {product.specifications.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '12px 20px',
                      borderBottom: idx !== product.specifications.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
                    }}
                  >
                    <span style={{ fontSize: '13px', color: '#9ca3af', fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontSize: '13px', color: '#e2d6f5', fontWeight: 600, textAlign: 'right' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's In The Box */}
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginBottom: '20px', fontFamily: 'var(--font-tech), sans-serif' }}>
                {lang === 'id' ? 'Kelengkapan Paket (In The Box)' : 'What\'s Included'}
              </h2>
              <div style={{
                background: 'rgba(26, 10, 46, 0.8)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '16px',
                padding: '24px'
              }}>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {product.inTheBox.map((boxItem, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#e2d6f5' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(168, 85, 247, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <PackageCheck size={16} color="#A855F7" />
                      </div>
                      <span>{boxItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products Switcher */}
          <div style={{ borderTop: '1px solid rgba(168, 85, 247, 0.2)', paddingTop: '48px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff', marginBottom: '24px', textAlign: 'center', fontFamily: 'var(--font-tech), sans-serif' }}>
              {lang === 'id' ? 'Lini Perangkat Keras Lainnya' : 'Other Hardware Lineup'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              {otherProducts.map((other) => (
                <div 
                  key={other.slug}
                  style={{
                    background: 'rgba(26, 10, 46, 0.6)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', color: '#F7941D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {other.badge}
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginTop: '4px', marginBottom: '8px', fontFamily: 'var(--font-tech), sans-serif' }}>
                      {other.name}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px', lineHeight: '1.5' }}>
                      {other.description}
                    </p>
                  </div>
                  <Link 
                    href={`/products/${other.slug}`}
                    className="btn btn-outline-white"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 600
                    }}
                  >
                    Lihat {other.name} <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

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
