'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Phone, Mail, Activity, Globe, Send, RefreshCw } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';
import { Button } from '@/components/ui/button';
import { Input, Textarea } from '@/components/ui/input';

interface ContactProps {
  lang: Language;
}

export function Contact({ lang }: ContactProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitting(true);

    setTimeout(() => {
      const params = new URLSearchParams({
        name,
        email,
        message,
      });
      router.push(`/thank-you?${params.toString()}`);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 bg-background relative border-t border-foreground/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <MotionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-purple-electric font-semibold tracking-widest uppercase mb-3 block">
              {t('contactCategory', lang)}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-foreground tracking-tighter uppercase mb-4">
              {t('contactTitle', lang)}
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              {t('contactSubtitle', lang)}
            </p>
          </div>
        </MotionReveal>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Info Card */}
          <div className="lg:col-span-5 h-full">
            <MotionReveal delay={0.1} className="h-full">
              <div className="bg-foreground/2 border border-foreground/10 p-8 lg:p-10 h-full flex flex-col">
                <div>
                  <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-3">
                    {t('detailTitle', lang)}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                    {t('detailDesc', lang)}
                  </p>
                </div>

                <div className="flex-1 flex flex-col justify-between pt-6 space-y-6 lg:space-y-0">
                  <div className="flex items-start space-x-4">
                    <div className="p-3.5 bg-purple-electric/10 text-purple-electric flex-shrink-0 mt-1">
                      <MapPin size={22} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">{t('addressLabel', lang)}</h4>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1 leading-relaxed">
                        Jl. St., Karanggeringging, Sumpiuh, Kec. Sumpiuh, Kabupaten Banyumas, Jawa Tengah 53195, Indonesia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3.5 bg-purple-electric/10 text-purple-electric flex-shrink-0 mt-1">
                      <Phone size={22} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">{t('whatsappLabel', lang)}</h4>
                      <a
                        href="https://wa.me/628132595764"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base text-muted-foreground hover:text-purple-electric transition-colors mt-1 block font-mono font-medium"
                      >
                        +62 813-2595-764
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3.5 bg-purple-electric/10 text-purple-electric flex-shrink-0 mt-1">
                      <Mail size={22} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">{t('emailLabel', lang)}</h4>
                      <a
                        href="mailto:synchrotechrace@gmail.com"
                        className="text-sm sm:text-base text-muted-foreground hover:text-purple-electric transition-colors mt-1 block font-mono font-medium"
                      >
                        synchrotechrace@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3.5 bg-purple-electric/10 text-purple-electric flex-shrink-0 mt-1">
                      <Activity size={22} />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-mono font-bold text-muted-foreground uppercase tracking-wider">{t('businessCategory', lang)}</h4>
                      <p className="text-sm sm:text-base text-muted-foreground mt-1 leading-relaxed">{t('businessDesc', lang)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 h-full">
            <MotionReveal delay={0.2} className="h-full">
              <div className="bg-foreground/2 border border-foreground/10 p-8 h-full flex flex-col">
                <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                  {t('formTitle', lang)}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono font-semibold text-muted-foreground uppercase mb-2">
                      {t('fullName', lang)}
                    </label>
                    <Input
                      type="text"
                      id="name"
                      required
                      placeholder={t('namePlaceholder', lang)}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                      className="h-auto py-3.5"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono font-semibold text-muted-foreground uppercase mb-2">
                      {t('emailLabel', lang)}
                    </label>
                    <Input
                      type="email"
                      id="email"
                      required
                      placeholder={t('emailPlaceholder', lang)}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={submitting}
                      className="h-auto py-3.5"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <label htmlFor="message" className="block text-xs font-mono font-semibold text-muted-foreground uppercase mb-2">
                      {t('messageLabel', lang)}
                    </label>
                    <Textarea
                      id="message"
                      rows={4}
                      required
                      placeholder={t('messagePlaceholder', lang)}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={submitting}
                      className="resize-none flex-1"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full justify-center mt-auto" disabled={submitting}>
                    {submitting ? (
                      <>
                        <RefreshCw className="animate-spin w-4 h-4" />
                        <span>{t('sending', lang)}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('sendMessage', lang)}</span>
                        <Send size={14} />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
