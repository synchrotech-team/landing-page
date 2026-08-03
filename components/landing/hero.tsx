'use client';

import { ArrowRight, Play, Cpu, Radio, Zap } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';
import { MotionCounter } from '@/components/motion/counter';
import { Button } from '@/components/ui/button';

interface HeroProps {
  lang: Language;
  onExploreClick: () => void;
  onDemoClick: () => void;
}

export function Hero({ lang, onExploreClick, onDemoClick }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden py-20 md:py-28 telemetry-grid-bg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10">
        <div className="max-w-4xl">
          {/* Top Tagline Badge */}
          <MotionReveal delay={0.1}>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 border border-purple-electric/30 mb-6">
              <span className="w-2 h-2 bg-purple-electric animate-pulse" />
              <span className="font-mono text-xs text-purple-electric font-semibold tracking-wider uppercase">
                {t('heroTagline', lang)}
              </span>
            </div>
          </MotionReveal>

          {/* Main Headline */}
          <MotionReveal delay={0.2}>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-foreground tracking-tighter uppercase leading-[0.95] mb-6">
              {lang === 'en' ? (
                <>
                  Precision <br />
                  Telemetry For <br />
                  <span className="text-purple-electric">Every Track Level</span>
                </>
              ) : (
                <>
                  Telemetri Presisi <br />
                  Untuk Setiap <br />
                  <span className="text-purple-electric">Level Lintasan</span>
                </>
              )}
            </h1>
          </MotionReveal>

          {/* Subtitle */}
          <MotionReveal delay={0.3}>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              {t('heroSubtitle', lang)}
            </p>
          </MotionReveal>

          {/* Dual Action Buttons */}
          <MotionReveal delay={0.4}>
            <div className="flex flex-wrap gap-8 items-center mb-16">
              <Button variant="primary" size="lg" onClick={onExploreClick}>
                <span>{t('exploreSystems', lang)}</span>
                <ArrowRight size={18} />
              </Button>

              <Button variant="secondary" size="lg" onClick={onDemoClick}>
                <Play size={16} fill="currentColor" />
                <span>{t('viewDemo', lang)}</span>
              </Button>
            </div>
          </MotionReveal>
        </div>

        {/* Live Motorsport Metrics Counter Band */}
        <MotionReveal delay={0.5}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-foreground/10 max-w-4xl">
            <div className="p-4 border border-foreground/5 flex items-center space-x-4">
              <div className="p-3 bg-purple-electric/10 text-purple-electric">
                <Cpu size={24} />
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-foreground">
                  <MotionCounter value={24} suffix="-Bit" />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                  ADS1256 ADC Precision
                </div>
              </div>
            </div>

            <div className="p-4 border border-foreground/5 flex items-center space-x-4">
              <div className="p-3 bg-orange-motorsport/10 text-orange-motorsport">
                <Radio size={24} />
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-foreground">
                  <MotionCounter value={25} suffix=" Hz" />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                  u-blox GNSS Refresh Rate
                </div>
              </div>
            </div>

            <div className="p-4 border border-foreground/5 flex items-center space-x-4">
              <div className="p-3 bg-lime/10 text-lime">
                <Zap size={24} />
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-foreground">
                  <MotionCounter value={4} suffix="G LTE" />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                  Global Cloud Live Telemetry
                </div>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
