'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Users, 
  Key, 
  LogOut,
  Cpu
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

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Customer Management', href: '/admin/customers', icon: Users },
    { name: 'License Keys', href: '/admin/licenses', icon: Key },
  ];

  return (
    <div className="admin-layout-container">
      {/* Background patterns */}
      <div className="admin-grid-bg"></div>

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <img 
            src="/logotype.png" 
            alt="SynchroTech" 
            style={{ height: '28px', width: 'auto', objectFit: 'contain' }} 
          />
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
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
