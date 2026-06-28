import { useState, useEffect } from 'react';
import { 
  Check, 
  Globe, 
  Radio, 
  Cpu, 
  Activity, 
  RefreshCw, 
  Share2, 
  ExternalLink,
  Play,
  Sliders,
  MapPin,
  Phone
} from 'lucide-react';

export default function App() {
  // Live simulation states
  const [lapTime, setLapTime] = useState(0);

  // Contact Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Coming Soon page state
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonPage, setComingSoonPage] = useState('');

  const triggerComingSoon = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>, pageName: string) => {
    e.preventDefault();
    setComingSoonPage(pageName);
    setShowComingSoon(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setSubmitStatus('submitting');
    
    // ponytail: simulate API request with simple timeout, upgrade to real endpoint when ready
    setTimeout(() => {
      setSubmitStatus('success');
      // ponytail: open Gmail compose tab in browser
      window.open(getGmailUrl(), '_blank');
    }, 1200);
  };

  const handleResetForm = () => {
    setContactName('');
    setContactEmail('');
    setContactMessage('');
    setSubmitStatus('idle');
  };

  const getMailtoUrl = () => {
    const subject = `Kontak dari ${contactName} - SynchroTech`;
    const body = `Nama: ${contactName}\nEmail: ${contactEmail}\n\nPesan:\n${contactMessage}`;
    return `mailto:synchrotechrace@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const getGmailUrl = () => {
    const subject = `Kontak dari ${contactName} - SynchroTech`;
    const body = `Nama: ${contactName}\nEmail: ${contactEmail}\n\nPesan:\n${contactMessage}`;
    return `https://mail.google.com/mail/?view=cm&fs=1&to=synchrotechrace@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Update Lap timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setLapTime(prev => {
        const next = prev + 0.1;
        return parseFloat(next.toFixed(1));
      });
    }, 100);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  // Format running lap time to M:SS.S
  const formatTime = (timeInSeconds: number) => {
    // Offset standard start time (4:22.3 is typical from screenshots)
    const baseTime = 262.3 + timeInSeconds;
    const minutes = Math.floor(baseTime / 60);
    const seconds = (baseTime % 60).toFixed(1);
    return `${minutes}:${parseFloat(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  if (showComingSoon) {
    return (
      <ComingSoon 
        pageName={comingSoonPage} 
        onClose={() => setShowComingSoon(false)} 
      />
    );
  }

  return (
    <div>
      {/* Top utility navigation */}
      <nav className="top-utility-bar" aria-label="Utility Links">
        <div className="container">
          <div className="links">
            <a href="#documentation" onClick={(e) => triggerComingSoon(e, 'Documentation & APIs')}>Documentation</a>
            <a href="#forum" onClick={(e) => triggerComingSoon(e, 'Community Forum')}>Forum</a>
            <a href="#dealer" onClick={(e) => triggerComingSoon(e, 'Dealer Portal')}>Dealer Portal</a>
          </div>
          <div className="global-selector" role="button" tabIndex={0} onClick={(e) => triggerComingSoon(e, 'Global Language Selector')}>
            <Globe size={12} />
            <span>Global (EN)</span>
          </div>
        </div>
      </nav>

      {/* Main header navbar */}
      <header className="main-header">
        <div className="container">
          <a href="/" className="logo" aria-label="SynchroTech Homepage">
            <img 
              src="/logotype.png" 
              alt="SynchroTech" 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
            />
          </a>
          <nav aria-label="Main Navigation">
            <ul className="nav-menu">
              <li><a href="#products">Products</a></li>
              <li><a href="#solutions" onClick={(e) => triggerComingSoon(e, 'Solutions')}>Solutions</a></li>
              <li><a href="#support" onClick={(e) => triggerComingSoon(e, 'Technical Support Services')}>Support</a></li>
              <li><a href="#community" onClick={(e) => triggerComingSoon(e, 'Community Hub')}>Community</a></li>
            </ul>
          </nav>
          <div>
            <button className="btn btn-secondary" onClick={(e) => triggerComingSoon(e, 'Online Shopping Store')}>Buy Online</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" aria-label="Welcome">
        <div className="container">
          <div className="hero-content">
            <h1>
              Precision <br />
              Telemetry For <br />
              <span className="text-purple">Every Track Level</span>
            </h1>
            <p>
              From weekend track days to professional endurance racing. Capture, 
              analyze, and optimize your performance with real-time data streaming and 
              sub-millisecond precision.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                EXPLORE SYSTEMS <ArrowRightIcon />
              </button>
              <button className="btn btn-outline-white" onClick={(e) => triggerComingSoon(e, 'Interactive Telemetry Software Demo Video')}>
                VIEW DEMO <Play size={14} fill="white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Lineup Section */}
      <section id="products" className="hardware-section" aria-labelledby="hardware-title">
        <div className="container">
          <div className="section-header">
            <span className="category">Hardware Lineup</span>
            <h2 id="hardware-title">Choose Your Performance Tier</h2>
            <p>Three distinct systems engineered for specific racing environments.</p>
          </div>

          <div className="card-grid">
            {/* Card 1: Joulemeter */}
            <article className="card">
              <span className="card-badge badge-dark">Energy Specialist</span>
              <div className="card-media media-placeholder">
                <div className="coming-soon">Coming Soon</div>
                <div className="sub-text">Product photo in production</div>
              </div>
              <h3>Joulemeter</h3>
              <p className="card-subtitle">Precision Energy Logger</p>
              <ul className="card-features">
                <li><Check /> ADS1256 24-bit ADC</li>
                 <li><Check /> Manganin Shunt 50A (0.1%)</li>
                <li><Check /> Isolated CAN + WiFi/BLE</li>
              </ul>
              <button className="btn btn-outline-dark" onClick={(e) => triggerComingSoon(e, 'Joulemeter Precision Logger Details')}>Learn More <ArrowRightIcon /></button>
            </article>
 
            {/* Card 2: Nexus One (Highlighted / Popular) */}
            <article className="card highlighted">
              <span className="card-badge badge-blue">Most Popular</span>
              <div className="card-media media-placeholder">
                <div className="coming-soon">Coming Soon</div>
                <div className="sub-text">Product photo in production</div>
              </div>
              <h3>Nexus One</h3>
              <p className="card-subtitle blue">Brain & Mouth — 4G LTE Telemetry</p>
              <ul className="card-features">
                <li><Check /> 4G LTE Global (T-SIM7600G-H)</li>
                <li><Check /> u-blox NEO-M9N 25Hz GNSS</li>
                <li><Check /> Standalone Li-Po 2000mAh</li>
                <li><Check /> Auto-Charging via M12 IP67</li>
              </ul>
              <button className="btn btn-secondary" onClick={(e) => triggerComingSoon(e, 'Nexus One 4G LTE Transceiver Details')}>Learn More <ArrowRightIcon /></button>
            </article>
 
            {/* Card 3: Display (Feature rich, live dynamic mockup) */}
            <article className="card">
              <span className="card-badge badge-purple">Driver Cockpit</span>
              <div className="card-media">
                {/* Embedded live digital racing dashboard interface */}
                <div className="display-mockup" aria-label="Simulated display device screen">
                  <div className="top-row">
                    <div>LAP 3/8</div>
                    <div>04:22</div>
                    <div className="lap-status">BAT 78%</div>
                  </div>
                  <div className="main-time">{formatTime(lapTime)}</div>
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
              </div>
              <h3>Display</h3>
              <p className="card-subtitle">The Eyes — Race-Grade Display</p>
              <ul className="card-features">
                <li className="purple-icon"><Check /> 5 View Modes (Race / Lap / Energy)</li>
                <li className="purple-icon"><Check /> Auto Day/Night Theme via ALS</li>
                <li className="purple-icon"><Check /> Cross-Venue Auto-Scaling</li>
              </ul>
              <button className="btn btn-outline-dark" onClick={(e) => triggerComingSoon(e, 'Race-Grade Cockpit Display Details')}>Learn More <ArrowRightIcon /></button>
            </article>
          </div>
        </div>
      </section>

      {/* Hardware Features Section */}
      <section className="features-section" aria-label="Key Features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-wrapper icon-blue-bg">
                <Radio />
              </div>
              <h3>Wireless Everything</h3>
              <p>
                Seamless connectivity via WiFi, Bluetooth 5.0, and 4G LTE. 
                Stream data to the pits without cables.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon-wrapper icon-purple-bg">
                <Sliders />
              </div>
              <h3>Flexible I/O</h3>
              <p>
                Connect any sensor. Configurable analog inputs, RPM frequency, 
                PWM outputs, and digital switching.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon-wrapper icon-green-bg">
                <Cpu />
              </div>
              <h3>6-Axis IMU</h3>
              <p>
                High-precision accelerometer and gyroscope for detailed G-force 
                mapping, pitch, and roll analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Software Podium Dashboard Preview Section */}
      <section id="software" className="software-section" aria-labelledby="software-title">
        <div className="container">
          <div className="software-grid">
            <div className="software-info">
              <span className="category">Software</span>
              <h2 id="software-title">Real-Time Insight: <br />The Podium Dashboard</h2>
              <p>
                Visualize your data instantly. Our cloud-based platform allows pit 
                crews to monitor vehicle health and lap times from anywhere in the world. 
                Customize your layout with drag-and-drop widgets.
              </p>
              
              <ul className="software-features-list">
                <li className="software-feature-item">
                  <div className="software-feature-icon">
                    <Activity />
                  </div>
                  <div className="software-feature-text">Live Telemetry Streaming</div>
                </li>
                <li className="software-feature-item">
                  <div className="software-feature-icon">
                    <RefreshCw />
                  </div>
                  <div className="software-feature-text">Historical Session Analysis</div>
                </li>
                <li className="software-feature-item">
                  <div className="software-feature-icon">
                    <Share2 />
                  </div>
                  <div className="software-feature-text">Social Sharing & Comparison</div>
                </li>
              </ul>
              
              <a href="#podium" className="software-link" onClick={(e) => triggerComingSoon(e, 'Live Telemetry Dashboard Sandbox')}>
                View Live Demo Dashboard <ExternalLink size={14} />
              </a>
            </div>

            {/* Premium Browser Telemetry Dashboard Mockup */}
            <div className="browser-shell" aria-label="Mockup window showing real-time dashboard app">
              <div className="browser-header">
                <div className="browser-dots">
                  <span className="browser-dot dot-red" />
                  <span className="browser-dot dot-yellow" />
                  <span className="browser-dot dot-green" />
                </div>
                <div className="browser-title">SynchroTech Podium - Live Session: LAGUNA_SECA_04</div>
                <div style={{ width: '38px' }} />
              </div>
              
              <div className="video-container" style={{ position: 'relative', width: '100%', background: '#070b13' }}>
                <video 
                  src="/video/demo.webm" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section" aria-labelledby="contact-title">
        <div className="container">
          <div className="section-header">
            <span className="category">Hubungi Kami</span>
            <h2 id="contact-title">Contact Our Team</h2>
            <p>Ada pertanyaan mengenai sistem telemetri SynchroTech? Hubungi kami langsung.</p>
          </div>

          <div className="contact-grid">
            {/* Contact Info Card */}
            <div className="contact-info-card">
              <h3>Detail Kontak & Workshop</h3>
              <p className="contact-desc">
                Silakan kunjungi workshop kami atau hubungi kami melalui WhatsApp untuk dukungan cepat dan informasi produk.
              </p>
              
              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Alamat</h4>
                    <p>Jl. St., Karanggeringging, Sumpiuh, Kec. Sumpiuh, Kabupaten Banyumas, Jawa Tengah 53195, Indonesia</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Phone size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>No. HP / WhatsApp</h4>
                    <p>
                      <a href="https://wa.me/628132595764" target="_blank" rel="noopener noreferrer" className="contact-link">
                        +62 813-2595-764
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div className="contact-detail-text">
                    <h4>Email</h4>
                    <p>
                      <a href="mailto:synchrotechrace@gmail.com" className="contact-link">
                        synchrotechrace@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Activity size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Kategori Bisnis</h4>
                    <p>Layanan Otomotif, Bisnis Lain (Tech)</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Globe size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>Jam Operasional</h4>
                    <p>Senin - Sabtu (Minggu: Tutup)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="contact-form-card">
              {submitStatus === 'success' ? (
                <div className="contact-success-view">
                  <div className="success-icon-circle">
                    <Check size={32} strokeWidth={3} />
                  </div>
                  <h3>Pesan Terkirim!</h3>
                  <p>
                    Terima kasih <strong>{contactName}</strong>. Kami telah membuka Gmail di tab baru untuk mengirim ke <strong>synchrotechrace@gmail.com</strong>.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                    <a 
                      href={getGmailUrl()} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary w-full"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      Buka Gmail (Web)
                    </a>
                    <a 
                      href={getMailtoUrl()} 
                      className="btn btn-outline-dark w-full"
                      style={{ border: '1px solid rgba(0, 0, 0, 0.15)' }}
                    >
                      Kirim via Aplikasi Email Lain
                    </a>
                  </div>
                  <button onClick={handleResetForm} className="btn-link" style={{ marginTop: '16px' }}>
                    Kirim pesan lain
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Nama Lengkap</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      placeholder="Nama Anda" 
                      required 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      disabled={submitStatus === 'submitting'}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Alamat Email</label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      placeholder="nama@email.com" 
                      required 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      disabled={submitStatus === 'submitting'}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">Pesan</label>
                    <textarea 
                      id="contact-message" 
                      rows={4} 
                      placeholder="Tuliskan pesan Anda di sini..." 
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      disabled={submitStatus === 'submitting'}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="btn btn-primary w-full"
                    disabled={submitStatus === 'submitting'}
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <RefreshCw size={14} className="spinner" /> Mengirim...
                      </>
                    ) : (
                      <>
                        Kirim Pesan <ArrowRightIcon />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Red themed Footer Section */}
      <footer className="footer" aria-label="Footer">
        <div className="container">
          <div className="footer-main">
            {/* Brand details */}
            <div className="footer-brand">
              <h2>SYNCHROTECH</h2>
              <p style={{ marginBottom: '16px' }}>
                Advanced telemetry systems for racers who demand data-driven performance. 
                Designed in Detroit, raced worldwide.
              </p>
              <div className="footer-contact-details" style={{ fontSize: '12px', opacity: 0.85, display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '16px' }}>
                <span style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <MapPin size={14} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>Jl. St., Karanggeringging, Sumpiuh, Kec. Sumpiuh, Kabupaten Banyumas, Jawa Tengah 53195, Indonesia</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone size={14} style={{ flexShrink: 0 }} />
                  <a href="https://wa.me/628132595764" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>+62 813-2595-764</a>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href="mailto:synchrotechrace@gmail.com" style={{ textDecoration: 'underline' }}>synchrotechrace@gmail.com</a>
                </span>
              </div>
            </div>

            {/* Links Column 1: Products */}
            <div className="footer-column">
              <h3>Products</h3>
              <ul className="footer-links">
                <li><a href="#joulemeter" onClick={(e) => triggerComingSoon(e, 'Joulemeter product page')}>Joulemeter</a></li>
                <li><a href="#nexus-one" onClick={(e) => triggerComingSoon(e, 'Nexus One product page')}>Nexus One</a></li>
                <li><a href="#display" onClick={(e) => triggerComingSoon(e, 'Race-Grade Cockpit Display details')}>Display</a></li>
                <li><a href="#hub-cables" onClick={(e) => triggerComingSoon(e, 'Hubs & Cables accessories')}>Nexus Hub & Cables</a></li>
              </ul>
            </div>

            {/* Links Column 2: Support */}
            <div className="footer-column">
              <h3>Support</h3>
              <ul className="footer-links">
                <li><a href="#kb" onClick={(e) => triggerComingSoon(e, 'Knowledge Base & APIs')}>Knowledge Base</a></li>
                <li><a href="#downloads" onClick={(e) => triggerComingSoon(e, 'Software & Firmware Downloads')}>Software Downloads</a></li>
                <li><a href="#forum" onClick={(e) => triggerComingSoon(e, 'Community Forum')}>Community Forum</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact Us</a></li>
              </ul>
            </div>

            {/* Brand connection & dropdown */}
            <div className="footer-column">
              <h3>Stay Connected</h3>
              <div className="social-links">
                <a 
                  href="https://www.instagram.com/synchrotechrace?igsh=MTNpeWxvaGJpZGVqZw==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon" 
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.tiktok.com/@synchrotech5?_r=1&_t=ZS-97aTFNxtGYq" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon" 
                  aria-label="TikTok"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.41-.43-.58-.67-.02 2.44-.01 4.88-.01 7.32-.03 1.2-.34 2.39-.92 3.44-1.12 2.03-3.41 3.28-5.72 3.16-2.58-.1-4.91-1.89-5.49-4.41-.74-3.18 1.09-6.6 4.25-7.39.46-.11.93-.17 1.4-.18v3.91c-1.5.06-2.91.99-3.44 2.41-.66 1.75.24 3.86 1.99 4.5 1.75.64 3.85-.25 4.49-2 .14-.38.21-.78.2-1.18V0l.04.02z"/>
                  </svg>
                </a>
                <a 
                  href="https://youtube.com/@synchrotech-y3e?si=3NjO-7c4f9GxW33W" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-icon" 
                  aria-label="YouTube"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
              <div>
                {/* Language Select button */}
                <button className="lang-selector" onClick={(e) => triggerComingSoon(e, 'Language & Region Selector')}>
                  <Globe size={14} />
                  <span>English (US)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom elements */}
          <div className="footer-bottom">
            <div>
              © 2023 SynchroTech Racing Systems. All rights reserved.
            </div>
            <div className="footer-bottom-links">
              <a href="#privacy" onClick={(e) => triggerComingSoon(e, 'Privacy Policy')}>Privacy Policy</a>
              <a href="#terms" onClick={(e) => triggerComingSoon(e, 'Terms of Service')}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Coming Soon Page Component
interface ComingSoonProps {
  pageName: string;
  onClose: () => void;
}

function ComingSoon({ pageName, onClose }: ComingSoonProps) {
  return (
    <div className="coming-soon-page">
      <div className="grid-bg"></div>
      <div className="glow-orb glow-1"></div>
      <div className="glow-orb glow-2"></div>
      
      <div className="coming-soon-content">
        <div className="coming-soon-icon">
          <Cpu className="pulse-icon" size={48} />
        </div>
        <span className="category">SYSTEM UPDATE</span>
        <h1>COMING SOON</h1>
        <p className="coming-soon-desc">
          Halaman <strong>{pageName}</strong> sedang dikembangkan untuk melengkapi sistem telemetri presisi SynchroTech.
        </p>
        
        <div className="loading-bar-container">
          <div className="loading-bar-progress"></div>
          <div className="loading-bar-text">ESTABLISHING TELEMETRY STREAM... 87%</div>
        </div>

        <button className="btn btn-primary" onClick={onClose}>
          KEMBALI KE BERANDA
        </button>
      </div>
    </div>
  );
}

// Inline component for custom icon arrows
function ArrowRightIcon() {
  return (
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      style={{ marginLeft: '4px' }}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
