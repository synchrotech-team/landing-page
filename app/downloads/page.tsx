'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Monitor, 
  ShieldCheck, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Zap, 
  ExternalLink,
  ChevronRight,
  HardDrive
} from 'lucide-react';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { ComingSoon } from '@/components/landing/coming-soon';
import { Language } from '@/lib/i18n';

interface SoftwareRelease {
  id: number;
  title: string;
  titleEn: string | null;
  version: string;
  fileName: string;
  fileSize: string | null;
  fileUrl: string;
  osRequirements: string;
  releaseNotes: string | null;
  releaseNotesEn: string | null;
  downloadCount: number;
  isActive: boolean;
  createdAt: string;
}

export default function DownloadsPage() {
  const [lang, setLang] = useState<Language>('id');
  const [comingSoonPage, setComingSoonPage] = useState<string | null>(null);
  const [releases, setReleases] = useState<SoftwareRelease[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleLang = () => {
    setLang(prev => (prev === 'id' ? 'en' : 'id'));
  };

  const fetchReleases = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/download/software');
      const data = await res.json();
      if (data.success && data.releases) {
        setReleases(data.releases);
      }
    } catch (err) {
      console.error('Failed to fetch software downloads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  const activeRelease = releases.find(r => r.isActive) || releases[0];
  const archivedReleases = releases.filter(r => r.id !== activeRelease?.id);

  return (
    <div className="min-h-screen bg-[#040407] text-[#FFFFFF] font-sans antialiased selection:bg-purple-electric selection:text-white">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-linear-to-b from-purple-electric/15 to-transparent blur-[120px]" />
        <div className="absolute top-[400px] right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px]" />
      </div>

      <div className="relative z-10">
        <Navbar 
          lang={lang} 
          onToggleLang={toggleLang} 
          onTriggerComingSoon={(page) => setComingSoonPage(page)} 
        />

        {/* Page Hero */}
        <section className="pt-16 pb-12 border-b border-white/5 relative">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-electric/10 border border-purple-electric/30 backdrop-blur-xl">
              <Zap size={14} className="text-purple-electric" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#C084FC]">
                {lang === 'en' ? 'OFFICIAL SOFTWARE DOWNLOAD CENTER' : 'PUSAT PENGUNDUHAN SOFTWARE RESMI'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white max-w-4xl mx-auto leading-tight">
              {lang === 'en' ? (
                <>SynchroTech Race <br /><span className="text-purple-electric">Desktop Telemetry Suite</span></>
              ) : (
                <>Perangkat Lunak Telemetri <br /><span className="text-purple-electric">SynchroTech Race</span></>
              )}
            </h1>

            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {lang === 'en' 
                ? 'Download the official Windows desktop application for high-speed telemetry logging, live cockpit displays, and CAN Bus data processing.'
                : 'Unduh aplikasi desktop Windows resmi untuk pencatatan data telemetri kecepatan tinggi, dasbor kokpit real-time, dan pemrosesan CAN Bus.'
              }
            </p>

            {/* Quick OS Badge */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono text-gray-400">
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                <Monitor size={16} className="text-purple-electric" />
                <span>Windows 10 / 11 (64-bit)</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>Terverifikasi Bebas Virus / Malware</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                <Cpu size={16} className="text-sky-400" />
                <span>Lisensi Klien Otomatis</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Active Release Card */}
        <section className="py-16 max-w-7xl mx-auto px-4 md:px-8 space-y-12">
          {loading ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-10 h-10 border-4 border-purple-electric border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-mono text-xs text-gray-400">Memuat rilis software terbaru...</p>
            </div>
          ) : activeRelease ? (
            <div className="rounded-3xl bg-linear-to-br from-surface via-[#130E26] to-surface border border-purple-electric/40 p-8 md:p-12 shadow-[0_0_80px_rgba(168,85,247,0.2)] relative overflow-hidden space-y-8">
              {/* Card Top Row */}
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                      ● LATEST STABLE BUILD
                    </span>
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-electric/20 text-[#C084FC] border border-purple-electric/30 uppercase">
                      {activeRelease.version}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white">
                    {lang === 'en' && activeRelease.titleEn ? activeRelease.titleEn : activeRelease.title}
                  </h2>
                  <p className="font-mono text-sm text-purple-electric">
                    Nama File: <span className="text-white font-bold">{activeRelease.fileName}</span>
                  </p>
                </div>

                {/* Direct Download Button */}
                <div className="space-y-2 text-right">
                  <a
                    href={`/api/download/software?action=download&id=${activeRelease.id}`}
                    className="inline-flex items-center space-x-3 px-8 py-5 rounded-2xl bg-linear-to-r from-purple-electric to-[#9333EA] text-white font-display text-sm font-bold uppercase tracking-wider shadow-[0_0_40px_rgba(168,85,247,0.5)] hover:shadow-[0_0_60px_rgba(168,85,247,0.8)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <Download size={20} />
                    <span>UNDUH INSTALLER (.EXE)</span>
                  </a>
                  <p className="text-[11px] font-mono text-gray-400 text-center md:text-right">
                    Ukuran: <span className="text-white font-bold">{activeRelease.fileSize || '45 MB'}</span> • Total Unduhan: <span className="text-emerald-400 font-bold">{activeRelease.downloadCount}x</span>
                  </p>
                </div>
              </div>

              {/* Release Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                  <span className="text-[11px] font-mono text-gray-400 uppercase">Sistem Operasi Minimal:</span>
                  <div className="font-bold text-white text-sm">{activeRelease.osRequirements || 'Windows 10 / 11 (64-bit)'}</div>
                </div>

                <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                  <span className="text-[11px] font-mono text-gray-400 uppercase">Pengiriman Cloud:</span>
                  <div className="font-bold text-emerald-400 text-sm flex items-center space-x-1.5">
                    <CheckCircle2 size={16} />
                    <span>Vercel Blob Storage CDN</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-1">
                  <span className="text-[11px] font-mono text-gray-400 uppercase">Verifikasi Lisensi:</span>
                  <div className="font-bold text-sky-400 text-sm">Online Hardware ID Locking</div>
                </div>
              </div>

              {/* Release Notes Checklist Box */}
              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                <h3 className="font-mono text-xs font-bold text-purple-electric uppercase tracking-wider flex items-center space-x-2">
                  <FileText size={16} />
                  <span>Catatan Rilis Build & Fitur Baru ({activeRelease.version})</span>
                </h3>

                <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-line">
                  {lang === 'en' && activeRelease.releaseNotesEn 
                    ? activeRelease.releaseNotesEn 
                    : activeRelease.releaseNotes || 'Versi rilis resmi SynchroTech Race Telemetry Suite.'
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-linear-to-br from-surface via-[#130E26] to-surface border border-purple-electric/30 p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-electric/10 border border-purple-electric/30 flex items-center justify-center text-[#C084FC] mx-auto">
                <HardDrive size={32} />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  {lang === 'en' ? 'Installer Build Not Published Yet' : 'Installer Software Belum Dipublikasikan'}
                </h3>
                <p className="text-sm text-gray-300">
                  {lang === 'en'
                    ? 'The administrator has not uploaded an active software release build yet. Please check back soon or contact support.'
                    : 'Administrator belum mengunggah rilis installer software yang aktif. Silakan periksa kembali nanti atau unggah melalui dashboard admin.'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Archived Releases History */}
          {archivedReleases.length > 0 && (
            <div className="space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  {lang === 'en' ? 'Version Release History' : 'Riwayat Versi Installer Software'}
                </h3>
                <p className="text-xs font-mono text-gray-400">
                  Arsip versi build software sebelumnya yang dapat diunduh ulang
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {archivedReleases.map((rel) => (
                  <div key={rel.id} className="p-6 rounded-2xl bg-surface border border-white/10 space-y-4 hover:border-purple-electric/40 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-white/10 text-white border border-white/15">
                        {rel.version}
                      </span>
                      <span className="text-xs font-mono text-gray-400">
                        {rel.fileSize || 'N/A'}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-white text-base">{rel.fileName}</h4>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                        {lang === 'en' && rel.releaseNotesEn ? rel.releaseNotesEn : rel.releaseNotes}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-gray-400">
                        Unduhan: <span className="text-white font-bold">{rel.downloadCount}x</span>
                      </span>

                      <a
                        href={`/api/download/software?action=download&id=${rel.id}`}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-purple-electric text-purple-electric hover:text-white text-xs font-mono font-bold uppercase transition-all flex items-center space-x-1.5"
                      >
                        <Download size={14} />
                        <span>Unduh Versi Ini</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <Footer lang={lang} onToggleLang={toggleLang} onTriggerComingSoon={(page) => setComingSoonPage(page)} />
      </div>

      {comingSoonPage && (
        <ComingSoon lang={lang} pageName={comingSoonPage} onClose={() => setComingSoonPage(null)} />
      )}
    </div>
  );
}
