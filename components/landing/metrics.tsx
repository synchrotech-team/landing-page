'use client';

import { Language } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';
import { MotionCounter } from '@/components/motion/counter';

interface MetricsProps {
  lang: Language;
}

export function Metrics({ lang }: MetricsProps) {
  return (
    <section className="py-16 bg-surface border-y border-foreground/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <MotionReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-2">
                <MotionCounter value={0.1} decimals={1} suffix="ms" />
              </div>
              <div className="text-xs text-purple-electric uppercase tracking-wider font-mono font-semibold">
                {lang === 'id' ? 'Latency Latensi Sub-ms' : 'Sub-ms Stream Latency'}
              </div>
            </div>

            <div className="p-4">
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-2">
                <MotionCounter value={30} suffix=" KSPS" />
              </div>
              <div className="text-xs text-orange-motorsport uppercase tracking-wider font-mono font-semibold">
                {lang === 'id' ? 'Sampel ADC Presisi' : 'ADC Sampling Rate'}
              </div>
            </div>

            <div className="p-4">
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-2">
                <MotionCounter value={100} suffix=" Hz" />
              </div>
              <div className="text-xs text-lime uppercase tracking-wider font-mono font-semibold">
                {lang === 'id' ? 'Frekuensi Telemetri 4G' : '4G Telemetry Rate'}
              </div>
            </div>

            <div className="p-4">
              <div className="font-mono text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-2">
                <MotionCounter value={99.9} decimals={1} suffix="%" />
              </div>
              <div className="text-xs text-purple-electric uppercase tracking-wider font-mono font-semibold">
                {lang === 'id' ? 'Uptime Server Cloud' : 'Podium Cloud Uptime'}
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
