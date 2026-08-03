'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Users, 
  Key, 
  Package,
  LogOut,
  Download
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't render sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navGroups = [
    {
      title: 'RINGKASAN UTAMA',
      items: [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
      ]
    },
    {
      title: 'KATALOG & STORE',
      items: [
        { name: 'Manajemen Produk', href: '/admin/products', icon: Package },
      ]
    },
    {
      title: 'SOFTWARE & LISENSI',
      items: [
        { name: 'Installer Software', href: '/admin/software', icon: Download },
        { name: 'Manajemen Customer', href: '/admin/customers', icon: Users },
        { name: 'License Keys', href: '/admin/licenses', icon: Key },
      ]
    }
  ];

  return (
    <div className="admin-layout-container">
      {/* Background patterns */}
      <div className="admin-grid-bg"></div>

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand flex items-center justify-between">
          <img 
            src="/logotype.png" 
            alt="SynchroTech" 
            style={{ height: '26px', width: 'auto', objectFit: 'contain' }} 
          />
          <span className="text-[9px] font-mono font-bold bg-purple-electric/20 text-purple-electric border border-purple-electric/30 px-2 py-0.5 uppercase">
            ADMIN
          </span>
        </div>

        <nav className="sidebar-nav">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="mb-6">
              <div className="text-[10px] font-mono font-bold text-purple-electric uppercase tracking-widest px-4 mb-2.5 opacity-90">
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button 
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="nav-link logout-btn"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main-content">
        <header className="admin-top-bar">
          <div className="welcome-text">
            Selamat datang, <span className="admin-name">Admin</span>
          </div>
          <div className="status-badge">
            <span className="status-dot"></span>
            License Server Online
          </div>
        </header>

        <div className="admin-page-content">
          {children}
        </div>
      </main>
    </div>
  );
}
