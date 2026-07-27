'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, Cpu, Radio, Zap } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';
import { MotionCounter } from '@/components/motion/counter';

interface HeroProps {
  lang: Language;
  onExploreClick: () => void;
  onDemoClick: () => void;
}

export function Hero({ lang, onExploreClick, onDemoClick }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden py-20 md:py-28 telemetry-grid-bg">
      {/* Glow Orbs Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] glow-orb-purple pointer-events-none opacity-40 blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] glow-orb-orange pointer-events-none opacity-20 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full z-10">
        <div className="max-w-4xl">
          {/* Top Tagline Badge */}
          <MotionReveal delay={0.1}>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#A855F7]/30 backdrop-blur-md mb-6">
              <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-pulse" />
              <span className="font-mono text-xs text-[#A855F7] font-semibold tracking-wider uppercase">
                {t('heroTagline', lang)}
              </span>
            </div>
          </MotionReveal>

          {/* Main Space Grotesk Headline */}
          <MotionReveal delay={0.2}>
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight uppercase leading-[1.05] mb-6">
              {lang === 'en' ? (
                <>
                  Precision <br />
                  Telemetry For <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#FF8A00]">
                    Every Track Level
                  </span>
                </>
              ) : (
                <>
                  Telemetri Presisi <br />
                  Untuk Setiap <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#FF8A00]">
                    Level Lintasan
                  </span>
                </>
              )}
            </h1>
          </MotionReveal>

          {/* Subtitle */}
          <MotionReveal delay={0.3}>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10">
              {t('heroSubtitle', lang)}
            </p>
          </MotionReveal>

          {/* Dual Action Buttons */}
          <MotionReveal delay={0.4}>
            <div className="flex flex-wrap gap-4 items-center mb-16">
              <button
                onClick={onExploreClick}
                className="px-8 py-4 rounded-xl bg-[#A855F7] text-white font-display text-sm font-bold tracking-wider uppercase flex items-center space-x-3 hover:bg-[#9333EA] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 transform active:scale-95 cursor-pointer"
              >
                <span>{t('exploreSystems', lang)}</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onDemoClick}
                className="px-8 py-4 rounded-xl bg-white/[0.05] border border-white/15 text-white font-display text-sm font-bold tracking-wider uppercase flex items-center space-x-3 hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform active:scale-95 cursor-pointer"
              >
                <Play size={16} fill="white" />
                <span>{t('viewDemo', lang)}</span>
              </button>
            </div>
          </MotionReveal>
        </div>

        {/* Live Motorsport Metrics Counter Band */}
        <MotionReveal delay={0.5}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-4xl">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-[#A855F7]/10 text-[#A855F7]">
                <Cpu size={24} />
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-white">
                  <MotionCounter value={24} suffix="-Bit" />
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
                  ADS1256 ADC Precision
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-[#FF8A00]/10 text-[#FF8A00]">
                <Radio size={24} />
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-white">
                  <MotionCounter value={25} suffix=" Hz" />
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
                  u-blox GNSS Refresh Rate
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-[#10B981]/10 text-[#10B981]">
                <Zap size={24} />
              </div>
              <div>
                <div className="font-mono text-2xl font-bold text-white">
                  <MotionCounter value={4} suffix="G LTE" />
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider font-mono">
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
