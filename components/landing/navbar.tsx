'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, Menu, X, ArrowRight, Download } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { Button, buttonVariants } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onTriggerComingSoon: (pageName: string) => void;
}

export function Navbar({ lang, onToggleLang, onTriggerComingSoon }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Built from CSS variables (not literal rgba) so the floating header
  // repaints correctly under both the dark and light theme.
  const navBackground = useTransform(scrollY, (v) => {
    const t = Math.min(Math.max(v / 50, 0), 1);
    return `color-mix(in srgb, var(--color-background) ${60 + t * 32}%, transparent)`;
  });

  const navPadding = useTransform(
    scrollY,
    [0, 50],
    ['18px 0px', '12px 0px']
  );

  const navBorder = useTransform(scrollY, (v) => {
    const t = Math.min(Math.max(v / 50, 0), 1);
    return `color-mix(in srgb, var(--color-purple-electric) ${t * 20}%, transparent)`;
  });

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
      <div className="bg-surface text-muted-foreground text-xs py-2 border-b border-foreground/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-xs">
            <button
              onClick={() => onTriggerComingSoon(t('documentation', lang))}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              {t('documentation', lang)}
            </button>
            <button
              onClick={() => onTriggerComingSoon(t('forum', lang))}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              {t('forum', lang)}
            </button>
            <button
              onClick={() => onTriggerComingSoon(t('dealerPortal', lang))}
              className="hover:text-foreground transition-colors cursor-pointer"
            >
              {t('dealerPortal', lang)}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div
              onClick={onToggleLang}
              className="flex items-center space-x-1.5 cursor-pointer hover:text-foreground transition-colors"
              role="button"
              tabIndex={0}
            >
              <Globe className="w-3.5 h-3.5 text-purple-electric" />
              <span className="font-mono text-[11px] uppercase tracking-wider">
                {lang === 'en' ? 'EN / ID' : 'ID / EN'}
              </span>
            </div>

            <ThemeToggle className="w-6 h-6 border-none hover:border-none" />
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
        className="sticky top-0 z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <img
              src="/logogram.png"
              alt="SynchroTech"
              className="h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-display text-lg md:text-xl font-extrabold text-foreground tracking-tight">
              SynchroTech
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-sm font-medium text-muted-foreground hover:text-purple-electric transition-colors"
            >
              {t('products', lang)}
            </Link>
            <button
              onClick={() => onTriggerComingSoon(t('solutions', lang))}
              className="text-sm font-medium text-muted-foreground hover:text-purple-electric transition-colors cursor-pointer"
            >
              {t('solutions', lang)}
            </button>
            <button
              onClick={() => onTriggerComingSoon(t('support', lang))}
              className="text-sm font-medium text-muted-foreground hover:text-purple-electric transition-colors cursor-pointer"
            >
              {t('support', lang)}
            </button>
            <button
              onClick={() => onTriggerComingSoon(t('community', lang))}
              className="text-sm font-medium text-muted-foreground hover:text-purple-electric transition-colors cursor-pointer"
            >
              {t('community', lang)}
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/downloads"
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'space-x-2')}
            >
              <Download className="w-3.5 h-3.5 text-purple-electric" />
              <span>Download Software</span>
            </Link>

            <Button variant="primary" size="sm" onClick={() => scrollToSection('contact')}>
              {t('buyOnline', lang)}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground p-2"
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
            className="md:hidden bg-surface border-b border-foreground/10 px-6 py-6 space-y-4"
          >
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-muted-foreground hover:text-purple-electric"
            >
              {t('products', lang)}
            </Link>

            <Link
              href="/downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center space-x-2 text-base font-medium text-purple-electric"
            >
              <Download size={18} />
              <span>Download Desktop Software (.exe)</span>
            </Link>

            <button
              onClick={() => { setMobileMenuOpen(false); onTriggerComingSoon(t('solutions', lang)); }}
              className="block w-full text-left text-base font-medium text-muted-foreground hover:text-purple-electric"
            >
              {t('solutions', lang)}
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onTriggerComingSoon(t('support', lang)); }}
              className="block w-full text-left text-base font-medium text-muted-foreground hover:text-purple-electric"
            >
              {t('support', lang)}
            </button>

            <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>

            <Button
              variant="primary"
              className="w-full justify-center mt-4"
              onClick={() => { setMobileMenuOpen(false); scrollToSection('contact'); }}
            >
              {t('buyOnline', lang)}
            </Button>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}
