'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Users,
  Key,
  Package,
  LogOut,
  Download,
  Menu,
  X
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

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

      {/* Mobile drawer backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar-open' : ''}`}>
        <div className="sidebar-brand flex items-center justify-between">
          <img
            src="/logogram.png"
            alt="SynchroTech"
            style={{ height: '26px', width: 'auto', objectFit: 'contain' }}
          />
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold bg-purple-electric/20 text-purple-electric border border-purple-electric/30 px-2 py-0.5 uppercase">
              ADMIN
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-muted-foreground hover:text-foreground p-1"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden text-foreground p-1 -ml-1"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
            <div className="welcome-text hidden sm:block">
              Selamat datang, <span className="admin-name">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="status-badge hidden sm:flex">
              <span className="status-dot"></span>
              License Server Online
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="admin-page-content">
          {children}
        </div>
      </main>
    </div>
  );
}
