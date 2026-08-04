'use client';

import { useState } from 'react';
import { useLang } from '@/lib/i18n';
import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { Products } from '@/components/landing/products';
import { Features } from '@/components/landing/features';
import { Software } from '@/components/landing/software';
import { Metrics } from '@/components/landing/metrics';
import { Contact } from '@/components/landing/contact';
import { CTA } from '@/components/landing/cta';
import { Footer } from '@/components/landing/footer';
import { ComingSoon } from '@/components/landing/coming-soon';

export default function Page() {
  const [lang, setLang] = useLang();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonPage, setComingSoonPage] = useState('');

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'id' : 'en'));
  };

  const triggerComingSoon = (pageName: string) => {
    setComingSoonPage(pageName);
    setShowComingSoon(true);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-purple-electric selection:text-white">
      {/* Navigation Header */}
      <Navbar 
        lang={lang} 
        onToggleLang={toggleLang} 
        onTriggerComingSoon={triggerComingSoon} 
      />

      {/* Main Sections */}
      <main>
        <Hero 
          lang={lang} 
          onExploreClick={() => scrollToSection('products')} 
          onDemoClick={() => scrollToSection('contact')} 
        />

        <Products lang={lang} />

        <Features lang={lang} />

        <Software 
          lang={lang} 
          onTriggerComingSoon={triggerComingSoon} 
        />

        <Metrics lang={lang} />

        <Contact lang={lang} />

        <CTA lang={lang} />
      </main>

      {/* Footer */}
      <Footer 
        lang={lang} 
        onToggleLang={toggleLang} 
        onTriggerComingSoon={triggerComingSoon} 
      />
    </div>
  );
}
