import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { analyticsTrend, skillDemandData } from '../../data/platformData';

export function PlatformAnalyticsCharts() {
  return (
    <div className="platform-charts">
      <section className="platform-charts__card">
        <h3>Match quality trend</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={analyticsTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,26,62,0.08)" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} domain={[50, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="matchQuality" name="Match quality" stroke="#0084ff" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="responseRate" name="Response rate" stroke="#6c5ce7" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="platform-charts__card">
        <h3>Skill demand</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={skillDemandData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,26,62,0.08)" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
            <YAxis type="category" dataKey="skill" tick={{ fontSize: 12 }} width={60} />
            <Tooltip />
            <Bar dataKey="demand" fill="#0084ff" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
