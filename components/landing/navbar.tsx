'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Menu, X, ArrowRight, Download } from 'lucide-react';
import { Language, t } from '@/lib/i18n';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onTriggerComingSoon: (pageName: string) => void;
}

export function Navbar({ lang, onToggleLang, onTriggerComingSoon }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ['rgba(7, 7, 10, 0.6)', 'rgba(7, 7, 10, 0.92)']
  );

  const navPadding = useTransform(
    scrollY,
    [0, 50],
    ['18px 0px', '12px 0px']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0.05)', 'rgba(168, 85, 247, 0.2)']
  );

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#040407] text-[#9CA3AF] text-xs py-2 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-xs">
            <button 
              onClick={() => onTriggerComingSoon(t('documentation', lang))}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('documentation', lang)}
            </button>
            <button 
              onClick={() => onTriggerComingSoon(t('forum', lang))}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('forum', lang)}
            </button>
            <button 
              onClick={() => onTriggerComingSoon(t('dealerPortal', lang))}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {t('dealerPortal', lang)}
            </button>
          </div>

          <div 
            onClick={onToggleLang}
            className="flex items-center space-x-1.5 cursor-pointer hover:text-white transition-colors"
            role="button"
            tabIndex={0}
          >
            <Globe className="w-3.5 h-3.5 text-[#A855F7]" />
            <span className="font-mono text-[11px] uppercase tracking-wider">
              {lang === 'en' ? 'EN / ID' : 'ID / EN'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Floating Header Navbar */}
      <motion.header
        style={{
          backgroundColor: navBackground,
          borderBottomWidth: '1px',
          borderBottomColor: navBorder,
          padding: navPadding,
        }}
        className="sticky top-0 z-50 backdrop-blur-xl transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <img 
              src="/logotype.png" 
              alt="SynchroTech" 
              className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-sm font-medium text-gray-300 hover:text-[#A855F7] transition-colors"
            >
              {t('products', lang)}
            </Link>
            <button 
              onClick={() => onTriggerComingSoon(t('solutions', lang))}
              className="text-sm font-medium text-gray-300 hover:text-[#A855F7] transition-colors cursor-pointer"
            >
              {t('solutions', lang)}
            </button>
            <button 
              onClick={() => onTriggerComingSoon(t('support', lang))}
              className="text-sm font-medium text-gray-300 hover:text-[#A855F7] transition-colors cursor-pointer"
            >
              {t('support', lang)}
            </button>
            <button 
              onClick={() => onTriggerComingSoon(t('community', lang))}
              className="text-sm font-medium text-gray-300 hover:text-[#A855F7] transition-colors cursor-pointer"
            >
              {t('community', lang)}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/downloads"
              className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <Download className="w-3.5 h-3.5 text-[#A855F7]" />
              <span>Download Software</span>
            </Link>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#9333EA] text-white text-xs font-semibold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 transform active:scale-95"
            >
              {t('buyOnline', lang)}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-[#0A0A10] border-b border-white/10 px-6 py-6 space-y-4"
          >
            <Link 
              href="/products"
              onClick={() => setMobileMenuOpen(false)} 
              className="block text-base font-medium text-gray-200 hover:text-[#A855F7]"
            >
              {t('products', lang)}
            </Link>

            <Link
              href="/downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-base font-medium text-[#A855F7]"
            >
              <Download size={18} />
              <span>Download Desktop Software (.exe)</span>
            </Link>

            <button 
              onClick={() => { setMobileMenuOpen(false); onTriggerComingSoon(t('solutions', lang)); }}
              className="block w-full text-left text-base font-medium text-gray-200 hover:text-[#A855F7]"
            >
              {t('solutions', lang)}
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); onTriggerComingSoon(t('support', lang)); }}
              className="block w-full text-left text-base font-medium text-gray-200 hover:text-[#A855F7]"
            >
              {t('support', lang)}
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); scrollToSection('contact'); }}
              className="w-full mt-4 py-3 rounded-xl bg-[#A855F7] text-white font-semibold text-sm text-center"
            >
              {t('buyOnline', lang)}
            </button>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
