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

const translations = {
  en: {
    // Nav & Utilities
    documentation: "Documentation",
    forum: "Forum",
    dealerPortal: "Dealer Portal",
    buyOnline: "Buy Online",
    
    // Header Nav
    products: "Products",
    solutions: "Solutions",
    support: "Support",
    community: "Community",
    
    // Hero
    heroSubtitle: "From weekend track days to professional endurance racing. Capture, analyze, and optimize your performance with real-time data streaming and sub-millisecond precision.",
    exploreSystems: "EXPLORE SYSTEMS",
    viewDemo: "REQUEST DEMO",
    
    // Hardware lineup
    hardwareCategory: "Hardware Lineup",
    hardwareTitle: "Choose Your Performance Tier",
    hardwareSubtitle: "Three distinct systems engineered for specific racing environments.",
    
    // Cards
    energySpecialist: "Energy Specialist",
    joulemeterSubtitle: "Precision Energy Logger",
    mostPopular: "Most Popular",
    nexusSubtitle: "Brain & Mouth — 4G LTE Telemetry",
    driverCockpit: "Driver Cockpit",
    displaySubtitle: "The Eyes — Race-Grade Display",
    learnMore: "Learn More",
    
    // Features
    wirelessTitle: "Wireless Everything",
    wirelessDesc: "Seamless connectivity via WiFi, Bluetooth 5.0, and 4G LTE. Stream data to the pits without cables.",
    ioTitle: "Flexible I/O",
    ioDesc: "Connect any sensor. Configurable analog inputs, RPM frequency, PWM outputs, and digital switching.",
    imuTitle: "6-Axis IMU",
    imuDesc: "High-precision accelerometer and gyroscope for detailed G-force mapping, pitch, and roll analysis.",
    
    // Software
    softwareCategory: "Software",
    softwareDesc: "Visualize your data instantly. Our cloud-based platform allows pit crews to monitor vehicle health and lap times from anywhere in the world. Customize your layout with drag-and-drop widgets.",
    liveTelemetry: "Live Telemetry Streaming",
    historicalAnalysis: "Historical Session Analysis",
    socialComparison: "Social Sharing & Comparison",
    viewLiveDemo: "View Live Demo Dashboard",
    
    // Contact
    contactCategory: "Contact Us",
    contactTitle: "Contact Our Team",
    contactSubtitle: "Have questions about SynchroTech telemetry systems? Contact us directly.",
    detailTitle: "Contact & Workshop Details",
    detailDesc: "Please visit our workshop or contact us via WhatsApp/Email for quick support and product information.",
    addressLabel: "Address",
    whatsappLabel: "No. HP / WhatsApp",
    emailLabel: "Email",
    businessCategory: "Business Category",
    businessDesc: "Automotive Services, Tech Business",
    operationalHours: "Operational Hours",
    operationalDesc: "Monday - Saturday (Sunday: Closed)",
    
    // Form
    formTitle: "Send Message",
    fullName: "Full Name",
    namePlaceholder: "Your Name",
    emailPlaceholder: "name@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Write your message here...",
    sendMessage: "Send Message",
    sending: "Sending...",
    sentTitle: "Message Sent!",
    sentDesc: "Thank you {name}. We have opened Gmail in a new tab to send to {email}.",
    sentGmailBtn: "Open Gmail (Web)",
    sentOtherBtn: "Send via Other Email Client",
    sendAnother: "Send another message",
    
    // Footer
    footerDesc: "Advanced telemetry systems for racers who demand data-driven performance. Designed in Detroit, raced worldwide.",
    stayConnected: "Stay Connected",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",

    // Coming Soon
    systemUpdate: "SYSTEM UPDATE",
    comingSoonTitle: "COMING SOON",
    comingSoonDesc: "The page {page} is currently in active development to expand the SynchroTech ecosystem.",
    backToHome: "BACK TO HOMEPAGE",
    establishingTelemetry: "ESTABLISHING TELEMETRY STREAM... 87%"
  },
  id: {
    // Nav & Utilities
    documentation: "Dokumentasi",
    forum: "Forum",
    dealerPortal: "Portal Dealer",
    buyOnline: "Beli Online",
    
    // Header Nav
    products: "Produk",
    solutions: "Solusi",
    support: "Dukungan",
    community: "Komunitas",
    
    // Hero
    heroSubtitle: "Dari track day akhir pekan hingga balap ketahanan profesional. Rekam, analisis, dan tingkatkan performa Anda dengan streaming data real-time dan presisi sub-milidetik.",
    exploreSystems: "JELAJAHI SISTEM",
    viewDemo: "AJUKAN DEMO",
    
    // Hardware lineup
    hardwareCategory: "Lini Perangkat Keras",
    hardwareTitle: "Pilih Tingkat Performa Anda",
    hardwareSubtitle: "Tiga sistem berbeda yang dirancang khusus untuk lingkungan balapan tertentu.",
    
    // Cards
    energySpecialist: "Spesialis Energi",
    joulemeterSubtitle: "Perekam Energi Presisi",
    mostPopular: "Paling Populer",
    nexusSubtitle: "Otak & Mulut — Telemetri 4G LTE",
    driverCockpit: "Kokpit Pengemudi",
    displaySubtitle: "Mata — Layar Kelas Balap",
    learnMore: "Pelajari Selengkapnya",
    
    // Features
    wirelessTitle: "Serba Nirkabel",
    wirelessDesc: "Konektivitas tanpa hambatan via WiFi, Bluetooth 5.0, dan 4G LTE. Kirim data ke pit tanpa kabel.",
    ioTitle: "I/O Fleksibel",
    ioDesc: "Hubungkan sensor apa pun. Input analog yang dapat dikonfigurasi, frekuensi RPM, output PWM, dan pensaklaran digital.",
    imuTitle: "IMU 6-Axis",
    imuDesc: "Akselerometer dan giroskop presisi tinggi untuk pemetaan gaya G, analisis pitch, dan roll yang mendetail.",
    
    // Software
    softwareCategory: "Perangkat Lunak",
    softwareDesc: "Visualisasikan data Anda secara instan. Platform berbasis cloud kami memungkinkan kru pit memantau kesehatan kendaraan dan waktu lap dari mana saja di dunia. Sesuaikan tata letak Anda dengan widget drag-and-drop.",
    liveTelemetry: "Streaming Telemetri Langsung",
    historicalAnalysis: "Analisis Sesi Historis",
    socialComparison: "Berbagi Sosial & Perbandingan",
    viewLiveDemo: "Lihat Dasbor Demo Langsung",
    
    // Contact
    contactCategory: "Hubungi Kami",
    contactTitle: "Hubungi Tim Kami",
    contactSubtitle: "Ada pertanyaan mengenai sistem telemetri SynchroTech? Hubungi kami langsung.",
    detailTitle: "Detail Kontak & Workshop",
    detailDesc: "Silakan kunjungi workshop kami atau hubungi kami melalui WhatsApp/Email untuk dukungan cepat dan informasi produk.",
    addressLabel: "Alamat",
    whatsappLabel: "No. HP / WhatsApp",
    emailLabel: "Email",
    businessCategory: "Kategori Bisnis",
    businessDesc: "Layanan Otomotif, Bisnis Lain (Tech)",
    operationalHours: "Jam Operasional",
    operationalDesc: "Senin - Sabtu (Minggu: Tutup)",
    
    // Form
    formTitle: "Kirim Pesan",
    fullName: "Nama Lengkap",
    namePlaceholder: "Nama Anda",
    emailPlaceholder: "nama@email.com",
    messageLabel: "Pesan",
    messagePlaceholder: "Tuliskan pesan Anda di sini...",
    sendMessage: "Kirim Pesan",
    sending: "Mengirim...",
    sentTitle: "Pesan Terkirim!",
    sentDesc: "Terima kasih {name}. Kami telah membuka Gmail di tab baru untuk mengirim ke {email}.",
    sentGmailBtn: "Buka Gmail (Web)",
    sentOtherBtn: "Kirim via Aplikasi Email Lain",
    sendAnother: "Kirim pesan lain",
    
    // Footer
    footerDesc: "Sistem telemetri canggih untuk pembalap yang menuntut performa berbasis data. Dirancang di Detroit, diuji di lintasan balap dunia.",
    stayConnected: "Tetap Terhubung",
    privacyPolicy: "Kebijakan Privasi",
    termsOfService: "Syarat & Ketentuan",

    // Coming Soon
    systemUpdate: "PEMBARUAN SISTEM",
    comingSoonTitle: "SEGERA HADIR",
    comingSoonDesc: "Halaman {page} sedang dikembangkan untuk melengkapi sistem telemetri presisi SynchroTech.",
    backToHome: "KEMBALI KE BERANDA",
    establishingTelemetry: "MEMBANGUN ALIRAN TELEMETRI... 87%"
  }
};

export default function App() {
  // Lang state (defaults to Indonesian)
  const [lang, setLang] = useState<'en' | 'id'>('id');

  // Translation helper
  const t = (key: keyof typeof translations['en']) => {
    return translations[lang][key];
  };

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
        lang={lang}
      />
    );
  }

  return (
    <div>
      {/* Top utility navigation */}
      <nav className="top-utility-bar" aria-label="Utility Links">
        <div className="container">
          <div className="links">
            <a href="#documentation" onClick={(e) => triggerComingSoon(e, t('documentation'))}>{t('documentation')}</a>
            <a href="#forum" onClick={(e) => triggerComingSoon(e, t('forum'))}>{t('forum')}</a>
            <a href="#dealer" onClick={(e) => triggerComingSoon(e, t('dealerPortal'))}>{t('dealerPortal')}</a>
          </div>
          <div className="global-selector" role="button" tabIndex={0} onClick={() => setLang(lang === 'en' ? 'id' : 'en')}>
            <Globe size={12} />
            <span>{lang === 'en' ? 'English (EN)' : 'Bahasa Indonesia (ID)'}</span>
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
              <li><a href="#products">{t('products')}</a></li>
              <li><a href="#solutions" onClick={(e) => triggerComingSoon(e, t('solutions'))}>{t('solutions')}</a></li>
              <li><a href="#support" onClick={(e) => triggerComingSoon(e, t('support'))}>{t('support')}</a></li>
              <li><a href="#community" onClick={(e) => triggerComingSoon(e, t('community'))}>{t('community')}</a></li>
            </ul>
          </nav>
          <div>
            <button className="btn btn-secondary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>{t('buyOnline')}</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" aria-label="Welcome">
        <div className="container">
          <div className="hero-content">
            <h1>
              {lang === 'en' ? (
                <>
                  Precision <br />
                  Telemetry For <br />
                  <span className="text-purple">Every Track Level</span>
                </>
              ) : (
                <>
                  Telemetri <br />
                  Presisi Untuk <br />
                  <span className="text-purple">Setiap Level Lintasan</span>
                </>
              )}
            </h1>
            <p>{t('heroSubtitle')}</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('exploreSystems')} <ArrowRightIcon />
              </button>
              <button className="btn btn-outline-white" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
                {t('viewDemo')} <Play size={14} fill="white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Lineup Section */}
      <section id="products" className="hardware-section" aria-labelledby="hardware-title">
        <div className="container">
          <div className="section-header">
            <span className="category">{t('hardwareCategory')}</span>
            <h2 id="hardware-title">{t('hardwareTitle')}</h2>
            <p>{t('hardwareSubtitle')}</p>
          </div>

          <div className="card-grid">
            {/* Card 1: Joulemeter */}
            <article className="card">
              <span className="card-badge badge-dark">{t('energySpecialist')}</span>
              <div className="card-media media-placeholder">
                <div className="coming-soon">Coming Soon</div>
                <div className="sub-text">Product photo in production</div>
              </div>
              <h3>Joulemeter</h3>
              <p className="card-subtitle">{t('joulemeterSubtitle')}</p>
              <ul className="card-features">
                <li><Check /> ADS1256 24-bit ADC</li>
                 <li><Check /> Manganin Shunt 50A (0.1%)</li>
                <li><Check /> Isolated CAN + WiFi/BLE</li>
              </ul>
              <button className="btn btn-outline-dark" onClick={(e) => triggerComingSoon(e, `Joulemeter - ${t('learnMore')}`)}>{t('learnMore')} <ArrowRightIcon /></button>
            </article>

            {/* Card 2: Nexus One (Highlighted / Popular) */}
            <article className="card highlighted">
              <span className="card-badge badge-blue">{t('mostPopular')}</span>
              <div className="card-media media-placeholder">
                <div className="coming-soon">Coming Soon</div>
                <div className="sub-text">Product photo in production</div>
              </div>
              <h3>Nexus One</h3>
              <p className="card-subtitle blue">{t('nexusSubtitle')}</p>
              <ul className="card-features">
                <li><Check /> 4G LTE Global (T-SIM7600G-H)</li>
                <li><Check /> u-blox NEO-M9N 25Hz GNSS</li>
                <li><Check /> Standalone Li-Po 2000mAh</li>
                <li><Check /> Auto-Charging via M12 IP67</li>
              </ul>
              <button className="btn btn-secondary" onClick={(e) => triggerComingSoon(e, `Nexus One - ${t('learnMore')}`)}>{t('learnMore')} <ArrowRightIcon /></button>
            </article>

            {/* Card 3: Display (Feature rich, live dynamic mockup) */}
            <article className="card">
              <span className="card-badge badge-purple">{t('driverCockpit')}</span>
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
              <p className="card-subtitle">{t('displaySubtitle')}</p>
              <ul className="card-features">
                <li className="purple-icon"><Check /> 5 View Modes (Race / Lap / Energy)</li>
                <li className="purple-icon"><Check /> Auto Day/Night Theme via ALS</li>
                <li className="purple-icon"><Check /> Cross-Venue Auto-Scaling</li>
              </ul>
              <button className="btn btn-outline-dark" onClick={(e) => triggerComingSoon(e, `Display - ${t('learnMore')}`)}>{t('learnMore')} <ArrowRightIcon /></button>
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
              <h3>{t('wirelessTitle')}</h3>
              <p>{t('wirelessDesc')}</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon-wrapper icon-purple-bg">
                <Sliders />
              </div>
              <h3>{t('ioTitle')}</h3>
              <p>{t('ioDesc')}</p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon-wrapper icon-green-bg">
                <Cpu />
              </div>
              <h3>{t('imuTitle')}</h3>
              <p>{t('imuDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Software Podium Dashboard Preview Section */}
      <section id="software" className="software-section" aria-labelledby="software-title">
        <div className="container">
          <div className="software-grid">
            <div className="software-info">
              <span className="category">{t('softwareCategory')}</span>
              <h2 id="software-title">
                {lang === 'en' ? (
                  <>Real-Time Insight: <br />The Podium Dashboard</>
                ) : (
                  <>Wawasan Real-Time: <br />Dasbor Podium</>
                )}
              </h2>
              <p>{t('softwareDesc')}</p>
              
              <ul className="software-features-list">
                <li className="software-feature-item">
                  <div className="software-feature-icon">
                    <Activity />
                  </div>
                  <div className="software-feature-text">{t('liveTelemetry')}</div>
                </li>
                <li className="software-feature-item">
                  <div className="software-feature-icon">
                    <RefreshCw />
                  </div>
                  <div className="software-feature-text">{t('historicalAnalysis')}</div>
                </li>
                <li className="software-feature-item">
                  <div className="software-feature-icon">
                    <Share2 />
                  </div>
                  <div className="software-feature-text">{t('socialComparison')}</div>
                </li>
              </ul>
              
              <a href="#podium" className="software-link" onClick={(e) => triggerComingSoon(e, t('viewLiveDemo'))}>
                {t('viewLiveDemo')} <ExternalLink size={14} />
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
            <span className="category">{t('contactCategory')}</span>
            <h2 id="contact-title">{t('contactTitle')}</h2>
            <p>{t('contactSubtitle')}</p>
          </div>

          <div className="contact-grid">
            {/* Contact Info Card */}
            <div className="contact-info-card">
              <h3>{t('detailTitle')}</h3>
              <p className="contact-desc">{t('detailDesc')}</p>
              
              <div className="contact-details-list">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>{t('addressLabel')}</h4>
                    <p>Jl. St., Karanggeringging, Sumpiuh, Kec. Sumpiuh, Kabupaten Banyumas, Jawa Tengah 53195, Indonesia</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Phone size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>{t('whatsappLabel')}</h4>
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
                    <h4>{t('emailLabel')}</h4>
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
                    <h4>{t('businessCategory')}</h4>
                    <p>{t('businessDesc')}</p>
                  </div>
                </div>

                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <Globe size={20} />
                  </div>
                  <div className="contact-detail-text">
                    <h4>{t('operationalHours')}</h4>
                    <p>{t('operationalDesc')}</p>
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
                  <h3>{t('sentTitle')}</h3>
                  <p>
                    {t('sentDesc').replace('{name}', contactName).replace('{email}', 'synchrotechrace@gmail.com')}
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
                      {t('sentGmailBtn')}
                    </a>
                    <a 
                      href={getMailtoUrl()} 
                      className="btn btn-outline-dark w-full"
                      style={{ border: '1px solid rgba(0, 0, 0, 0.15)' }}
                    >
                      {t('sentOtherBtn')}
                    </a>
                  </div>
                  <button onClick={handleResetForm} className="btn-link" style={{ marginTop: '16px' }}>
                    {t('sendAnother')}
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">{t('fullName')}</label>
                    <input 
                      type="text" 
                      id="contact-name" 
                      placeholder={t('namePlaceholder')} 
                      required 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      disabled={submitStatus === 'submitting'}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">{t('emailLabel')}</label>
                    <input 
                      type="email" 
                      id="contact-email" 
                      placeholder={t('emailPlaceholder')} 
                      required 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      disabled={submitStatus === 'submitting'}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">{t('messageLabel')}</label>
                    <textarea 
                      id="contact-message" 
                      rows={4} 
                      placeholder={t('messagePlaceholder')} 
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
                        <RefreshCw size={14} className="spinner" /> {t('sending')}
                      </>
                    ) : (
                      <>
                        {t('sendMessage')} <ArrowRightIcon />
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
              <p style={{ marginBottom: '16px' }}>{t('footerDesc')}</p>
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
              <h3>{t('products')}</h3>
              <ul className="footer-links">
                <li><a href="#joulemeter" onClick={(e) => triggerComingSoon(e, `${t('products')} - Joulemeter`)}>Joulemeter</a></li>
                <li><a href="#nexus-one" onClick={(e) => triggerComingSoon(e, `${t('products')} - Nexus One`)}>Nexus One</a></li>
                <li><a href="#display" onClick={(e) => triggerComingSoon(e, `${t('products')} - Display`)}>Display</a></li>
                <li><a href="#hub-cables" onClick={(e) => triggerComingSoon(e, `${t('products')} - Nexus Hub & Cables`)}>Nexus Hub & Cables</a></li>
              </ul>
            </div>

            {/* Links Column 2: Support */}
            <div className="footer-column">
              <h3>{t('support')}</h3>
              <ul className="footer-links">
                <li><a href="#kb" onClick={(e) => triggerComingSoon(e, t('documentation'))}>{t('documentation')}</a></li>
                <li><a href="#downloads" onClick={(e) => triggerComingSoon(e, 'Downloads')}>{t('forum')}</a></li>
                <li><a href="#forum" onClick={(e) => triggerComingSoon(e, t('forum'))}>{t('forum')}</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>{t('contactCategory')}</a></li>
              </ul>
            </div>

            {/* Brand connection & dropdown */}
            <div className="footer-column">
              <h3>{t('stayConnected')}</h3>
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
                <button className="lang-selector" onClick={() => setLang(lang === 'en' ? 'id' : 'en')}>
                  <Globe size={14} />
                  <span>{lang === 'en' ? 'English (US)' : 'Bahasa Indonesia (ID)'}</span>
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
              <a href="#privacy" onClick={(e) => triggerComingSoon(e, t('privacyPolicy'))}>{t('privacyPolicy')}</a>
              <a href="#terms" onClick={(e) => triggerComingSoon(e, t('termsOfService'))}>{t('termsOfService')}</a>
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
  lang: 'en' | 'id';
}

function ComingSoon({ pageName, onClose, lang }: ComingSoonProps) {
  const t = (key: keyof typeof translations['en']) => {
    return translations[lang][key];
  };

  return (
    <div className="coming-soon-page">
      <div className="grid-bg"></div>
      <div className="glow-orb glow-1"></div>
      <div className="glow-orb glow-2"></div>
      
      <div className="coming-soon-content">
        <div className="coming-soon-icon">
          <Cpu className="pulse-icon" size={48} />
        </div>
        <span className="category">{t('systemUpdate')}</span>
        <h1>{t('comingSoonTitle')}</h1>
        <p className="coming-soon-desc">
          {t('comingSoonDesc').replace('{page}', pageName)}
        </p>
        
        <div className="loading-bar-container">
          <div className="loading-bar-progress"></div>
          <div className="loading-bar-text">{t('establishingTelemetry')}</div>
        </div>

        <button className="btn btn-primary" onClick={onClose}>
          {t('backToHome')}
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
