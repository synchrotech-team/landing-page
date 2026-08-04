'use client';

import React, { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    setToast(null);

    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setToast({ type: 'error', message: 'Kredensial tidak valid. Silakan coba lagi.' });
        setLoading(false);
      } else {
        setToast({ type: 'success', message: 'Login berhasil! Mengalihkan ke dashboard...' });
        setTimeout(() => {
          router.push('/admin');
          router.refresh();
        }, 700);
      }
    } catch (err) {
      console.error('Login error:', err);
      setToast({ type: 'error', message: 'Terjadi kesalahan sistem.' });
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <div className="login-logo">
          <img
            src="/logogram.png"
            alt="SynchroTech"
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
          />
          <span className="login-logo-text">SynchroTech</span>
        </div>

        <h2>Dashboard Admin</h2>
        <p className="subtitle">Masuk untuk mengelola customer & lisensi software</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Masukkan username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" className="action-btn action-btn-primary w-full" style={{ justifyContent: 'center' }} disabled={loading}>
            {loading ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Memproses...
              </>
            ) : (
              'Masuk Ke Dashboard'
            )}
          </button>
        </form>
      </div>

      <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 100 }}>
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 16px',
                borderRadius: 12,
                border: `1px solid ${toast.type === 'success' ? 'rgba(52, 211, 153, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                background: toast.type === 'success' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: toast.type === 'success' ? '#34d399' : '#f87171',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
