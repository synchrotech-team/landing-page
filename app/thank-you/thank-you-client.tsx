'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Check, Mail, MessageSquare, ArrowLeft, ArrowRight } from 'lucide-react';
import { PRODUCTS_DATA } from '@/lib/products';
import { useLang } from '@/lib/i18n';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { ComingSoon } from '@/components/landing/coming-soon';
import { MotionReveal } from '@/components/motion/reveal';
import { Card } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || 'Pelanggan';
  const email = searchParams.get('email') || 'synchrotechrace@gmail.com';
  const message = searchParams.get('message') || '';
  const [lang, setLang] = useLang();
  const [comingSoonPage, setComingSoonPage] = useState<string | null>(null);

  const toggleLang = () => setLang(prev => (prev === 'en' ? 'id' : 'en'));
  const triggerComingSoon = (pageName: string) => setComingSoonPage(pageName);

  const subject = `Kontak dari ${name} - SynchroTech`;
  const mailBody = `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=synchrotechrace@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
  const waUrl = `https://wa.me/628132595764?text=${encodeURIComponent(`Halo SynchroTech, saya ${name} (${email}). Saya telah mengirim pesan melalui website: ${message}`)}`;

  const productsList = Object.values(PRODUCTS_DATA);

  if (comingSoonPage) {
    return <ComingSoon lang={lang} pageName={comingSoonPage} onClose={() => setComingSoonPage(null)} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar lang={lang} onToggleLang={toggleLang} onTriggerComingSoon={triggerComingSoon} />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <MotionReveal>
            <Card className="bg-surface p-8 md:p-12 text-center">
              <div className="w-20 h-20 bg-purple-electric flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="text-white" strokeWidth={3} />
              </div>

              <span className="block font-mono text-xs font-bold tracking-widest text-purple-electric uppercase mb-2">
                {lang === 'id' ? 'TRANSMISI PESAN BERHASIL' : 'MESSAGE TRANSMISSION SUCCESSFUL'}
              </span>

              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground uppercase tracking-tighter mb-4">
                {lang === 'id' ? `Terima Kasih, ${name}!` : `Thank You, ${name}!`}
              </h1>

              <p className="text-muted-foreground text-base leading-relaxed max-w-xl mx-auto mb-8">
                {lang === 'id' ? (
                  <>Pesan Anda telah berhasil kami terima. Tim teknis <strong className="text-foreground">SynchroTech Racing</strong> akan segera meninjau dan merespons pertanyaan Anda melalui email <strong className="text-foreground">{email}</strong>.</>
                ) : (
                  <>Your message has been received. The <strong className="text-foreground">SynchroTech Racing</strong> technical team will review and respond to your inquiry via <strong className="text-foreground">{email}</strong> shortly.</>
                )}
              </p>

              {message && (
                <div className="bg-surface border border-foreground/10 p-5 text-left mb-8">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-mono">
                    {lang === 'id' ? 'Ringkasan Pesan Terkirim:' : 'Sent Message Summary:'}
                  </div>
                  <div className="text-sm text-muted-foreground italic whitespace-pre-wrap">
                    &quot;{message}&quot;
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: 'secondary', size: 'md' }), 'justify-center space-x-2')}
                >
                  <Mail size={18} />
                  <span>{lang === 'id' ? 'Buka Gmail (Web)' : 'Open Gmail (Web)'}</span>
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-display text-sm font-semibold uppercase tracking-wider hover:brightness-90 transition-all"
                >
                  <MessageSquare size={18} />
                  <span>{lang === 'id' ? 'Chat via WhatsApp' : 'Chat via WhatsApp'}</span>
                </a>
              </div>

              <Link href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'md' }), 'space-x-2')}>
                <ArrowLeft size={16} />
                <span>{lang === 'id' ? 'Kembali ke Beranda' : 'Return to Homepage'}</span>
              </Link>
            </Card>
          </MotionReveal>

          {/* Explore Product Catalog */}
          <MotionReveal delay={0.1}>
            <div className="mt-20 text-center">
              <span className="block font-mono text-xs text-orange-motorsport font-bold tracking-widest uppercase mb-2">
                {lang === 'id' ? 'EKSPLORASI PRODUK BALAP' : 'EXPLORE RACING HARDWARE'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground uppercase tracking-tighter">
                {lang === 'id' ? 'Jelajahi Lini Perangkat Keras Telemetri' : 'Explore Telemetry Hardware Lineup'}
              </h2>
            </div>
          </MotionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {productsList.map((prod, idx) => (
              <MotionReveal key={prod.slug} delay={0.1 + idx * 0.1}>
                <Card className="bg-surface p-6 h-full flex flex-col justify-between">
                  <div>
                    <span className={cn(
                      'inline-block text-[11px] font-mono font-bold uppercase px-2.5 py-1 mb-3 border',
                      prod.badgeType === 'blue'
                        ? 'bg-[#3B82F6]/20 text-[#60A5FA] border-[#3B82F6]/30'
                        : prod.badgeType === 'purple'
                        ? 'bg-purple-electric/20 text-purple-electric border-purple-electric/30'
                        : 'bg-foreground/10 text-muted-foreground border-transparent'
                    )}>
                      {prod.badge}
                    </span>
                    <h3 className="font-display text-lg font-bold text-foreground mb-1">{prod.name}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{prod.category}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{prod.description}</p>
                  </div>
                  <Link
                    href={`/products/${prod.slug}`}
                    className={cn(buttonVariants({ variant: 'secondary', size: 'sm' }), 'w-full justify-center space-x-2')}
                  >
                    <span>{lang === 'id' ? 'Detail Produk' : 'View Specs'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </Card>
              </MotionReveal>
            ))}
          </div>
        </div>
      </main>

      <Footer lang={lang} onToggleLang={toggleLang} onTriggerComingSoon={triggerComingSoon} />
    </div>
  );
}

export default function ThankYouPageClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div>Loading thank you details...</div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
