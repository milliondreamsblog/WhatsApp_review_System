import React, { useMemo } from 'react';
import { Review } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, Users, Star, Activity } from 'lucide-react';

interface AnalyticsProps {
  reviews: Review[];
  isDarkMode?: boolean;
}

const COLORS = ['#6366f1', '#10b981', '#f43f5e', '#f59e0b'];

const Analytics: React.FC<AnalyticsProps> = ({ reviews, isDarkMode = false }) => {
  const sentimentData = useMemo(() => {
    const counts = reviews.reduce((acc, review) => {
      const sentiment = review.sentiment || 'neutral';
      acc[sentiment] = (acc[sentiment] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  }, [reviews]);

  const ratingData = useMemo(() => {
    const counts = reviews.reduce((acc, review) => {
      const rating = review.rating || 0;
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Array.from({ length: 5 }, (_, i) => ({
      name: `${i + 1} Stars`,
      count: counts[i + 1] || 0,
    }));
  }, [reviews]);

  // Mock trend data since we don't have enough historical data in the interface
  const trendData = [
    { name: 'Mon', reviews: 4 },
    { name: 'Tue', reviews: 3 },
    { name: 'Wed', reviews: 7 },
    { name: 'Thu', reviews: 5 },
    { name: 'Fri', reviews: 8 },
    { name: 'Sat', reviews: 12 },
    { name: 'Sun', reviews: 9 },
  ];
  
  const averageRating = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + (r.rating || 0), 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const stats = [
    { label: 'Total Reviews', value: reviews.length, icon: Users, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'Average Rating', value: averageRating, icon: Star, color: 'text-amber-500 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    { label: 'Positive Sentiment', value: `${Math.round((reviews.filter(r => r.sentiment === 'positive').length / reviews.length) * 100 || 0)}%`, icon: TrendingUp, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Response Rate', value: '94%', icon: Activity, color: 'text-rose-500 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' },
  ];

  const axisColor = isDarkMode ? '#94a3b8' : '#94a3b8';
  const gridColor = isDarkMode ? '#334155' : '#f1f5f9';
  const tooltipStyle = {
    borderRadius: '12px',
    border: 'none',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    backgroundColor: isDarkMode ? '#1e293b' : '#fff',
    color: isDarkMode ? '#f1f5f9' : '#1e293b'
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Performance Overview</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Key metrics and visual breakdown of feedback</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl p-6 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-white/50 dark:border-slate-700/50 flex items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Distribution */}
        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-white/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Rating Distribution</h3>
            <button  className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 transition-colors">
                <Activity className="w-4 h-4" />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                <Tooltip 
                    cursor={{ fill: isDarkMode ? '#334155' : '#f8fafc' }}
                    contentStyle={tooltipStyle}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 8, 8]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-white/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Sentiment Analysis</h3>
             <button className="p-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-500 transition-colors">
                <Activity className="w-4 h-4" />
            </button>
          </div>
          <div className="h-80 flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Weekly Trend (Full Width) */}
        <div className="lg:col-span-2 bg-white/70 dark:bg-slate-800/50 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-white/50 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Review Volume Trend</h3>
             <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold">Weekly</span>
                <span className="px-3 py-1 rounded-full text-slate-400 dark:text-slate-500 text-xs font-bold cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Monthly</span>
             </div>
          </div>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: axisColor, fontSize: 12 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="reviews" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorReviews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;