"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import { Sprout, AlertCircle, Activity, TrendingUp, Bell, Scan, Droplets, Eye, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const weeklyHealth = [
  { day: "Mon", healthy: 88, diseased: 12 }, { day: "Tue", healthy: 85, diseased: 15 },
  { day: "Wed", healthy: 82, diseased: 18 }, { day: "Thu", healthy: 79, diseased: 21 },
  { day: "Fri", healthy: 84, diseased: 16 }, { day: "Sat", healthy: 87, diseased: 13 },
  { day: "Sun", healthy: 91, diseased: 9 },
];

const waterUsage = [
  { day: "Mon", liters: 420 }, { day: "Tue", liters: 380 }, { day: "Wed", liters: 510 },
  { day: "Thu", liters: 340 }, { day: "Fri", liters: 460 }, { day: "Sat", liters: 390 }, { day: "Sun", liters: 440 },
];

const cropDistrib = [
  { name: "Tomato", value: 35, color: "#ef4444" }, { name: "Wheat", value: 28, color: "#f97316" },
  { name: "Rice", value: 22, color: "#22c55e" }, { name: "Corn", value: 15, color: "#eab308" },
];

const recentAlerts = [
  { title: "Late Blight Detected", desc: "Sector A — 2 plants affected", time: "1h ago", critical: true },
  { title: "Irrigation Complete", desc: "Sector B watered — 340L used", time: "4h ago", critical: false },
  { title: "Rain Alert", desc: "Heavy rain expected tomorrow", time: "6h ago", critical: true },
  { title: "AI Scan Done", desc: "Corn field — 98.2% healthy", time: "1d ago", critical: false },
];

const STATS = [
  { title: "Healthy Plants", value: "8,432", trend: "+5.2%", up: true, icon: Sprout, bg: "bg-green-50", text: "text-green-600" },
  { title: "Diseased Plants", value: "142", trend: "-12%", up: false, icon: AlertCircle, bg: "bg-red-50", text: "text-red-600" },
  { title: "AI Scans Today", value: "47", trend: "+8", up: true, icon: Scan, bg: "bg-blue-50", text: "text-blue-600" },
  { title: "Overall Health", value: "91%", trend: "+2.1%", up: true, icon: Activity, bg: "bg-purple-50", text: "text-purple-600" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-900">Farm Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back! Your farm overview for today.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl gap-2" asChild>
              <Link href="/disease-detection"><Scan className="w-4 h-4" /> New Scan</Link>
            </Button>
            <Button className="rounded-xl gap-2 shadow-lg shadow-[var(--color-primary)]/20">
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {STATS.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}><stat.icon className={`w-5 h-5 ${stat.text}`} /></div>
                <span className={`text-sm font-semibold px-2 py-1 rounded-lg ${stat.up ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="text-2xl font-extrabold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Crop Health Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-heading font-bold text-xl">Weekly Health Trend</h3>
                <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">Last 7 days</span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={weeklyHealth} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="diseaseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }} />
                  <Area type="monotone" dataKey="healthy" stroke="#22c55e" strokeWidth={2} fill="url(#healthGrad)" name="Healthy %" />
                  <Area type="monotone" dataKey="diseased" stroke="#ef4444" strokeWidth={2} fill="url(#diseaseGrad)" name="Diseased %" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Water Usage + Crop Distribution */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" /> Water Usage (L)
                </h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={waterUsage} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: "10px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
                    <Bar dataKey="liters" fill="#3b82f6" radius={[6, 6, 0, 0]} name="Liters" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-heading font-bold text-lg mb-5 flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-[var(--color-primary)]" /> Crop Distribution
                </h3>
                <div className="flex items-center gap-4">
                  <PieChart width={100} height={100}>
                    <Pie data={cropDistrib} cx={50} cy={50} innerRadius={28} outerRadius={45} dataKey="value" strokeWidth={0}>
                      {cropDistrib.map((c, i) => <Cell key={i} fill={c.color} />)}
                    </Pie>
                  </PieChart>
                  <div className="space-y-2 flex-1">
                    {cropDistrib.map((c, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />{c.name}</span>
                        <span className="font-semibold text-gray-700">{c.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] rounded-3xl p-6 text-white">
              <h3 className="font-heading font-bold text-xl mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { label: "Scan Leaf", href: "/disease-detection", icon: Scan },
                  { label: "Check Prediction", href: "/disease-prediction", icon: Eye },
                  { label: "View Weather", href: "/weather-alerts", icon: Activity },
                  { label: "Satellite Map", href: "/satellite-monitoring", icon: MapPin },
                ].map((action, i) => (
                  <Link key={i} href={action.href}
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors group">
                    <div className="flex items-center gap-3">
                      <action.icon className="w-4 h-4" /> <span className="text-sm font-medium">{action.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Alerts */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-heading font-bold text-xl mb-5 flex items-center justify-between">
                Recent Alerts <Bell className="w-5 h-5 text-gray-400" />
              </h3>
              <div className="space-y-3">
                {recentAlerts.map((alert, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${alert.critical ? "bg-red-500" : "bg-green-500"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900">{alert.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate">{alert.desc}</div>
                      <div className="text-xs text-gray-400 mt-1">{alert.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 rounded-xl text-sm">View All Activity</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
