import { useState, useEffect, useRef } from 'react';
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
  Sliders
} from 'lucide-react';

export default function App() {
  // Live simulation states
  const [speed, setSpeed] = useState(222);
  const [voltage, setVoltage] = useState(404.7);
  const [battTemp, setBattTemp] = useState(39.6);
  const [motorTemp, setMotorTemp] = useState(67.2);
  const [soc, setSoc] = useState(83);
  const [lapTime, setLapTime] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "[22:51:38] ABS system active",
    "[22:51:50] Inverter temp normal",
    "[22:52:10] u-blox NEO-M9N GNSS 3D Fix (19 Sats)",
    "[22:52:35] Telemetry uplink: 4G LTE Connected",
    "[22:52:48] Isolated CAN packet freq: 852Hz",
    "[22:53:02] Lap 3 split +0.12s vs best"
  ]);

  const consolePanelRef = useRef<HTMLDivElement>(null);

  // Periodically update telemetry values
  useEffect(() => {
    const telemetryInterval = setInterval(() => {
      setSpeed(prev => {
        const change = Math.floor(Math.random() * 7) - 3;
        const next = prev + change;
        return next > 240 ? 240 : next < 205 ? 205 : next;
      });
      setVoltage(prev => {
        const next = prev + (Math.random() * 0.4 - 0.2);
        return parseFloat(next.toFixed(1));
      });
      setBattTemp(prev => {
        const next = prev + (Math.random() * 0.2 - 0.1);
        return parseFloat(next.toFixed(1));
      });
      setMotorTemp(prev => {
        const next = prev + (Math.random() * 0.4 - 0.2);
        return parseFloat(next.toFixed(1));
      });
      setSoc(prev => {
        if (Math.random() > 0.8) {
          return prev > 10 ? prev - 1 : 99; // Slowly deplete battery
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(telemetryInterval);
  }, []);

  // Update Lap timer and scrolling log messages
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setLapTime(prev => {
        const next = prev + 0.1;
        return parseFloat(next.toFixed(1));
      });
    }, 100);

    const logMessages = [
      "SOC battery core temperature safe",
      "CAN-bus busload: 34%",
      "GPS Position accuracy < 0.8m",
      "4G LTE signal: Excellent (-68dBm)",
      "IMU G-Force Peak: 1.84G lateral",
      "Wheel speed slip correction active",
      "Telemetry streaming to podium backend",
      "Yaw rate matching steering angle sensor",
      "Active cooling pump power: 85%"
    ];

    const logsInterval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      const randomMsg = logMessages[Math.floor(Math.random() * logMessages.length)];
      setConsoleLogs(prev => {
        const next = [...prev, `[${timestamp}] ${randomMsg}`];
        if (next.length > 25) next.shift();
        return next;
      });
    }, 4000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(logsInterval);
    };
  }, []);

  // Auto-scroll logs panel container
  useEffect(() => {
    if (consolePanelRef.current) {
      consolePanelRef.current.scrollTop = consolePanelRef.current.scrollHeight;
    }
  }, [consoleLogs]);

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
            {/* Custom SVG logo mimicking the speedo gauge + text */}
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10" />
              <path d="M12 6a6 6 0 1 0 6 6" />
              <path d="M12 12l4-4" />
            </svg>
            <span>SYNCHRO</span>TECH
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
              <span className="text-red">Every Track Level</span>
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
              <span className="card-badge badge-red">Driver Cockpit</span>
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
                <li className="red-icon"><Check /> 5 View Modes (Race / Lap / Energy)</li>
                <li className="red-icon"><Check /> Auto Day/Night Theme via ALS</li>
                <li className="red-icon"><Check /> Cross-Venue Auto-Scaling</li>
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
              <div className="feature-icon-wrapper icon-red-bg">
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
              
              <div className="dashboard-canvas">
                {/* Dashboard Sidebar Stats */}
                <div className="dashboard-sidebar">
                  {/* SPEED */}
                  <div className="dash-panel">
                    <div className="panel-header">
                      <span>Telemetry</span>
                      <span className="live-indicator">Live</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                      <span className="big-stat-val">{speed}</span>
                      <span className="big-stat-unit">km/h</span>
                    </div>
                  </div>

                  {/* SOC Gauge */}
                  <div className="dash-panel">
                    <div className="panel-header">
                      <span>SOC</span>
                      <span>{soc}%</span>
                    </div>
                    <div className="soc-bar">
                      <span className={`soc-segment ${soc >= 10 ? 'active' : ''}`} />
                      <span className={`soc-segment ${soc >= 20 ? 'active' : ''}`} />
                      <span className={`soc-segment ${soc >= 30 ? 'active' : ''}`} />
                      <span className={`soc-segment ${soc >= 40 ? 'active' : ''}`} />
                      <span className={`soc-segment ${soc >= 50 ? 'active' : ''}`} />
                      <span className={`soc-segment ${soc >= 60 ? 'active' : ''}`} />
                      <span className={`soc-segment ${soc >= 70 ? 'active' : ''}`} />
                      <span className={`soc-segment ${soc >= 80 ? 'active' : ''}`} />
                      <span className={`soc-segment ${soc >= 90 ? 'active' : ''}`} />
                      <span className={`soc-segment ${soc >= 100 ? 'active' : ''}`} />
                    </div>
                  </div>

                  {/* Temperature Metrics */}
                  <div className="dash-panel">
                    <div className="param-grid">
                      <div className="param-item">
                        <div className="param-label">SYS VOLT</div>
                        <div className="param-val">{voltage} V</div>
                      </div>
                      <div className="param-item">
                        <div className="param-label">SYS AMP</div>
                        <div className="param-val">16.9 A</div>
                      </div>
                      <div className="param-item">
                        <div className="param-label">BATT TEMP</div>
                        <div className="param-val">{battTemp} °C</div>
                      </div>
                      <div className="param-item">
                        <div className="param-label">MOT TEMP</div>
                        <div className="param-val">{motorTemp} °C</div>
                      </div>
                    </div>
                  </div>

                  {/* Terminal Console Logs */}
                  <div className="dash-panel" style={{ flexGrow: 1, padding: '8px' }}>
                    <div className="panel-header">System Logs</div>
                    <div ref={consolePanelRef} className="console-panel">
                      {consoleLogs.map((log, index) => (
                        <div key={index} className="console-line">
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dashboard Main Canvas Area */}
                <div className="dashboard-main">
                  {/* Map Panel (Laguna Seca Circuit Path) */}
                  <div className="dash-panel map-panel">
                    <div className="panel-header" style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', zIndex: 10 }}>
                      <span>Track Map - Circuit Outline</span>
                      <span>Laguna Seca</span>
                    </div>
                    {/* Inline vector tracing of Laguna Seca */}
                    <svg viewBox="0 0 400 250" style={{ width: '85%', height: '80%', marginTop: '10px' }} aria-hidden="true">
                      {/* Grey race track path */}
                      <path 
                        className="racetrack-path" 
                        d="M 280 40 C 350 40, 360 80, 310 110 C 260 140, 290 190, 240 210 C 190 230, 150 180, 120 180 C 90 180, 50 160, 50 120 C 50 80, 110 50, 170 80 C 210 100, 220 70, 210 50 C 200 30, 240 40, 280 40 Z" 
                      />
                      {/* Glowing green path representing current session progress */}
                      <path 
                        className="racetrack-progress" 
                        d="M 280 40 C 350 40, 360 80, 310 110 C 260 140, 290 190, 240 210 C 190 230, 150 180, 120 180 C 90 180, 50 160, 50 120 C 50 80, 110 50, 170 80 C 210 100, 220 70, 210 50 C 200 30, 240 40, 280 40 Z"
                      />
                      {/* Racing Car indicator dot */}
                      <circle className="racetrack-car" cx="240" cy="210" r="6" />
                    </svg>

                    <div className="map-control-overlay">
                      <span className="map-btn" role="button" aria-label="Zoom in">+</span>
                      <span className="map-btn" role="button" aria-label="Zoom out">-</span>
                    </div>
                  </div>

                  {/* Live Telemetry Chart panel */}
                  <div className="dash-panel chart-panel">
                    <div className="panel-header">Speed vs Time (Live Session Log)</div>
                    <div style={{ position: 'relative', width: '100%', height: '80%' }}>
                      {/* Telemetry line representation */}
                      <svg viewBox="0 0 500 70" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }} aria-hidden="true">
                        <defs>
                          <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="15" x2="500" y2="15" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                        <line x1="0" y1="35" x2="500" y2="35" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                        <line x1="0" y1="55" x2="500" y2="55" stroke="rgba(255,255,255,0.05)" strokeDasharray="3" />
                        
                        {/* Wave path */}
                        <path
                          fill="url(#chart-grad)"
                          stroke="none"
                          d="M 0 60 Q 30 20, 60 40 T 120 10 T 180 50 T 240 25 T 300 45 T 360 15 T 420 40 T 480 20 L 500 20 L 500 70 L 0 70 Z"
                        />
                        <path
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2.0"
                          d="M 0 60 Q 30 20, 60 40 T 120 10 T 180 50 T 240 25 T 300 45 T 360 15 T 420 40 T 480 20 L 500 20"
                          filter="drop-shadow(0 0 3px rgba(16, 185, 129, 0.4))"
                        />
                        <circle cx="500" cy="20" r="3" fill="#10b981" />
                      </svg>
                      {/* Connection status footer in chart */}
                      <div style={{ position: 'absolute', bottom: '2px', left: '6px', fontSize: '8px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <span>●</span> Connected
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              <p>
                Advanced telemetry systems for racers who demand data-driven performance. 
                Designed in Detroit, raced worldwide.
              </p>
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
