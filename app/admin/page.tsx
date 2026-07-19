import React from 'react';
import Link from 'next/link';
import { prisma } from '../../lib/db';
import { 
  Key, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [
    totalLicenses,
    activeLicenses,
    inactiveLicenses,
    revokedLicenses,
    totalCustomers
  ] = await Promise.all([
    prisma.license.count(),
    prisma.license.count({ where: { status: 'ACTIVE' } }),
    prisma.license.count({ where: { status: 'INACTIVE' } }),
    prisma.license.count({ where: { status: 'REVOKED' } }),
    prisma.customer.count()
  ]);

  // Fetch recent licenses to display in a list
  const recentLicenses = await prisma.license.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    include: { 
      customer: true,
      devices: true
    }
  });

  const stats = [
    { name: 'Total Customers', value: totalCustomers, icon: Users, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
    { name: 'Total Licenses', value: totalLicenses, icon: Key, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.1)' },
    { name: 'Active Licenses', value: activeLicenses, icon: CheckCircle2, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.1)' },
    { name: 'Inactive Licenses', value: inactiveLicenses, icon: AlertTriangle, color: '#eab308', bg: 'rgba(234, 179, 8, 0.1)' },
    { name: 'Revoked Licenses', value: revokedLicenses, icon: XCircle, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
  ];

  return (
    <div className="dash-card">
      <h1 className="dash-title">System Overview</h1>
      <p className="dash-subtitle">Statistik lisensi software desktop-link dan data customer secara real-time</p>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="stat-card" style={{ borderColor: `${stat.color}1e` }}>
              <div className="stat-icon-wrapper" style={{ color: stat.color, backgroundColor: stat.bg }}>
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-label">{stat.name}</span>
                <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid split */}
      <div className="dash-main-split">
        {/* Recent Licenses table */}
        <div className="split-panel">
          <div className="panel-header">
            <h3>Lisensi Terbaru</h3>
            <Link href="/admin/licenses" className="panel-link">
              Kelola Semua <ArrowRight size={14} />
            </Link>
          </div>

          {recentLicenses.length === 0 ? (
            <div className="empty-panel">Belum ada lisensi terdaftar.</div>
          ) : (
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>License Key</th>
                    <th>Customer / Team</th>
                    <th>Devices</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLicenses.map((lic) => (
                    <tr key={lic.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#a855f7' }}>
                        {lic.licenseKey}
                      </td>
                      <td>{lic.customer.teamName}</td>
                      <td>
                        {lic.devices.length} / {lic.maxDevices}
                      </td>
                      <td>
                        <span className={`badge badge-${lic.status.toLowerCase()}`}>
                          {lic.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick info panel */}
        <div className="split-panel flex-col">
          <h3>Panduan Lisensi Desktop</h3>
          <div className="guide-card">
            <div className="guide-step">
              <Clock className="guide-icon" size={16} />
              <div>
                <h4>Validasi Berkala (30 Hari)</h4>
                <p>Setiap lisensi yang aktif akan melakukan validasi ke server setiap 30 hari secara otomatis saat software dijalankan.</p>
              </div>
            </div>

            <div className="guide-step">
              <Users className="guide-icon" size={16} />
              <div>
                <h4>Pembatasan Multi-Device</h4>
                <p>Lisensi akan menolak pendaftaran perangkat baru jika jumlah perangkat aktif melebihi batas maksimum.</p>
              </div>
            </div>

            <div className="guide-step">
              <Key className="guide-icon" size={16} />
              <div>
                <h4>Reset & Suspend</h4>
                <p>Admin dapat menghapus perangkat terhubung (Reset Device) atau menangguhkan lisensi (Revoke) kapan saja dari panel admin.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}
