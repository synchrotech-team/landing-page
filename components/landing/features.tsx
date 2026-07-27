'use client';

import { Radio, Sliders, Cpu, Activity, Signal, Zap } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';

interface FeaturesProps {
  lang: Language;
}

export function Features({ lang }: FeaturesProps) {
  return (
    <section className="py-24 bg-[#07070A] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <MotionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bento Box 1: Wireless Everything */}
            <div className="group rounded-2xl bg-white/[0.02] border border-white/10 p-8 hover:border-[#A855F7]/40 hover:bg-white/[0.03] transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {t('wirelessTitle', lang)}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t('wirelessDesc', lang)}
              </p>
              <div className="font-mono text-xs text-[#3B82F6] flex items-center space-x-2">
                <Signal className="w-4 h-4" />
                <span>WiFi 802.11 b/g/n + BLE 5.0 + 4G LTE</span>
              </div>
            </div>

            {/* Bento Box 2: Flexible I/O */}
            <div className="group rounded-2xl bg-white/[0.02] border border-white/10 p-8 hover:border-[#A855F7]/40 hover:bg-white/[0.03] transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {t('ioTitle', lang)}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t('ioDesc', lang)}
              </p>
              <div className="font-mono text-xs text-[#A855F7] flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Configurable Analog / RPM / PWM / Digital</span>
              </div>
            </div>

            {/* Bento Box 3: 6-Axis IMU */}
            <div className="group rounded-2xl bg-white/[0.02] border border-white/10 p-8 hover:border-[#A855F7]/40 hover:bg-white/[0.03] transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {t('imuTitle', lang)}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t('imuDesc', lang)}
              </p>
              <div className="font-mono text-xs text-[#10B981] flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Precision G-Force Mapping & Pitch/Roll</span>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
