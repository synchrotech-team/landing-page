'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Download, 
  Upload, 
  RefreshCw, 
  Check, 
  FileCheck, 
  HardDrive, 
  Calendar, 
  ExternalLink, 
  Sparkles,
  Trash2,
  AlertCircle,
  Globe
} from 'lucide-react';

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

export default function AdminSoftwarePage() {
  const [releases, setReleases] = useState<SoftwareRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // New release form states
  const [title, setTitle] = useState('SynchroTech Race Telemetry Suite');
  const [titleEn, setTitleEn] = useState('SynchroTech Race Telemetry Suite');
  const [version, setVersion] = useState('v1.2.0');
  const [osRequirements, setOsRequirements] = useState('Windows 10/11 (64-bit)');
  const [fileName, setFileName] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [releaseNotes, setReleaseNotes] = useState('');
  const [releaseNotesEn, setReleaseNotesEn] = useState('');
  const [storageType, setStorageType] = useState('');

  const fetchReleases = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/software');
      const data = await res.json();
      if (data.success) {
        setReleases(data.releases);
      }
    } catch (err) {
      console.error('Failed to fetch software releases:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReleases();
  }, []);

  const activeRelease = releases.find(r => r.isActive) || releases[0];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/admin/software/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setFileUrl(data.fileUrl);
        setFileName(data.fileName);
        setFileSize(data.fileSize);
        setStorageType(data.storage);
        if (data.extractedVersion) {
          setVersion(data.extractedVersion);
        }
        setSuccessMsg(`File "${data.fileName}" (${data.fileSize}) berhasil diunggah! Versi otomatis terdeteksi: ${data.extractedVersion || version}`);
      } else {
        setErrorMsg(data.error || 'Gagal mengunggah file installer');
      }
    } catch (err) {
      console.error('Upload catch error:', err);
      setErrorMsg('Gagal mengunggah file installer .exe');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveRelease = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileUrl) {
      setErrorMsg('Silakan unggah file installer .exe terlebih dahulu atau masukkan URL file');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/admin/software', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          titleEn,
          version: version || 'v1.0.0',
          osRequirements,
          fileName: fileName || 'SynchroTech_Setup.exe',
          fileUrl,
          fileSize: fileSize || '45 MB',
          releaseNotes,
          releaseNotesEn,
          isActive: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Rilis installer software baru berhasil diaktifkan!');
        setFileUrl('');
        setFileName('');
        setFileSize('');
        setReleaseNotes('');
        setReleaseNotesEn('');
        fetchReleases();
      } else {
        setErrorMsg(data.error || 'Gagal menyimpan rilis installer');
      }
    } catch (err) {
      console.error('Save release error:', err);
      setErrorMsg('Gagal menyimpan rilis installer');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteRelease = async (id: number, releaseVer: string) => {
    if (!confirm(`Hapus rilis software "${releaseVer}"?`)) return;

    try {
      const res = await fetch(`/api/admin/software?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        fetchReleases();
      }
    } catch (err) {
      console.error('Delete release error:', err);
    }
  };

  const handleSetActive = async (id: number) => {
    try {
      const target = releases.find(r => r.id === id);
      if (!target) return;

      const res = await fetch('/api/admin/software', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...target,
          isActive: true,
        }),
      });

      const data = await res.json();
      if (data.success) {
        fetchReleases();
      }
    } catch (err) {
      console.error('Activate release error:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="dash-card">
        <div className="cust-header">
          <div>
            <span className="font-mono text-[10px] text-purple-electric font-bold tracking-widest uppercase block mb-1">
              DESKTOP SOFTWARE RELEASE MANAGEMENT
            </span>
            <h1 className="dash-title">Manajemen Installer Software (.exe)</h1>
            <p className="dash-subtitle">
              Upload file installer baru ke Vercel Blob Storage, kelola versi software, dan kelola rilis halaman `/downloads`
            </p>
          </div>

          <div className="flex space-x-3">
            <Link
              href="/downloads"
              target="_blank"
              className="action-btn bg-white/10 hover:bg-white/20 text-white"
            >
              <ExternalLink size={16} />
              <span>Lihat Halaman Downloads Publik</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Active Release Status Card */}
      {activeRelease && (
        <div className="dash-card bg-linear-to-r from-surface via-[#130E26] to-surface border border-purple-electric/40 shadow-[0_0_50px_rgba(168,85,247,0.2)] relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
            <div className="flex items-center space-x-5">
              <div className="w-16 h-16 rounded-2xl bg-purple-electric/20 border border-purple-electric/40 flex items-center justify-center text-[#C084FC] shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                <FileCheck size={32} />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                    ● BUILD AKTIF PUBLIK
                  </span>
                  <span className="font-mono text-xs text-purple-electric font-bold">
                    {activeRelease.version}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">
                  {activeRelease.title || activeRelease.fileName}
                </h3>
                <p className="text-xs font-mono text-gray-400 mt-1">
                  File: <span className="text-white font-bold">{activeRelease.fileName}</span> • Ukuran: <span className="text-white font-bold">{activeRelease.fileSize || 'N/A'}</span> • Total Unduhan: <span className="text-emerald-400 font-bold">{activeRelease.downloadCount}x</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={`/api/download/software?action=download&id=${activeRelease.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase transition-all flex items-center space-x-2 border border-white/15"
              >
                <Download size={14} />
                <span>Test Unduh Installer (.exe)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Upload New Installer File Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form: Upload & Version Metadata (7 Cols) */}
        <form onSubmit={handleSaveRelease} className="lg:col-span-7 dash-card space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-display text-lg font-bold text-white uppercase flex items-center space-x-2">
              <Upload size={18} className="text-purple-electric" />
              <span>Upload & Publikasikan Software Baru</span>
            </h3>
            <p className="text-xs font-mono text-gray-400">
              Upload file .exe / .msi / .zip langsung ke Vercel Blob Cloud Storage
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-mono font-semibold rounded-xl flex items-center space-x-2">
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold rounded-xl flex items-center space-x-2">
              <Check size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Upload Drop Zone Box */}
          <div className="rounded-2xl bg-black/60 border border-dashed border-purple-electric/50 p-6 text-center space-y-4 hover:border-purple-electric transition-all">
            <div className="w-14 h-14 rounded-2xl bg-purple-electric/10 border border-purple-electric/30 flex items-center justify-center text-[#C084FC] mx-auto">
              <HardDrive size={28} />
            </div>

            <div>
              <h4 className="font-bold text-white text-sm">Pilih File Installer (.exe, .msi, .zip)</h4>
              <p className="text-xs font-mono text-gray-400 mt-1">
                Mendukung file aplikasi hingga ukuran besar (Vercel Blob Cloud Storage)
              </p>
            </div>

            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".exe,.msi,.zip,.dmg,.rar"
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-6 py-3.5 rounded-xl bg-linear-to-r from-purple-electric to-[#9333EA] text-white text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center space-x-2 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all cursor-pointer disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Mengunggah File ke Vercel Blob...</span>
                </>
              ) : (
                <>
                  <Upload size={16} />
                  <span>Pilih File Dari Komputer</span>
                </>
              )}
            </button>
          </div>

          {/* Form Metadata Fields */}
          <div className="grid grid-cols-2 gap-5 pt-2">
            <div className="form-group space-y-2">
              <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Judul Perangkat Lunak (ID)</label>
              <input 
                type="text" 
                required
                placeholder="mis. SynchroTech Race Telemetry Suite" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
              />
            </div>

            <div className="form-group space-y-2">
              <label className="text-xs font-mono font-bold text-purple-electric uppercase block">Judul Software (EN)</label>
              <input 
                type="text" 
                placeholder="mis. SynchroTech Race Telemetry Suite" 
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="form-group space-y-2">
              <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Versi Software *</label>
              <input 
                type="text" 
                required
                placeholder="mis. v1.2.0" 
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
              />
            </div>

            <div className="form-group space-y-2">
              <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Sistem Operasi</label>
              <input 
                type="text" 
                placeholder="mis. Windows 10/11 (64-bit)" 
                value={osRequirements}
                onChange={(e) => setOsRequirements(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
              />
            </div>

            <div className="form-group space-y-2">
              <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Ukuran File</label>
              <input 
                type="text" 
                placeholder="mis. 45.2 MB" 
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
              />
            </div>
          </div>

          <div className="form-group space-y-2">
            <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Nama File Software (.exe) *</label>
            <input 
              type="text" 
              required
              placeholder="mis. SynchroTech_Telemetry_Setup_v1.2.0.exe" 
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
            />
          </div>

          <div className="form-group space-y-2">
            <label className="text-xs font-mono font-bold text-purple-electric uppercase block">URL Direct Cloud Download</label>
            <input 
              type="text" 
              required
              placeholder="https://...public.blob.vercel-storage.com/... / /downloads/..." 
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs font-mono focus:border-purple-electric"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="form-group space-y-2">
              <label className="text-xs font-mono font-bold text-gray-300 uppercase block">Catatan Rilis Build (ID)</label>
              <textarea 
                rows={4}
                placeholder="Tuliskan fitur baru, perbaikan bug, atau catatan rilis..." 
                value={releaseNotes}
                onChange={(e) => setReleaseNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
              />
            </div>

            <div className="form-group space-y-2">
              <label className="text-xs font-mono font-bold text-purple-electric uppercase block">Release Notes (EN)</label>
              <textarea 
                rows={4}
                placeholder="Write release notes and new features in English..." 
                value={releaseNotesEn}
                onChange={(e) => setReleaseNotesEn(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-electric"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || !fileUrl}
            className="w-full py-4 rounded-xl bg-linear-to-r from-purple-electric to-[#9333EA] text-white font-display text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 hover:shadow-[0_0_35px_rgba(168,85,247,0.5)] transition-all cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>Mengaktifkan Software Baru...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Publikasikan Rilis Software</span>
              </>
            )}
          </button>
        </form>

        {/* Right Panel: History Releases Table (5 Cols) */}
        <div className="lg:col-span-5 dash-card space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-display text-lg font-bold text-white uppercase flex items-center space-x-2">
              <Calendar size={18} className="text-purple-electric" />
              <span>Daftar Build Software</span>
            </h3>
            <p className="text-xs font-mono text-gray-400">
              Riwayat versi installer yang tampil di halaman `/downloads`
            </p>
          </div>

          {loading ? (
            <div className="loading-container py-8">
              <RefreshCw size={24} className="animate-spin text-purple-electric" />
              <span>Memuat rilis software...</span>
            </div>
          ) : releases.length === 0 ? (
            <div className="empty-panel">Belum ada installer yang diunggah.</div>
          ) : (
            <div className="space-y-4">
              {releases.map((rel) => (
                <div 
                  key={rel.id} 
                  className={`p-4 rounded-2xl border transition-all ${
                    rel.isActive 
                      ? 'bg-purple-electric/10 border-purple-electric/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
                      : 'bg-black/40 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-md">
                      {rel.version}
                    </span>
                    {rel.isActive ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        ● AKTIF UTAMA
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetActive(rel.id)}
                        className="text-[10px] font-mono font-bold text-purple-electric hover:underline"
                      >
                        Set Aktif
                      </button>
                    )}
                  </div>

                  <div className="font-bold text-sm text-white truncate mb-1">
                    {rel.title || rel.fileName}
                  </div>

                  <div className="text-[11px] font-mono text-gray-400 mb-3">
                    {rel.fileName} • {rel.fileSize || 'N/A'} • Unduhan: {rel.downloadCount}x
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <a
                      href={`/api/download/software?action=download&id=${rel.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-purple-electric hover:underline flex items-center space-x-1"
                    >
                      <Download size={12} />
                      <span>Unduh Installer</span>
                    </a>

                    <button
                      onClick={() => handleDeleteRelease(rel.id, rel.version)}
                      className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
                      title="Hapus Rilis Ini"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
