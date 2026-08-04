'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { resolveImageSrc } from '../../lib/blob-image';
import { 
  Check, 
  ArrowRight, 
  Search, 
  MessageSquare, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Radio,
  Sliders
} from 'lucide-react';
import { PRODUCTS_DATA, Product, getLocalizedProduct } from '@/lib/products';
import { useLang, t } from '@/lib/i18n';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { ComingSoon } from '@/components/landing/coming-soon';
import { MotionReveal } from '@/components/motion/reveal';

export default function ProductsPageClient() {
  const [lang, setLang] = useLang();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonPage, setComingSoonPage] = useState('');
  const [rawProducts, setRawProducts] = useState<Product[]>(Object.values(PRODUCTS_DATA));

  useEffect(() => {
    async function loadDynamicProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setRawProducts(data.products);
        }
      } catch (err) {
        console.error('Failed to load dynamic products:', err);
      }
    }
    loadDynamicProducts();
  }, []);

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'id' : 'en'));
  };

  const triggerComingSoon = (pageName: string) => {
    setComingSoonPage(pageName);
    setShowComingSoon(true);
  };

  // Filter products based on search query and category filter
  const filteredProducts = rawProducts
    .map(p => getLocalizedProduct(p, lang))
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedCategory === 'all') return matchesSearch;
      if (selectedCategory === 'hub') return matchesSearch && product.slug === 'nexus-one';
      if (selectedCategory === 'energy') return matchesSearch && product.slug === 'joulemeter';
      if (selectedCategory === 'display') return matchesSearch && product.slug === 'display';
      return matchesSearch;
    });

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
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-electric selection:text-white flex flex-col justify-between">
      {/* Floating Navbar */}
      <Navbar 
        lang={lang} 
        onToggleLang={toggleLang} 
        onTriggerComingSoon={triggerComingSoon} 
      />

      <main className="flex-1">
        {/* Page Hero Banner */}
        <section className="relative py-20 border-b border-foreground/5 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat products-bg" />
          {/* Overlay for readability + grid */}
          <div className="absolute inset-0 bg-background/70 telemetry-grid-bg" />
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground mb-6 font-mono">
              <Link href="/" className="hover:text-foreground transition-colors">
                {lang === 'id' ? 'Beranda' : 'Home'}
              </Link>
              <ChevronRight size={14} />
              <span className="text-purple-electric font-semibold">
                {lang === 'id' ? 'Katalog Produk' : 'Products Catalog'}
              </span>
            </div>

            <span className="font-mono text-xs font-bold text-purple-electric tracking-widest uppercase mb-3 block">
              {lang === 'id' ? 'LINI PERANGKAT KERAS TELEMETRI' : 'TELEMETRY HARDWARE LINEUP'}
            </span>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold text-foreground tracking-tight uppercase mb-6 leading-tight max-w-4xl mx-auto">
              {lang === 'id' ? 'Katalog Perangkat Keras Balap' : 'Racing Hardware Catalog'}
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {lang === 'id'
                ? 'Temukan sistem telemetri presisi yang dirancang khusus untuk memantau, menganalisis, dan meningkatkan performa kendaraan balap Anda di lintasan.'
                : 'Discover precision telemetry systems designed to capture, analyze, and optimize your vehicle performance on track.'}
            </p>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Controls Bar */}
            <MotionReveal>
              <div className="flex flex-wrap gap-4 justify-between items-center bg-surface border border-foreground/10 p-4 md:p-6 mb-12">
                {/* Category Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                      selectedCategory === 'all' 
                        ? 'bg-purple-electric text-white'
                        : 'bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                    }`}
                  >
                    {lang === 'id' ? 'Semua Produk' : 'All Products'} ({rawProducts.length})
                  </button>
                  <button
                    onClick={() => setSelectedCategory('hub')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                      selectedCategory === 'hub' 
                        ? 'bg-purple-electric text-white'
                        : 'bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                    }`}
                  >
                    4G LTE Hub
                  </button>
                  <button
                    onClick={() => setSelectedCategory('energy')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                      selectedCategory === 'energy' 
                        ? 'bg-purple-electric text-white'
                        : 'bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                    }`}
                  >
                    {lang === 'id' ? 'Perekam Energi' : 'Energy Logger'}
                  </button>
                  <button
                    onClick={() => setSelectedCategory('display')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition-all duration-300 cursor-pointer ${
                      selectedCategory === 'display' 
                        ? 'bg-purple-electric text-white'
                        : 'bg-foreground/5 text-muted-foreground hover:text-foreground hover:bg-foreground/10'
                    }`}
                  >
                    Cockpit Display
                  </button>
                </div>

                {/* Search Input Box */}
                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input 
                    type="text"
                    placeholder={lang === 'id' ? 'Cari produk...' : 'Search products...'}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-foreground/10 text-foreground placeholder-muted-foreground text-xs focus:outline-none focus:border-purple-electric transition-colors"
                  />
                </div>
              </div>
            </MotionReveal>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-surface border border-foreground/10 rounded-2xl">
                <h3 className="text-lg font-bold text-foreground mb-2">Tidak ada produk yang cocok</h3>
                <p className="text-xs text-muted-foreground">Coba ubah kata kunci pencarian atau kategori filter Anda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                {filteredProducts.map((prod, idx) => (
                  <MotionReveal key={prod.slug} delay={idx * 0.1}>
                    <div className="h-full group bg-surface border border-foreground/10 p-6 flex flex-col justify-between hover:border-purple-electric/50 transition-colors duration-150">
                      <div>
                        {/* Header Badge & Stock */}
                        <div className="flex justify-between items-center mb-4">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase ${
                            prod.badgeType === 'blue' 
                              ? 'bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/30' 
                              : prod.badgeType === 'purple'
                              ? 'bg-purple-electric/20 text-purple-electric border border-purple-electric/30'
                              : 'bg-foreground/10 text-muted-foreground'
                          }`}>
                            {prod.badge}
                          </span>
                          <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{prod.stockStatus}</span>
                          </span>
                        </div>

                        {/* Product Image Container */}
                        <div className="w-full h-48 rounded-xl overflow-hidden mb-6 bg-black border border-foreground/10 flex items-center justify-center">
                          <img
                            src={resolveImageSrc(prod.image)}
                            alt={prod.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        </div>

                        {/* Title & Subtitle */}
                        <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                          {prod.name}
                        </h2>
                        <p className="text-xs text-purple-electric font-mono font-semibold mb-4">
                          {prod.subtitle}
                        </p>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-6">
                          {prod.description}
                        </p>

                        {/* Key Specs List */}
                        <div className="border-t border-foreground/5 pt-4 mb-6">
                          <div className="text-[10px] text-muted-foreground font-mono font-bold uppercase tracking-wider mb-2">
                            {lang === 'id' ? 'Fitur Utama:' : 'Key Features:'}
                          </div>
                          <ul className="space-y-2">
                            {prod.keySpecs.slice(0, 3).map((spec, i) => (
                              <li key={i} className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <Check size={14} className="text-purple-electric shrink-0" />
                                <span className="truncate">{spec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Price & Action Buttons */}
                      <div>
                        <div className="flex justify-between items-baseline mb-4 pt-4 border-t border-foreground/5">
                          <span className="text-xs text-muted-foreground font-mono">Harga Resmi:</span>
                          <span className="font-mono text-xl font-bold text-foreground">
                            {prod.price}
                          </span>
                        </div>

                        <div className="flex space-x-3">
                          <Link 
                            href={`/products/${prod.slug}`}
                            className="flex-1 py-3 bg-purple-electric text-white font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:brightness-90 transition-all duration-300"
                          >
                            <span>Detail</span>
                            <ArrowRight size={14} />
                          </Link>

                          <a 
                            href={`https://wa.me/628132595764?text=${encodeURIComponent(`Halo SynchroTech, saya tertarik untuk bertanya mengenai produk ${prod.name}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors flex items-center justify-center shadow-lg"
                            aria-label="Tanya via WhatsApp"
                          >
                            <MessageSquare size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </MotionReveal>
                ))}
              </div>
            )}

            {/* Integrated System Banner */}
            <MotionReveal delay={0.3}>
              <div className="mt-20 bg-surface border border-purple-electric/30 p-10 md:p-14 text-center">
                <span className="font-mono text-xs text-orange-motorsport font-bold tracking-widest uppercase mb-3 block">
                  EKOSISTEM SYNCHROTECH
                </span>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground uppercase tracking-tight mb-4">
                  Bekerja Bersama Dalam Satu Jaringan CAN Bus Presisi
                </h2>
                <p className="text-muted-foreground text-sm max-w-2xl mx-auto leading-relaxed mb-8">
                  Nexus One, Joulemeter, dan Display dirancang secara modular. Terhubung tanpa celah melalui jaringan CAN Bus untuk mengirimkan telemetry data real-time langsung ke aplikasi Podium Cloud.
                </p>
                <Link 
                  href="/#contact"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-orange-motorsport text-black font-display text-xs font-bold uppercase tracking-wider hover:brightness-90 transition-all duration-300"
                >
                  <span>Konsultasi Sistem Balap Anda</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </MotionReveal>
          </div>
        </section>
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
