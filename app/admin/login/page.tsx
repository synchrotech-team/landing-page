'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Cpu, RefreshCw, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError('Kredensial tidak valid. Silakan coba lagi.');
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* Background elements */}
      <div className="grid-bg"></div>
      <div className="glow-orb glow-1"></div>
      <div className="glow-orb glow-2"></div>

      <div className="login-card">
        <div className="login-logo">
          <img 
            src="/logotype.png" 
            alt="SynchroTech" 
            style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
          />
        </div>
        
        <h2>Dashboard Admin</h2>
        <p className="subtitle">Masuk untuk mengelola customer & lisensi software</p>

        {error && (
          <div className="error-alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

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

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? (
              <>
                <RefreshCw size={14} className="spinner" /> Memproses...
              </>
            ) : (
              'Masuk Ke Dashboard'
            )}
          </button>
        </form>
      </div>


    </div>
  );
}
