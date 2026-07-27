'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Phone, Mail, Activity, Globe, Send, RefreshCw } from 'lucide-react';
import { Language, t } from '@/lib/i18n';
import { MotionReveal } from '@/components/motion/reveal';

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
    <section id="contact" className="py-24 bg-[#07070A] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <MotionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#A855F7] font-semibold tracking-widest uppercase mb-3 block">
              {t('contactCategory', lang)}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase mb-4">
              {t('contactTitle', lang)}
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              {t('contactSubtitle', lang)}
            </p>
          </div>
        </MotionReveal>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info Card */}
          <div className="lg:col-span-5">
            <MotionReveal delay={0.1}>
              <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-8 backdrop-blur-xl space-y-6">
                <h3 className="font-display text-2xl font-bold text-white mb-2">
                  {t('detailTitle', lang)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {t('detailDesc', lang)}
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-[#A855F7]/10 text-[#A855F7] flex-shrink-0 mt-0.5">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-300 uppercase">{t('addressLabel', lang)}</h4>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                        Jl. St., Karanggeringging, Sumpiuh, Kec. Sumpiuh, Kabupaten Banyumas, Jawa Tengah 53195, Indonesia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-[#A855F7]/10 text-[#A855F7] flex-shrink-0 mt-0.5">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-300 uppercase">{t('whatsappLabel', lang)}</h4>
                      <a 
                        href="https://wa.me/628132595764" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-xs text-gray-300 hover:text-[#A855F7] transition-colors mt-1 block font-mono"
                      >
                        +62 813-2595-764
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-[#A855F7]/10 text-[#A855F7] flex-shrink-0 mt-0.5">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-300 uppercase">{t('emailLabel', lang)}</h4>
                      <a 
                        href="mailto:synchrotechrace@gmail.com" 
                        className="text-xs text-gray-300 hover:text-[#A855F7] transition-colors mt-1 block font-mono"
                      >
                        synchrotechrace@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-xl bg-[#A855F7]/10 text-[#A855F7] flex-shrink-0 mt-0.5">
                      <Activity size={20} />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-gray-300 uppercase">{t('businessCategory', lang)}</h4>
                      <p className="text-xs text-gray-400 mt-1">{t('businessDesc', lang)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.2}>
              <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-8 backdrop-blur-xl">
                <h3 className="font-display text-2xl font-bold text-white mb-6">
                  {t('formTitle', lang)}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono font-semibold text-gray-300 uppercase mb-2">
                      {t('fullName', lang)}
                    </label>
                    <input 
                      type="text"
                      id="name"
                      required
                      placeholder={t('namePlaceholder', lang)}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0D0D14] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#A855F7] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono font-semibold text-gray-300 uppercase mb-2">
                      {t('emailLabel', lang)}
                    </label>
                    <input 
                      type="email"
                      id="email"
                      required
                      placeholder={t('emailPlaceholder', lang)}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={submitting}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0D0D14] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#A855F7] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono font-semibold text-gray-300 uppercase mb-2">
                      {t('messageLabel', lang)}
                    </label>
                    <textarea 
                      id="message"
                      rows={4}
                      required
                      placeholder={t('messagePlaceholder', lang)}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={submitting}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0D0D14] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#A855F7] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#9333EA] text-white font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 cursor-pointer disabled:opacity-50"
                  >
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
                  </button>
                </form>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
