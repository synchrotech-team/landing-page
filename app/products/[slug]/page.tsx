'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Check,
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
  ChevronRight
} from 'lucide-react';
import { PRODUCTS_DATA, Product, getLocalizedProduct } from '@/lib/products';
import { Language, t } from '@/lib/i18n';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { ComingSoon } from '@/components/landing/coming-soon';
import { MotionReveal } from '@/components/motion/reveal';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();
  const [allProducts, setAllProducts] = useState<Product[]>(Object.values(PRODUCTS_DATA));

  const [lang, setLang] = useState<Language>('id');
  const [activeViewTab, setActiveViewTab] = useState<'photo' | 'sim'>('photo');
  const [simLapTime, setSimLapTime] = useState(0);
  const [simCurrent, setSimCurrent] = useState(24.5);
  const [simLteRssi, setSimLteRssi] = useState(-68);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonPage, setComingSoonPage] = useState('');

  useEffect(() => {
    async function loadDynamicProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setAllProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to fetch dynamic products detail:', err);
      }
    }
    loadDynamicProducts();
  }, []);

  const rawProduct: Product | undefined = allProducts.find(p => p.slug === slug) || PRODUCTS_DATA[slug];

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'id' : 'en'));
  };

  const triggerComingSoon = (pageName: string) => {
    setComingSoonPage(pageName);
    setShowComingSoon(true);
  };

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

  if (showComingSoon) {
    return (
      <ComingSoon
        pageName={comingSoonPage}
        onClose={() => setShowComingSoon(false)}
        lang={lang}
      />
    );
  }

  if (!rawProduct) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Navbar lang={lang} onToggleLang={toggleLang} onTriggerComingSoon={triggerComingSoon} />
        <main className="flex-1 flex items-center justify-center py-20 text-center">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-4 uppercase">
              {lang === 'id' ? 'Produk Tidak Ditemukan' : 'Product Not Found'}
            </h1>
            <p className="text-muted-foreground mb-6 text-sm">
              {lang === 'id' ? `Maaf, halaman detail untuk produk "${slug}" tidak ditemukan.` : `Sorry, detail page for "${slug}" was not found.`}
            </p>
            <Link href="/products" className="px-6 py-3 rounded-xl bg-purple-electric text-white text-xs font-bold font-display uppercase tracking-wider">
              {lang === 'id' ? 'Kembali ke Katalog Produk' : 'Return to Products Catalog'}
            </Link>
          </div>
        </main>
        <Footer lang={lang} onToggleLang={toggleLang} onTriggerComingSoon={triggerComingSoon} />
      </div>
    );
  }

  // Retrieve localized product details according to current language state
  const product = getLocalizedProduct(rawProduct, lang);

  const waMessage = lang === 'en'
    ? `Hello SynchroTech, I am interested in inquiring/ordering product ${product.name} (${product.subtitle}). Please provide more info.`
    : `Halo SynchroTech, saya tertarik untuk bertanya/memesan produk ${product.name} (${product.subtitle}). Mohon informasi lebih lanjut.`;

  const waUrl = `https://wa.me/628132595764?text=${encodeURIComponent(waMessage)}`;

  const otherProducts = allProducts
    .filter(p => p.slug !== product.slug)
    .map(p => getLocalizedProduct(p, lang));

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-electric selection:text-white flex flex-col justify-between">
      {/* Floating Header Navbar */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        onTriggerComingSoon={triggerComingSoon}
      />

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Breadcrumb path */}
          <MotionReveal>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-8 font-mono">
              <Link href="/" className="hover:text-foreground transition-colors">
                {lang === 'id' ? 'Beranda' : 'Home'}
              </Link>
              <ChevronRight size={14} />
              <Link href="/products" className="hover:text-foreground transition-colors">
                {lang === 'id' ? 'Produk' : 'Products'}
              </Link>
              <ChevronRight size={14} />
              <span className="text-purple-electric font-semibold">{product.name}</span>
            </div>
          </MotionReveal>

          {/* Product Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
            {/* Left Column: Visual Mockup Showcase */}
            <div className="lg:col-span-6">
              <MotionReveal delay={0.1}>
                <div className="bg-surface border border-foreground/10 p-6 md:p-8 relative overflow-hidden">
                  {/* Badge & Stock Overlay */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                      product.badgeType === 'blue'
                        ? 'bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/30'
                        : product.badgeType === 'purple'
                        ? 'bg-purple-electric/20 text-purple-electric border border-purple-electric/30'
                        : 'bg-foreground/10 text-muted-foreground'
                    }`}>
                      {product.badge}
                    </span>
                    <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{product.stockStatus}</span>
                    </span>
                  </div>

                  {/* View Mode Tab Switcher */}
                  <div className="flex space-x-2 p-1 bg-surface border border-foreground/10 rounded-xl mb-6">
                    <button
                      onClick={() => setActiveViewTab('photo')}
                      className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                        activeViewTab === 'photo'
                          ? 'bg-purple-electric text-white'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {lang === 'id' ? 'Foto Perangkat' : 'Hardware Photo'}
                    </button>
                    <button
                      onClick={() => setActiveViewTab('sim')}
                      className={`flex-1 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                        activeViewTab === 'sim'
                          ? 'bg-purple-electric text-white'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {lang === 'id' ? 'Simulasi Live Telemetri' : 'Live Telemetry Sim'}
                    </button>
                  </div>

                  {/* Showcase Container */}
                  <div className="w-full min-h-75 rounded-2xl bg-black border border-foreground/10 p-4 flex flex-col justify-center overflow-hidden mb-6 shadow-inner">
                    {activeViewTab === 'photo' ? (
                      <div className="w-full h-72 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="w-full p-4">
                        {product.mockupType === 'display' && (
                          <div className="display-mockup w-full">
                            <div className="top-row">
                              <div>LAP 3/8</div>
                              <div>04:22</div>
                              <div className="text-emerald-400">BAT 78%</div>
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
                          <div className="font-mono text-xs text-sky-400 space-y-3">
                            <div className="flex justify-between border-b border-foreground/10 pb-2">
                              <span className="text-purple-electric font-bold">[NEXUS-1] TELEMETRY HUB</span>
                              <span className="text-emerald-400">STATUS: ONLINE</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-foreground/5 p-3 rounded-lg">
                                <div className="text-[10px] text-muted-foreground">4G LTE NETWORK</div>
                                <div className="text-sm font-bold text-sky-400 mt-1">GLOBAL LTE ({simLteRssi} dBm)</div>
                              </div>
                              <div className="bg-foreground/5 p-3 rounded-lg">
                                <div className="text-[10px] text-muted-foreground">GNSS POSITION</div>
                                <div className="text-sm font-bold text-emerald-400 mt-1">25Hz FIX (12 SATS)</div>
                              </div>
                            </div>
                            <div className="bg-foreground/5 p-3 rounded-lg text-[11px] text-muted-foreground space-y-1">
                              <div>&gt; CAN Bus stream active: 100 msg/sec</div>
                              <div>&gt; IMU Accel: X: +0.02G, Y: -0.85G, Z: +1.01G</div>
                              <div>&gt; Internal Power: Li-Po 2000mAh (Charging 98%)</div>
                            </div>
                          </div>
                        )}

                        {product.mockupType === 'joulemeter' && (
                          <div className="font-mono text-xs text-amber-400 space-y-3">
                            <div className="flex justify-between border-b border-foreground/10 pb-2">
                              <span className="text-amber-500 font-bold">[JOULEMETER 24-BIT]</span>
                              <span className="text-emerald-400">ADS1256 ACTIVE</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-foreground/5 p-3 rounded-lg">
                                <div className="text-[10px] text-muted-foreground">CURRENT READOUT</div>
                                <div className="text-base font-bold text-amber-400 mt-1">{simCurrent} A</div>
                              </div>
                              <div className="bg-foreground/5 p-3 rounded-lg">
                                <div className="text-[10px] text-muted-foreground">BUS VOLTAGE</div>
                                <div className="text-base font-bold text-sky-400 mt-1">48.2 V</div>
                              </div>
                            </div>
                            <div className="bg-foreground/5 p-3 rounded-lg text-[11px] text-muted-foreground space-y-1">
                              <div>&gt; Instantaneous Power: {(simCurrent * 48.2).toFixed(1)} Watts</div>
                              <div>&gt; Total Energy Consumed: 142.8 Wh</div>
                              <div>&gt; Shunt Temp: 34°C (Manganin 0.1% Nominal)</div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Specs Checklist */}
                  <div className="border-t border-foreground/5 pt-4">
                    <div className="text-[10px] text-muted-foreground font-mono font-bold uppercase tracking-wider mb-3">
                      {lang === 'id' ? 'Spesifikasi Utama:' : 'Key Specifications:'}
                    </div>
                    <ul className="space-y-2">
                      {product.keySpecs.map((spec, i) => (
                        <li key={i} className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <Check size={16} className="text-purple-electric shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MotionReveal>
            </div>

            {/* Right Column: Title, Price & Action CTAs */}
            <div className="lg:col-span-6">
              <MotionReveal delay={0.2}>
                <span className="font-mono text-xs font-bold text-orange-motorsport tracking-widest uppercase mb-2 block">
                  {product.category}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight uppercase mb-2 leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-mono text-purple-electric font-semibold mb-6">
                  {product.subtitle}
                </p>

                {/* Price Box */}
                <div className="bg-surface border border-foreground/10 p-6 mb-8 flex justify-between items-center">
                  <div>
                    <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                      {lang === 'id' ? 'Harga Resmi / Unit:' : 'Official Price / Unit:'}
                    </div>
                    <div className="font-mono text-3xl font-bold text-foreground mt-1">
                      {product.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 font-mono font-semibold">
                      {product.stockStatus}
                    </span>
                  </div>
                </div>

                {/* Long Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {product.longDescription}
                </p>

                {/* Action Buttons */}
                <div className="space-y-4 mb-8">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-xl bg-[#25D366] text-white font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-3 hover:bg-[#20ba5a] transition-all duration-300 shadow-lg transform active:scale-95 cursor-pointer"
                  >
                    <MessageSquare size={18} />
                    <span>{lang === 'id' ? `Tanya / Pesan ${product.name} via WhatsApp` : `Order ${product.name} via WhatsApp`}</span>
                  </a>

                  <Link
                    href="/#contact"
                    className="w-full py-3.5 bg-purple-electric text-white font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-3 hover:brightness-90 transition-all duration-300"
                  >
                    <FileText size={16} />
                    <span>{lang === 'id' ? 'Kirim Pesan Inquiry / Demo' : 'Send Inquiry / Demo Message'}</span>
                  </Link>
                </div>

                {/* Trust Guarantee */}
                <div className="grid grid-cols-2 gap-4 border-t border-foreground/10 pt-6">
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <ShieldCheck size={18} className="text-purple-electric" />
                    <span>{lang === 'id' ? 'Garansi Resmi 1 Tahun' : '1 Year Official Warranty'}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <Radio size={18} className="text-orange-motorsport" />
                    <span>{lang === 'id' ? 'Dukungan Firmware Free' : 'Free Firmware Updates'}</span>
                  </div>
                </div>
              </MotionReveal>
            </div>
          </div>

          {/* Features Grid Section */}
          <div className="mb-20">
            <MotionReveal>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground uppercase mb-8">
                {lang === 'id' ? 'Fitur Unggulan & Kapabilitas' : 'Key Features & Capabilities'}
              </h2>
            </MotionReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.features.map((feat, idx) => (
                <MotionReveal key={idx} delay={idx * 0.1}>
                  <div className="h-full rounded-2xl bg-surface border border-foreground/10 p-6 hover:border-purple-electric/40 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-purple-electric/15 text-purple-electric flex items-center justify-center mb-4 border border-purple-electric/30">
                      {renderIcon(feat.iconName)}
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>

          {/* Specifications Table & In The Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            {/* Specs Table */}
            <div className="lg:col-span-7">
              <MotionReveal>
                <h2 className="font-display text-2xl font-bold text-foreground uppercase mb-6">
                  {lang === 'id' ? 'Spesifikasi Detail' : 'Detailed Specifications'}
                </h2>
                <div className="rounded-2xl bg-surface border border-foreground/10 overflow-hidden">
                  {product.specifications.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex justify-between items-center px-6 py-3.5 ${
                        idx !== product.specifications.length - 1 ? 'border-b border-foreground/5' : ''
                      } ${idx % 2 === 0 ? 'bg-transparent' : 'bg-foreground/1'}`}
                    >
                      <span className="text-xs text-muted-foreground font-mono">{item.label}</span>
                      <span className="text-xs text-muted-foreground font-mono font-semibold text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </MotionReveal>
            </div>

            {/* In The Box */}
            <div className="lg:col-span-5">
              <MotionReveal delay={0.2}>
                <h2 className="font-display text-2xl font-bold text-foreground uppercase mb-6">
                  {lang === 'id' ? 'Kelengkapan Paket (In The Box)' : 'What\'s Included (In The Box)'}
                </h2>
                <div className="rounded-2xl bg-surface border border-foreground/10 p-6 space-y-4">
                  {product.inTheBox.map((boxItem, idx) => (
                    <div key={idx} className="flex items-center space-x-3 text-xs text-muted-foreground">
                      <div className="w-7 h-7 rounded-full bg-purple-electric/15 text-purple-electric flex items-center justify-center shrink-0 border border-purple-electric/30">
                        <PackageCheck size={14} />
                      </div>
                      <span>{boxItem}</span>
                    </div>
                  ))}
                </div>
              </MotionReveal>
            </div>
          </div>

          {/* Related Products Switcher */}
          <div className="border-t border-foreground/10 pt-16">
            <MotionReveal>
              <h2 className="font-display text-2xl font-bold text-foreground uppercase mb-8 text-center">
                {lang === 'id' ? 'Lini Perangkat Keras Lainnya' : 'Other Hardware Lineup'}
              </h2>
            </MotionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {otherProducts.map((other, idx) => (
                <MotionReveal key={other.slug} delay={idx * 0.1}>
                  <div className="rounded-2xl bg-surface border border-foreground/10 p-6 flex flex-col justify-between hover:border-purple-electric/40 transition-all duration-300">
                    <div>
                      <span className="text-[10px] font-mono text-orange-motorsport font-bold uppercase tracking-wider">
                        {other.badge}
                      </span>
                      <h3 className="font-display text-xl font-bold text-foreground mt-1 mb-2">
                        {other.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                        {other.description}
                      </p>
                    </div>

                    <Link
                      href={`/products/${other.slug}`}
                      className="w-full py-3 rounded-xl border border-foreground/15 text-foreground font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-foreground hover:text-background transition-all duration-300"
                    >
                      <span>{lang === 'id' ? `Lihat ${other.name}` : `View ${other.name}`}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Unified Footer */}
      <Footer
        lang={lang}
        onToggleLang={toggleLang}
        onTriggerComingSoon={triggerComingSoon}
      />
    </div>
  );
}
