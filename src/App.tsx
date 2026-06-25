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

  return (
    <div>
      {/* Top utility navigation */}
      <nav className="top-utility-bar" aria-label="Utility Links">
        <div className="container">
          <div className="links">
            <a href="#documentation">Documentation</a>
            <a href="#forum">Forum</a>
            <a href="#dealer">Dealer Portal</a>
          </div>
          <div className="global-selector" role="button" tabIndex={0}>
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
              <li><a href="#solutions">Solutions</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#community">Community</a></li>
            </ul>
          </nav>
          <div>
            <button className="btn btn-secondary">Buy Online</button>
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
              <button className="btn btn-outline-white" onClick={() => document.getElementById('software')?.scrollIntoView({ behavior: 'smooth' })}>
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
              <button className="btn btn-outline-dark">Learn More <ArrowRightIcon /></button>
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
              <button className="btn btn-secondary">Learn More <ArrowRightIcon /></button>
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
              <button className="btn btn-outline-dark">Learn More <ArrowRightIcon /></button>
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
              
              <a href="#podium" className="software-link">
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
              <h3>Kirim Pesan</h3>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label htmlFor="contact-name">Nama Lengkap</label>
                  <input type="text" id="contact-name" placeholder="Nama Anda" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Alamat Email</label>
                  <input type="email" id="contact-email" placeholder="nama@email.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">Pesan</label>
                  <textarea id="contact-message" rows={4} placeholder="Tuliskan pesan Anda di sini..." required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  Kirim Pesan <ArrowRightIcon />
                </button>
              </form>
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
              </div>
            </div>

            {/* Links Column 1: Products */}
            <div className="footer-column">
              <h3>Products</h3>
              <ul className="footer-links">
                <li><a href="#joulemeter">Joulemeter</a></li>
                <li><a href="#nexus-one">Nexus One</a></li>
                <li><a href="#display">Display</a></li>
                <li><a href="#hub-cables">Nexus Hub & Cables</a></li>
              </ul>
            </div>

            {/* Links Column 2: Support */}
            <div className="footer-column">
              <h3>Support</h3>
              <ul className="footer-links">
                <li><a href="#kb">Knowledge Base</a></li>
                <li><a href="#downloads">Software Downloads</a></li>
                <li><a href="#forum">Community Forum</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>

            {/* Brand connection & dropdown */}
            <div className="footer-column">
              <h3>Stay Connected</h3>
              <div className="social-links">
                <a href="#facebook" className="social-icon" aria-label="Facebook">
                  {/* Custom Facebook SVG Logo */}
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#twitter" className="social-icon" aria-label="Twitter/X">
                  {/* Custom X Logo SVG */}
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#youtube" className="social-icon" aria-label="YouTube">
                  {/* Custom Youtube SVG Logo */}
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
              <div>
                {/* Language Select button */}
                <button className="lang-selector">
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
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
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
