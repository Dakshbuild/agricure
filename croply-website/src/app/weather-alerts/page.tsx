"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";
import { Cloud, Thermometer, Droplets, Wind, Sun, AlertTriangle, Eye, Compass } from "lucide-react";

const FORECAST = [
  { day: "Today", high: 32, low: 24, rain: 10, humidity: 68, icon: "☀️", condition: "Sunny" },
  { day: "Tue", high: 29, low: 22, rain: 55, humidity: 82, icon: "🌧️", condition: "Rainy" },
  { day: "Wed", high: 27, low: 21, rain: 70, humidity: 88, icon: "⛈️", condition: "Stormy" },
  { day: "Thu", high: 31, low: 23, rain: 20, humidity: 72, icon: "⛅", condition: "Cloudy" },
  { day: "Fri", high: 33, low: 25, rain: 5, humidity: 60, icon: "☀️", condition: "Clear" },
  { day: "Sat", high: 34, low: 26, rain: 8, humidity: 58, icon: "☀️", condition: "Sunny" },
  { day: "Sun", high: 30, low: 23, rain: 35, humidity: 75, icon: "🌦️", condition: "Partly Cloudy" },
];

const hourlyTemp = [
  { time: "6 AM", temp: 24 }, { time: "9 AM", temp: 27 }, { time: "12 PM", temp: 32 },
  { time: "3 PM", temp: 34 }, { time: "6 PM", temp: 31 }, { time: "9 PM", temp: 28 },
];

const ALERTS = [
  { type: "Storm Warning", msg: "Heavy rainfall expected Wednesday. Risk of waterlogging.", level: "high", icon: AlertTriangle },
  { type: "Disease Risk", msg: "High humidity (88%) on Wed increases Late Blight risk significantly.", level: "high", icon: AlertTriangle },
  { type: "Temperature Drop", msg: "Temperature may dip to 18°C Sunday night. Protect sensitive crops.", level: "medium", icon: AlertTriangle },
];

export default function WeatherAlertsPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const sel = FORECAST[selectedDay];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50/30 pt-20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Cloud className="w-4 h-4" /> Weather Intelligence
          </span>
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
            Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-[var(--color-primary)]">Weather</span> Alerts
          </h1>
          <p className="text-xl text-gray-600">Real-time weather data with disease risk correlations for your farm.</p>
        </motion.div>

        {/* Hero Weather Card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-3xl p-8 md:p-12 text-white mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 text-[12rem] opacity-10 leading-none">☁️</div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-blue-200 font-medium mb-1">📍 Your Farm Location</p>
                <div className="text-8xl font-extrabold leading-none mb-4">{sel.high}°</div>
                <div className="text-2xl font-semibold text-blue-100 mb-2">{sel.condition}</div>
                <p className="text-blue-300 text-sm">High {sel.high}° · Low {sel.low}° · Rain {sel.rain}%</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Humidity", value: `${sel.humidity}%`, icon: Droplets },
                  { label: "Rain Chance", value: `${sel.rain}%`, icon: Cloud },
                  { label: "Wind", value: "14 km/h", icon: Wind },
                  { label: "UV Index", value: "7 (High)", icon: Sun },
                ].map(({ label, value, icon: Icon }, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-4">
                    <Icon className="w-5 h-5 text-blue-200 mb-2" />
                    <div className="text-xl font-bold">{value}</div>
                    <div className="text-blue-300 text-xs font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 7-Day Forecast */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-heading font-bold text-xl mb-6">7-Day Forecast</h3>
              <div className="grid grid-cols-7 gap-2">
                {FORECAST.map((day, i) => (
                  <button key={i} onClick={() => setSelectedDay(i)}
                    className={`flex flex-col items-center py-4 px-2 rounded-2xl transition-all cursor-pointer ${
                      selectedDay === i ? "bg-blue-600 text-white shadow-md scale-105" : "hover:bg-gray-50 text-gray-700"
                    }`}>
                    <span className={`text-xs font-bold mb-2 ${selectedDay === i ? "text-blue-200" : "text-gray-500"}`}>{day.day}</span>
                    <span className="text-2xl mb-2">{day.icon}</span>
                    <span className="text-sm font-bold">{day.high}°</span>
                    <span className={`text-xs ${selectedDay === i ? "text-blue-300" : "text-gray-400"}`}>{day.low}°</span>
                    <span className={`text-xs font-medium mt-1 ${day.rain > 50 ? "text-blue-500" : selectedDay === i ? "text-blue-200" : "text-gray-400"}`}>{day.rain}%</span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Hourly Temperature Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-heading font-bold text-xl mb-6">Today's Temperature Curve</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={hourlyTemp} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="time" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} formatter={(v: any) => [`${v}°C`, "Temp"]} />
                  <Area type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2.5} fill="url(#tempGrad)" dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-heading font-bold text-xl mb-5 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" /> Farm Alerts
              </h3>
              <div className="space-y-4">
                {ALERTS.map((alert, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}
                    className={`p-4 rounded-2xl border ${alert.level === "high" ? "bg-red-50 border-red-200" : "bg-yellow-50 border-yellow-200"}`}>
                    <div className={`flex items-center gap-2 font-semibold text-sm mb-1 ${alert.level === "high" ? "text-red-800" : "text-yellow-800"}`}>
                      <alert.icon className="w-4 h-4" /> {alert.type}
                    </div>
                    <p className={`text-xs leading-relaxed ${alert.level === "high" ? "text-red-700" : "text-yellow-700"}`}>{alert.msg}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sun Times */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl border border-orange-100 p-6">
              <h3 className="font-heading font-bold text-lg mb-5">Sun Schedule</h3>
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <Sun className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">6:02 AM</div>
                  <div className="text-xs text-gray-500">Sunrise</div>
                </div>
                <div className="flex-1 mx-4 h-1 bg-gradient-to-r from-orange-300 via-yellow-300 to-orange-300 rounded-full" />
                <div className="text-center">
                  <Sun className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">7:14 PM</div>
                  <div className="text-xs text-gray-500">Sunset</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
