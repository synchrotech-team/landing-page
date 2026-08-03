'use client';

import { Radio, Sliders, Cpu, Activity, Signal, Zap } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';

interface FeaturesProps {
  lang: Language;
}

export function Features({ lang }: FeaturesProps) {
  return (
    <section className="py-24 bg-background relative border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <MotionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Bento Box 1: Wireless Everything */}
            <div className="group bg-foreground/2 border border-foreground/10 p-8 hover:border-purple-electric/40 transition-colors duration-150 relative overflow-hidden">
              <div className="w-12 h-12 bg-purple-electric/10 text-purple-electric flex items-center justify-center mb-6">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                {t('wirelessTitle', lang)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {t('wirelessDesc', lang)}
              </p>
              <div className="font-mono text-xs text-purple-electric flex items-center space-x-2">
                <Signal className="w-4 h-4" />
                <span>WiFi 802.11 b/g/n + BLE 5.0 + 4G LTE</span>
              </div>
            </div>

            {/* Bento Box 2: Flexible I/O */}
            <div className="group bg-foreground/2 border border-foreground/10 p-8 hover:border-orange-motorsport/40 transition-colors duration-150 relative overflow-hidden">
              <div className="w-12 h-12 bg-orange-motorsport/10 text-orange-motorsport flex items-center justify-center mb-6">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                {t('ioTitle', lang)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {t('ioDesc', lang)}
              </p>
              <div className="font-mono text-xs text-orange-motorsport flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Configurable Analog / RPM / PWM / Digital</span>
              </div>
            </div>

            {/* Bento Box 3: 6-Axis IMU */}
            <div className="group bg-foreground/2 border border-foreground/10 p-8 hover:border-lime/40 transition-colors duration-150 relative overflow-hidden">
              <div className="w-12 h-12 bg-lime/10 text-lime flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                {t('imuTitle', lang)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {t('imuDesc', lang)}
              </p>
              <div className="font-mono text-xs text-lime flex items-center space-x-2">
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
