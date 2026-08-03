'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface FooterProps {
  lang: Language;
  onToggleLang: () => void;
  onTriggerComingSoon: (pageName: string) => void;
}

export function Footer({ lang, onToggleLang, onTriggerComingSoon }: FooterProps) {
  return (
    <footer className="bg-surface border-t border-foreground/10 text-muted-foreground py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <h2 className="font-display text-2xl font-black text-foreground tracking-widest uppercase">
              SYNCHROTECH
            </h2>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              {t('footerDesc', lang)}
            </p>

            <div className="space-y-2.5 pt-4 border-t border-foreground/10 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin size={14} className="text-purple-electric flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Jl. St., Karanggeringging, Sumpiuh, Kec. Sumpiuh, Kabupaten Banyumas, Jawa Tengah 53195, Indonesia
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={14} className="text-purple-electric flex-shrink-0" />
                <a href="https://wa.me/628132595764" target="_blank" rel="noopener noreferrer" className="hover:text-foreground underline font-mono">
                  +62 813-2595-764
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={14} className="text-purple-electric flex-shrink-0" />
                <a href="mailto:synchrotechrace@gmail.com" className="hover:text-foreground underline font-mono">
                  synchrotechrace@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Products */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-mono text-xs text-foreground font-bold uppercase tracking-wider">
              {t('products', lang)}
            </h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products/joulemeter" className="hover:text-foreground transition-colors">Joulemeter</Link></li>
              <li><Link href="/products/nexus-one" className="hover:text-foreground transition-colors">Nexus One</Link></li>
              <li><Link href="/products/display" className="hover:text-foreground transition-colors">Display</Link></li>
              <li><Link href="/products" className="hover:text-purple-electric transition-colors">{t('products', lang)} Catalog</Link></li>
            </ul>
          </div>

          {/* Column 2: Support */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-mono text-xs text-foreground font-bold uppercase tracking-wider">
              {t('support', lang)}
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onTriggerComingSoon(t('documentation', lang))} className="hover:text-foreground transition-colors text-left">
                  {t('documentation', lang)}
                </button>
              </li>
              <li>
                <button onClick={() => onTriggerComingSoon(t('forum', lang))} className="hover:text-foreground transition-colors text-left">
                  {t('forum', lang)}
                </button>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  {t('contactCategory', lang)}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Socials & Language */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-mono text-xs text-foreground font-bold uppercase tracking-wider">
              {t('stayConnected', lang)}
            </h3>

            <div className="flex items-center space-x-3">
              <a
                href="https://www.instagram.com/synchrotechrace?igsh=MTNpeWxvaGJpZGVqZw=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-foreground/5 hover:bg-purple-electric text-foreground transition-colors"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@synchrotech5?_r=1&_t=ZS-97aTFNxtGYq"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-foreground/5 hover:bg-purple-electric text-foreground transition-colors"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.41-.43-.58-.67-.02 2.44-.01 4.88-.01 7.32-.03 1.2-.34 2.39-.92 3.44-1.12 2.03-3.41 3.28-5.72 3.16-2.58-.1-4.91-1.89-5.49-4.41-.74-3.18 1.09-6.6 4.25-7.39.46-.11.93-.17 1.4-.18v3.91c-1.5.06-2.91.99-3.44 2.41-.66 1.75.24 3.86 1.99 4.5 1.75.64 3.85-.25 4.49-2 .14-.38.21-.78.2-1.18V0l.04.02z"/>
                </svg>
              </a>

              <a
                href="https://youtube.com/@synchrotech-y3e?si=3NjO-7c4f9GxW33W"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-foreground/5 hover:bg-purple-electric text-foreground transition-colors"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onToggleLang}
                className="px-4 py-2.5 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground font-mono text-xs flex items-center space-x-2 transition-colors border border-foreground/10"
              >
                <Globe size={14} className="text-purple-electric" />
                <span>{lang === 'en' ? 'Bahasa Indonesia (ID)' : 'English (EN)'}</span>
              </button>

              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-foreground/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <div>© 2023 SynchroTech Racing Systems. All rights reserved.</div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => onTriggerComingSoon(t('privacyPolicy', lang))} className="hover:text-muted-foreground">
              {t('privacyPolicy', lang)}
            </button>
            <button onClick={() => onTriggerComingSoon(t('termsOfService', lang))} className="hover:text-muted-foreground">
              {t('termsOfService', lang)}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
