import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import type { ChartsData, TimeSeriesPoint } from '../types'

interface Props {
  data: ChartsData
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

function shortDate(d: string): string {
  return d.slice(5) // MM-DD
}

const COLORS = {
  purple: '#6C63FF',
  violet: '#A855F7',
  green: '#34d399',
  pink: '#f472b6',
  blue: '#60a5fa',
  orange: '#fb923c',
}

function MiniChart({
  data,
  color,
  label,
}: {
  data: TimeSeriesPoint[]
  color: string
  label: string
}) {
  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        <span>{label}</span>
        <span className="chart-no-data">No data</span>
      </div>
    )
  }

  const thinned = data.filter((_, i) => i % Math.ceil(data.length / 20) === 0 || i === data.length - 1)

  return (
    <div className="chart-card">
      <div className="chart-label">{label}</div>
      <ResponsiveContainer width="100%" height={100}>
        <LineChart data={thinned} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="date"
            tickFormatter={shortDate}
            tick={{ fontSize: 9, fill: 'rgba(238,238,244,0.35)' }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={fmt}
            tick={{ fontSize: 9, fill: 'rgba(238,238,244,0.35)' }}
            tickLine={false}
            axisLine={false}
            width={36}
          />
          <Tooltip
            formatter={(v) => [fmt(Number(v ?? 0)), label]}
            labelFormatter={(l) => l}
            contentStyle={{
              background: '#0d0d1a',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8,
              fontSize: 11,
              color: '#eeeef4',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export function ArtistCharts({ data }: Props) {
  return (
    <div id="artist-charts">
      <div className="charts-section">
        <div className="charts-section-title">📡 Streaming Overview</div>
        <div className="charts-grid">
          <MiniChart data={data.streaming.apple_listeners} color={COLORS.pink} label="Apple Music Listeners" />
          <MiniChart data={data.streaming.deezer_followers} color={COLORS.blue} label="Deezer Followers" />
          <MiniChart data={data.streaming.youtube_subscribers} color={COLORS.orange} label="YouTube Subscribers" />
        </div>
      </div>

      <div className="charts-section">
        <div className="charts-section-title">🎧 Spotify</div>
        <div className="charts-grid">
          <MiniChart data={data.spotify.followers} color={COLORS.green} label="Followers" />
          <MiniChart data={data.spotify.listeners} color={COLORS.purple} label="Monthly Listeners" />
        </div>
      </div>

      <div className="charts-section">
        <div className="charts-section-title">📱 Socials</div>
        <div className="charts-grid">
          <MiniChart data={data.socials.instagram_followers} color={COLORS.violet} label="Instagram Followers" />
          <MiniChart data={data.socials.tiktok_followers} color={COLORS.pink} label="TikTok Followers" />
          <MiniChart data={data.socials.youtube_views} color={COLORS.orange} label="YouTube Views" />
        </div>
      </div>
    </div>
  )
}
