'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Mail, MessageSquare, ArrowLeft, ArrowRight, Globe, ShieldCheck, Zap, Radio, Sliders } from 'lucide-react';
import { PRODUCTS_DATA } from '@/lib/products';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Pelanggan';
  const email = searchParams.get('email') || 'synchrotechrace@gmail.com';
  const message = searchParams.get('message') || '';
  const [lang, setLang] = useState<'id' | 'en'>('id');

  const subject = `Kontak dari ${name} - SynchroTech`;
  const mailBody = `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`;
  
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=synchrotechrace@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
  const mailtoUrl = `mailto:synchrotechrace@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
  const waUrl = `https://wa.me/628132595764?text=${encodeURIComponent(`Halo SynchroTech, saya ${name} (${email}). Saya telah mengirim pesan melalui website: ${message}`)}`;

  const productsList = Object.values(PRODUCTS_DATA);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#120720', color: '#fff' }}>
      {/* Utility Top Bar */}
      <nav className="top-utility-bar" aria-label="Utility Links">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="links">
            <Link href="/">{lang === 'id' ? '← Kembali ke Beranda' : '← Back to Home'}</Link>
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
            <img 
              src="/logotype.png" 
              alt="SynchroTech" 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
            />
          </Link>
          <nav>
            <ul className="nav-menu" style={{ display: 'flex', gap: '24px', listStyle: 'none' }}>
              <li><Link href="/#products" style={{ color: '#e2d6f5' }}>{lang === 'id' ? 'Produk' : 'Products'}</Link></li>
              <li><Link href="/products/nexus-one" style={{ color: '#e2d6f5' }}>Nexus One</Link></li>
              <li><Link href="/#contact" style={{ color: '#e2d6f5' }}>{lang === 'id' ? 'Kontak' : 'Contact'}</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Thank You Card Section */}
      <main style={{ flex: 1, padding: '48px 0 80px' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          {/* Card Container */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(26, 10, 46, 0.95) 0%, rgba(45, 27, 78, 0.95) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            borderRadius: '24px',
            padding: '48px 36px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(168, 85, 247, 0.15)',
            textAlign: 'center',
            backdropFilter: 'blur(10px)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Ambient Background Glow */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(0,0,0,0) 70%)',
              pointerEvents: 'none'
            }} />

            {/* Checkmark Icon Circle */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #A855F7 0%, #9333EA 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              boxShadow: '0 0 30px rgba(168, 85, 247, 0.6), 0 4px 15px rgba(0, 0, 0, 0.3)'
            }}>
              <Check size={44} color="#ffffff" strokeWidth={3} />
            </div>

            <span style={{
              display: 'inline-block',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#A855F7',
              textTransform: 'uppercase',
              marginBottom: '8px'
            }}>
              {lang === 'id' ? 'TRANSMISI PESAN BERHASIL' : 'MESSAGE TRANSMISSION SUCCESSFUL'}
            </span>

            <h1 style={{
              fontSize: '32px',
              fontWeight: 800,
              fontFamily: 'var(--font-tech), sans-serif',
              marginBottom: '16px',
              color: '#ffffff'
            }}>
              {lang === 'id' ? `Terima Kasih, ${name}!` : `Thank You, ${name}!`}
            </h1>

            <p style={{
              fontSize: '16px',
              color: '#d1c4e9',
              lineHeight: '1.6',
              maxWidth: '620px',
              margin: '0 auto 32px'
            }}>
              {lang === 'id' ? (
                <>Pesan Anda telah berhasil kami terima. Tim teknis <strong>SynchroTech Racing</strong> akan segera meninjau dan merespons pertanyaan Anda melalui email <strong>{email}</strong>.</>
              ) : (
                <>Your message has been received. The <strong>SynchroTech Racing</strong> technical team will review and respond to your inquiry via <strong>{email}</strong> shortly.</>
              )}
            </p>

            {/* Details Box */}
            {message && (
              <div style={{
                background: 'rgba(18, 7, 32, 0.7)',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '16px',
                padding: '20px 24px',
                textAlign: 'left',
                marginBottom: '36px'
              }}>
                <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                  {lang === 'id' ? 'Ringkasan Pesan Terkirim:' : 'Sent Message Summary:'}
                </div>
                <div style={{ fontSize: '14px', color: '#e2d6f5', whiteSpace: 'pre-wrap', fontStyle: 'italic' }}>
                  "{message}"
                </div>
              </div>
            )}

            {/* Quick Actions Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '32px'
            }}>
              <a 
                href={gmailUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
              >
                <Mail size={18} />
                {lang === 'id' ? 'Buka Gmail (Web)' : 'Open Gmail (Web)'}
              </a>

              <a 
                href={waUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 20px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '14px',
                  backgroundColor: '#25D366',
                  color: '#ffffff',
                  transition: 'transform 0.2s, background-color 0.2s'
                }}
              >
                <MessageSquare size={18} />
                {lang === 'id' ? 'Chat via WhatsApp' : 'Chat via WhatsApp'}
              </a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link 
                href="/" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#d1c4e9',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  padding: '10px 20px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  transition: 'all 0.2s'
                }}
              >
                <ArrowLeft size={16} />
                {lang === 'id' ? 'Kembali ke Beranda' : 'Return to Homepage'}
              </Link>
            </div>
          </div>

          {/* Explore Product Catalog Section */}
          <div style={{ marginTop: '64px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span style={{ fontSize: '12px', color: '#F7941D', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {lang === 'id' ? 'EKSPLORASI PRODUK BALAP' : 'EXPLORE RACING HARDWARE'}
              </span>
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginTop: '6px', fontFamily: 'var(--font-tech), sans-serif' }}>
                {lang === 'id' ? 'Jelajahi Lini Perangkat Keras Telemetri' : 'Explore Telemetry Hardware Lineup'}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {productsList.map((prod) => (
                <div 
                  key={prod.slug}
                  style={{
                    background: 'rgba(26, 10, 46, 0.8)',
                    border: '1px solid rgba(168, 85, 247, 0.2)',
                    borderRadius: '16px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'transform 0.2s, border-color 0.2s'
                  }}
                >
                  <div>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      backgroundColor: prod.badgeType === 'blue' ? 'rgba(59, 130, 246, 0.2)' : prod.badgeType === 'purple' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                      color: prod.badgeType === 'blue' ? '#60A5FA' : prod.badgeType === 'purple' ? '#C084FC' : '#E5E7EB',
                      display: 'inline-block',
                      marginBottom: '12px'
                    }}>
                      {prod.badge}
                    </span>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', marginBottom: '4px', fontFamily: 'var(--font-tech), sans-serif' }}>
                      {prod.name}
                    </h3>
                    <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>
                      {prod.category}
                    </p>
                    <p style={{ fontSize: '13px', color: '#d1c4e9', lineHeight: '1.5', marginBottom: '20px' }}>
                      {prod.description}
                    </p>
                  </div>
                  <Link 
                    href={`/products/${prod.slug}`}
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
                    {lang === 'id' ? 'Detail Produk' : 'View Specs'} <ArrowRight size={14} />
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

export default function ThankYouPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#120720', color: '#fff' }}>
        <div>Loading thank you details...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
