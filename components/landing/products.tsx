'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductsProps {
  lang: Language;
}

export function Products({ lang }: ProductsProps) {
  const [lapTime, setLapTime] = useState(0);

  // Live simulation for Display mockup lap timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setLapTime(prev => parseFloat((prev + 0.1).toFixed(1)));
    }, 100);

    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const baseTime = 262.3 + timeInSeconds;
    const minutes = Math.floor(baseTime / 60);
    const seconds = (baseTime % 60).toFixed(1);
    return `${minutes}:${parseFloat(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section id="products" className="py-24 bg-background relative border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <MotionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-purple-electric font-semibold tracking-widest uppercase mb-3 block">
              {t('hardwareCategory', lang)}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tighter uppercase mb-4">
              {t('hardwareTitle', lang)}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {t('hardwareSubtitle', lang)}
            </p>
          </div>
        </MotionReveal>

        {/* 3 Hardware Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Joulemeter */}
          <MotionReveal delay={0.1}>
            <div className="h-full group relative bg-foreground/2 border border-foreground/10 p-6 flex flex-col justify-between hover:border-purple-electric/50 transition-colors duration-150">
              <div>
                <span className="inline-block px-3 py-1 bg-foreground/10 text-foreground text-[11px] font-mono font-bold uppercase mb-4">
                  {t('energySpecialist', lang)}
                </span>

                <div className="w-full h-44 overflow-hidden mb-6 bg-black border border-foreground/10 flex items-center justify-center">
                  <img
                    src="/products/joulemeter.png"
                    alt="Joulemeter"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-1">Joulemeter</h3>
                <p className="text-xs text-purple-electric font-mono mb-6">{t('joulemeterSubtitle', lang)}</p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-purple-electric shrink-0" />
                    <span>ADS1256 24-bit ADC</span>
                  </li>
                  <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-purple-electric flex-shrink-0" />
                    <span>Manganin Shunt 50A (0.1%)</span>
                  </li>
                  <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-purple-electric flex-shrink-0" />
                    <span>Isolated CAN + WiFi/BLE</span>
                  </li>
                </ul>
              </div>

              <Link href="/products/joulemeter" className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), 'w-full justify-center')}>
                <span>{t('learnMore', lang)}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </MotionReveal>

          {/* Card 2: Nexus One (Most Popular / Highlighted) */}
          <MotionReveal delay={0.2}>
            <div className="h-full group relative bg-foreground/2 border-2 border-orange-motorsport p-6 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-orange-motorsport text-black text-[11px] font-mono font-bold uppercase mb-4">
                  {t('mostPopular', lang)}
                </span>

                <div className="w-full h-44 overflow-hidden mb-6 bg-black border border-foreground/10 flex items-center justify-center">
                  <img
                    src="/products/nexus-one.png"
                    alt="Nexus One"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mb-1">Nexus One</h3>
                <p className="text-xs text-orange-motorsport font-mono mb-6">{t('nexusSubtitle', lang)}</p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-orange-motorsport flex-shrink-0" />
                    <span>4G LTE Global (T-SIM7600G-H)</span>
                  </li>
                  <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-orange-motorsport flex-shrink-0" />
                    <span>u-blox NEO-M9N 25Hz GNSS</span>
                  </li>
                  <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-orange-motorsport flex-shrink-0" />
                    <span>Standalone Li-Po 2000mAh</span>
                  </li>
                  <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-orange-motorsport flex-shrink-0" />
                    <span>Auto-Charging via M12 IP67</span>
                  </li>
                </ul>
              </div>

              <Link href="/products/nexus-one" className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), 'w-full justify-center border-orange-motorsport text-orange-motorsport hover:bg-orange-motorsport hover:text-black')}>
                <span>{t('learnMore', lang)}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </MotionReveal>

          {/* Card 3: Display (Cockpit Display) */}
          <MotionReveal delay={0.3}>
            <div className="h-full group relative bg-foreground/2 border border-foreground/10 p-6 flex flex-col justify-between hover:border-purple-electric/50 transition-colors duration-150">
              <div>
                <span className="inline-block px-3 py-1 bg-purple-electric/20 text-purple-electric text-[11px] font-mono font-bold uppercase mb-4 border border-purple-electric/30">
                  {t('driverCockpit', lang)}
                </span>

                <div className="w-full h-44 overflow-hidden mb-6 bg-black border border-foreground/10 p-3 flex items-center justify-center">
                  <div className="display-mockup w-full">
                    <div className="top-row">
                      <div>LAP 3/8</div>
                      <div>04:22</div>
                      <div className="text-emerald-400">BAT 78%</div>
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

                <h3 className="font-display text-2xl font-bold text-foreground mb-1">Display</h3>
                <p className="text-xs text-purple-electric font-mono mb-6">{t('displaySubtitle', lang)}</p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-purple-electric flex-shrink-0" />
                    <span>5 View Modes (Race / Lap / Energy)</span>
                  </li>
                  <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-purple-electric flex-shrink-0" />
                    <span>Auto Day/Night Theme via ALS</span>
                  </li>
                  <li className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Check className="w-4 h-4 text-purple-electric flex-shrink-0" />
                    <span>Cross-Venue Auto-Scaling</span>
                  </li>
                </ul>
              </div>

              <Link href="/products/display" className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), 'w-full justify-center')}>
                <span>{t('learnMore', lang)}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
