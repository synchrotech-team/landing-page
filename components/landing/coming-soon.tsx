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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07070A]/90 backdrop-blur-xl p-4 overflow-hidden">
      {/* Background Telemetry Grid & Orbs */}
      <div className="absolute inset-0 telemetry-grid-bg pointer-events-none opacity-30" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 glow-orb-purple opacity-40 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full bg-[#0D0D14] border border-[#A855F7]/30 rounded-3xl p-8 text-center shadow-[0_0_50px_rgba(168,85,247,0.2)]">
        <div className="w-16 h-16 rounded-2xl bg-[#A855F7]/15 text-[#A855F7] flex items-center justify-center mx-auto mb-6 border border-[#A855F7]/30">
          <Cpu className="w-8 h-8 animate-pulse" />
        </div>

        <span className="font-mono text-xs text-[#A855F7] font-bold tracking-widest uppercase mb-2 block">
          {t('systemUpdate', lang)}
        </span>

        <h2 className="font-display text-3xl font-extrabold text-white uppercase tracking-tight mb-4">
          {t('comingSoonTitle', lang)}
        </h2>

        <p className="text-gray-300 text-sm leading-relaxed mb-8">
          {t('comingSoonDesc', lang).replace('{page}', pageName)}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 border border-white/10 rounded-full h-3 overflow-hidden mb-8 p-0.5">
          <div className="bg-gradient-to-r from-[#A855F7] to-[#FF8A00] h-full rounded-full w-[87%] animate-pulse" />
        </div>

        <div className="font-mono text-xs text-gray-400 mb-8">
          {t('establishingTelemetry', lang)}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300 border border-white/15 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>{t('backToHome', lang)}</span>
        </button>
      </div>
    </div>
  );
}
