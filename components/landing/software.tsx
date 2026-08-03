'use client';

import Link from 'next/link';
import { Activity, RefreshCw, Share2, ExternalLink, Download } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SoftwareProps {
  lang: Language;
  onTriggerComingSoon: (pageName: string) => void;
}

export function Software({ lang, onTriggerComingSoon }: SoftwareProps) {
  return (
    <section id="software" className="py-24 bg-background relative border-t border-foreground/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Info */}
          <div className="lg:col-span-5">
            <MotionReveal>
              <span className="font-mono text-xs text-purple-electric font-semibold tracking-widest uppercase mb-3 block">
                {t('softwareCategory', lang)}
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tighter uppercase mb-6 leading-tight">
                {lang === 'en' ? (
                  <>Real-Time Insight: <br /><span className="text-purple-electric">The Podium Dashboard</span></>
                ) : (
                  <>Wawasan Real-Time: <br /><span className="text-purple-electric">Dasbor Podium</span></>
                )}
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">
                {t('softwareDesc', lang)}
              </p>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="p-2 bg-purple-electric/10 text-purple-electric">
                    <Activity size={18} />
                  </div>
                  <span>{t('liveTelemetry', lang)}</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="p-2 bg-purple-electric/10 text-purple-electric">
                    <RefreshCw size={18} />
                  </div>
                  <span>{t('historicalAnalysis', lang)}</span>
                </li>
                <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <div className="p-2 bg-purple-electric/10 text-purple-electric">
                    <Share2 size={18} />
                  </div>
                  <span>{t('socialComparison', lang)}</span>
                </li>
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/downloads"
                  className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), 'space-x-2')}
                >
                  <Download size={16} />
                  <span>Download Desktop App (.exe)</span>
                </Link>

                <button
                  onClick={() => onTriggerComingSoon(t('viewLiveDemo', lang))}
                  className="inline-flex items-center space-x-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
                >
                  <span>{t('viewLiveDemo', lang)}</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Premium Browser Shell with demo.webm Video */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.2} direction="left">
              <div className="border border-foreground/10 bg-surface overflow-hidden">
                {/* Browser Header Bar */}
                <div className="bg-[#040407] px-4 py-3 border-b border-foreground/10 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  </div>
                  <div className="font-mono text-xs text-muted-foreground truncate max-w-[280px]">
                    SynchroTech Podium — Live Session: LAGUNA_SECA_04
                  </div>
                  <div className="w-10" />
                </div>

                {/* Video Window */}
                <div className="relative aspect-video bg-[#070b13] overflow-hidden">
                  <video 
                    src="/video/demo.webm" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
