'use client';

import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';

interface CTAProps {
  lang: Language;
}

export function CTA({ lang }: CTAProps) {
  return (
    <section className="py-20 bg-[#07070A] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <MotionReveal>
          <div className="relative rounded-3xl bg-gradient-to-r from-[#1A0A2E] via-[#2D1B4E] to-[#1A0A2E] border border-[#A855F7]/30 p-10 md:p-16 text-center shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 glow-orb-purple opacity-50 blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="font-mono text-xs text-[#FF8A00] font-bold tracking-widest uppercase mb-4 block">
                {lang === 'id' ? 'SIAP MENGOPTIMALKAN BALAPAN ANDA?' : 'READY TO DOMINATE THE TRACK?'}
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-6 leading-tight">
                {lang === 'id' ? (
                  <>Mulai Perekaman Telemetri Presisi <br /><span className="text-[#A855F7]">Hari Ini</span></>
                ) : (
                  <>Start Capturing Precision Telemetry <br /><span className="text-[#A855F7]">Today</span></>
                )}
              </h2>

              <p className="text-gray-300 text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                {lang === 'id' 
                  ? 'Hubungi tim engineer SynchroTech untuk konsultasi ekosistem telemetri yang paling sesuai dengan kategori kendaraan balap Anda.'
                  : 'Get in touch with SynchroTech engineers for a tailored telemetry ecosystem consultation for your racing category.'}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/products"
                  className="px-8 py-4 rounded-xl bg-[#A855F7] text-white font-display text-xs font-bold uppercase tracking-wider flex items-center space-x-2 hover:bg-[#9333EA] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300 transform active:scale-95"
                >
                  <span>{lang === 'id' ? 'Jelajahi Produk' : 'Explore Hardware'}</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="https://wa.me/628132595764?text=Halo%20SynchroTech,%20saya%20tertarik%20untuk%20konsultasi%20sistem%20telemetri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-xl bg-[#25D366] text-white font-display text-xs font-bold uppercase tracking-wider flex items-center space-x-2 hover:bg-[#20ba5a] transition-all duration-300 transform active:scale-95 shadow-lg"
                >
                  <MessageSquare size={16} />
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
