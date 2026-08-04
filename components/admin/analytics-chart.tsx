'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Download, 
  Globe, 
  Activity, 
  ArrowUpRight,
  ShieldCheck,
  Zap,
  RefreshCw
} from 'lucide-react';

type TimeRange = '7d' | '30d' | '12m';

interface TrafficPoint {
  label: string;
  visits: number;
  unique: number;
  telemetrySessions: number;
}

export function AdminAnalyticsChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRealDb, setIsRealDb] = useState(true);
  const [dbMetrics, setDbMetrics] = useState<{
    totalSoftwareDownloads: number;
    activeTelemetryDevices: number;
    totalLicenses: number;
    totalPageViews: number;
    totalUniqueVisitors: number;
  } | null>(null);

  const [timeseriesData, setTimeseriesData] = useState<{
    '7d': TrafficPoint[];
    '30d': TrafficPoint[];
    '12m': TrafficPoint[];
  }>({
    '7d': [],
    '30d': [],
    '12m': [],
  });

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/analytics');
      const data = await res.json();
      if (data.success) {
        setIsRealDb(data.isRealDbAnalytics ?? true);
        if (data.dbMetrics) {
          setDbMetrics(data.dbMetrics);
        }
        if (data.timeseries) {
          setTimeseriesData(data.timeseries);
        }
      }
    } catch (err) {
      console.error('Failed to fetch analytics from API:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const data = timeseriesData[timeRange] || [];

  const totalVisits = dbMetrics?.totalPageViews ?? data.reduce((acc, curr) => acc + curr.visits, 0);
  const totalUnique = dbMetrics?.totalUniqueVisitors ?? data.reduce((acc, curr) => acc + curr.unique, 0);

  const calculatedMax = Math.max(...data.map(d => Math.max(d.visits, d.unique, d.telemetrySessions)), 0);
  const maxVal = calculatedMax > 0 ? calculatedMax * 1.15 : 10;

  const width = 800;
  const height = 260;
  const paddingX = 40;
  const paddingY = 20;

  const chartW = width - paddingX * 2;
  const chartH = height - paddingY * 2;

  const pointsVisits = data.map((d, i) => {
    const divisor = data.length > 1 ? data.length - 1 : 1;
    const x = paddingX + (i / divisor) * chartW;
    const y = height - paddingY - (d.visits / maxVal) * chartH;
    return { x, y, data: d };
  });

  const pointsTelemetry = data.map((d, i) => {
    const divisor = data.length > 1 ? data.length - 1 : 1;
    const x = paddingX + (i / divisor) * chartW;
    const y = height - paddingY - (d.telemetrySessions / maxVal) * chartH;
    return { x, y, data: d };
  });

  const pathVisits = pointsVisits.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`),
    ''
  );
  const areaVisits = pointsVisits.length > 0
    ? `${pathVisits} L ${pointsVisits[pointsVisits.length - 1].x},${height - paddingY} L ${pointsVisits[0].x},${height - paddingY} Z`
    : '';

  const pathTelemetry = pointsTelemetry.reduce(
    (acc, p, i) => (i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`),
    ''
  );

  return (
    <div className="bg-surface border border-foreground/10 p-6 md:p-8 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-foreground/10 pb-6">
        <div>
          <div className="flex items-center space-x-3 flex-wrap gap-y-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="font-display text-xl font-bold text-foreground uppercase tracking-tight flex items-center gap-2">
              <Globe size={18} className="text-purple-electric" />
              <span>Analitik Kunjungan & Sesi Live Telemetri</span>
            </h3>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 uppercase flex items-center gap-1">
              <ShieldCheck size={12} />
              REAL DB ANALYTICS (LIVE)
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 font-mono">
            Trafik pengunjung web resmi SynchroTech Race dan aktivitas aplikasi desktop langsung dari database Postgres
          </p>
        </div>

        {/* Timeframe Selector Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={fetchAnalyticsData}
            disabled={loading}
            className="p-2 bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>

          <div className="flex items-center space-x-1 bg-foreground/5 p-1 border border-foreground/10">
            {(['7d', '30d', '12m'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => {
                  setTimeRange(range);
                  setHoveredIdx(null);
                }}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
                  timeRange === range
                    ? 'bg-purple-electric text-white shadow'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range === '7d' ? '7 Hari' : range === '30d' ? '30 Hari' : '12 Bulan'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-foreground/2 border border-foreground/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>TOTAL KUNJUNGAN WEB</span>
            <Eye size={14} className="text-purple-electric" />
          </div>
          <div className="text-2xl font-bold font-mono text-foreground flex items-baseline space-x-2">
            <span>{totalVisits.toLocaleString()}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              Real DB <Zap size={10} />
            </span>
          </div>
          <div className="text-[11px] text-muted-foreground font-mono">
            Total Page Views Terdeteksi
          </div>
        </div>

        <div className="p-4 bg-foreground/2 border border-foreground/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>PENGUNJUNG UNIK</span>
            <Users size={14} className="text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-foreground flex items-baseline space-x-2">
            <span>{totalUnique.toLocaleString()}</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              Real DB <Zap size={10} />
            </span>
          </div>
          <div className="text-[11px] text-muted-foreground font-mono">
            Unique Visitor Devices/Browsers
          </div>
        </div>

        <div className="p-4 bg-foreground/2 border border-foreground/10 space-y-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>TOTAL UNDUHAN SOFTWARE</span>
            <Download size={14} className="text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-foreground flex items-baseline space-x-2">
            <span>{dbMetrics?.totalSoftwareDownloads ?? 0}x</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center">
              Real DB <Zap size={10} />
            </span>
          </div>
          <div className="text-[11px] text-muted-foreground font-mono">
            Unduhan Desktop Suite Installer
          </div>
        </div>
      </div>

      {/* Legend & Hover Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="flex items-center space-x-6 text-xs font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-purple-electric rounded-sm" />
            <span className="text-foreground font-bold">Kunjungan Web</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-3 h-0.5 bg-emerald-400" />
            <span className="text-foreground font-bold">Aktivitas Perangkat Telemetri</span>
          </div>
        </div>
        
        {hoveredIdx !== null && data[hoveredIdx] && (
          <div className="text-xs font-mono text-purple-electric bg-purple-electric/10 border border-purple-electric/30 px-3 py-1">
            ● {data[hoveredIdx].label}: <span className="text-foreground font-bold">{data[hoveredIdx].visits.toLocaleString()} Visits</span> | <span className="text-emerald-400 font-bold">{data[hoveredIdx].telemetrySessions.toLocaleString()} Telemetry Devices</span>
          </div>
        )}
      </div>

      {/* SVG Interactive Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto min-w-[600px] overflow-visible"
        >
          <defs>
            <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-purple-electric)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--color-purple-electric)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = height - paddingY - ratio * chartH;
            return (
              <line
                key={idx}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.08"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Area fill for visits */}
          {areaVisits && <path d={areaVisits} fill="url(#purpleGradient)" />}

          {/* Line for visits */}
          {pathVisits && (
            <path
              d={pathVisits}
              fill="none"
              stroke="var(--color-purple-electric)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Line for telemetry sessions */}
          {pathTelemetry && (
            <path
              d={pathTelemetry}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data Points & Hover Triggers */}
          {pointsVisits.map((pt, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(idx)}>
                {/* Vertical hover guide bar */}
                {isHovered && (
                  <line
                    x1={pt.x}
                    y1={paddingY}
                    x2={pt.x}
                    y2={height - paddingY}
                    stroke="var(--color-purple-electric)"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    strokeOpacity="0.8"
                  />
                )}

                {/* Visit point circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isHovered ? '6' : '4'}
                  fill="var(--color-purple-electric)"
                  stroke="#ffffff"
                  strokeWidth="2"
                  className="transition-all duration-150"
                />

                {/* Telemetry point circle */}
                <circle
                  cx={pointsTelemetry[idx].x}
                  cy={pointsTelemetry[idx].y}
                  r={isHovered ? '5' : '3.5'}
                  fill="#22c55e"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all duration-150"
                />

                {/* X-axis labels */}
                <text
                  x={pt.x}
                  y={height - 2}
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="11"
                  className="font-mono opacity-60 uppercase"
                >
                  {pt.data.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
