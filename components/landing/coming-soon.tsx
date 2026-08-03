'use client';

import { Cpu, ArrowLeft } from 'lucide-react';
import { Language, t } from '@/lib/i18n';

interface ComingSoonProps {
  pageName: string;
  onClose: () => void;
  lang: Language;
}

export function ComingSoon({ pageName, onClose, lang }: ComingSoonProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 overflow-hidden">
      {/* Background Telemetry Grid */}
      <div className="absolute inset-0 telemetry-grid-bg pointer-events-none opacity-30" />

      <div className="relative z-10 max-w-lg w-full bg-surface border border-purple-electric/30 p-8 text-center">
        <div className="w-16 h-16 bg-purple-electric/15 text-purple-electric flex items-center justify-center mx-auto mb-6 border border-purple-electric/30">
          <Cpu className="w-8 h-8 animate-pulse" />
        </div>

        <span className="font-mono text-xs text-purple-electric font-bold tracking-widest uppercase mb-2 block">
          {t('systemUpdate', lang)}
        </span>

        <h2 className="font-display text-3xl font-extrabold text-foreground uppercase tracking-tighter mb-4">
          {t('comingSoonTitle', lang)}
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          {t('comingSoonDesc', lang).replace('{page}', pageName)}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-foreground/5 border border-foreground/10 h-3 overflow-hidden mb-8 p-0.5">
          <div className="bg-purple-electric h-full w-[87%] animate-pulse" />
        </div>

        <div className="font-mono text-xs text-muted-foreground mb-8">
          {t('establishingTelemetry', lang)}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-foreground/10 hover:bg-foreground/20 text-foreground font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 border border-foreground/15 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{t('backToHome', lang)}</span>
        </button>
      </div>
    </div>
  );
}
