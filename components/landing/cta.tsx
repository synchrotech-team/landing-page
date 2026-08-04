'use client';

import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Language } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTAProps {
  lang: Language;
}

export function CTA({ lang }: CTAProps) {
  return (
    <section className="py-20 bg-background relative border-t border-foreground/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <MotionReveal>
          <div className="relative border border-purple-electric/30 p-10 md:p-16 text-center overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat cta-bg" />
            <div className="absolute inset-0 bg-background/75" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="font-mono text-xs text-orange-motorsport font-bold tracking-widest uppercase mb-4 block">
                {lang === 'id' ? 'SIAP MENGOPTIMALKAN BALAPAN ANDA?' : 'READY TO DOMINATE THE TRACK?'}
              </span>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tighter uppercase mb-6 leading-tight">
                {lang === 'id' ? (
                  <>Mulai Perekaman Telemetri Presisi <br /><span className="text-purple-electric">Hari Ini</span></>
                ) : (
                  <>Start Capturing Precision Telemetry <br /><span className="text-purple-electric">Today</span></>
                )}
              </h2>

              <p className="text-muted-foreground text-base mb-8 max-w-2xl mx-auto leading-relaxed">
                {lang === 'id'
                  ? 'Hubungi tim engineer SynchroTech untuk konsultasi ekosistem telemetri yang paling sesuai dengan kategori kendaraan balap Anda.'
                  : 'Get in touch with SynchroTech engineers for a tailored telemetry ecosystem consultation for your racing category.'}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/products"
                  className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }), 'space-x-2')}
                >
                  <span>{lang === 'id' ? 'Jelajahi Produk' : 'Explore Hardware'}</span>
                  <ArrowRight size={16} />
                </Link>

                <a
                  href="https://wa.me/628132595764?text=Halo%20SynchroTech,%20saya%20tertarik%20untuk%20konsultasi%20sistem%20telemetri"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#25D366] text-white font-display text-xs font-bold uppercase tracking-wider flex items-center space-x-2 hover:brightness-90 transition-all duration-300"
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
