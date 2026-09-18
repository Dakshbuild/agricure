"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend,
} from "recharts";
import { AlertTriangle, Brain, Thermometer, Droplets, CloudRain, Wind, Sprout, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const weekForecast = [
  { day: "Mon", risk: 45 }, { day: "Tue", risk: 62 }, { day: "Wed", risk: 78 },
  { day: "Thu", risk: 85 }, { day: "Fri", risk: 71 }, { day: "Sat", risk: 55 }, { day: "Sun", risk: 40 },
];

const radialData = [
  { name: "Blast Risk", value: 78, fill: "#ef4444" },
  { name: "Rust Risk", value: 55, fill: "#f97316" },
  { name: "Blight Risk", value: 33, fill: "#eab308" },
];

const CROPS = ["Tomato", "Wheat", "Rice", "Corn", "Cotton"];

export default function DiseasePredictionPage() {
  const [form, setForm] = useState({ temperature: "32", humidity: "75", rainfall: "45", windSpeed: "12", cropType: "Tomato", growthStage: "Flowering" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    const risk = Math.min(Math.round(
      (parseInt(form.humidity) > 80 ? 35 : parseInt(form.humidity) > 60 ? 20 : 10) +
      (parseInt(form.rainfall) > 50 ? 25 : parseInt(form.rainfall) > 20 ? 15 : 5) +
      (parseInt(form.temperature) > 28 && parseInt(form.temperature) < 35 ? 20 : 10) +
      Math.random() * 15
    ), 95);
    setResult({
      riskScore: risk,
      riskLevel: risk > 70 ? "High" : risk > 45 ? "Moderate" : "Low",
      alertMessage: risk > 70 ? "High risk detected. Apply preventive fungicide within 48 hours." : risk > 45 ? "Moderate risk. Monitor closely and prepare spray solution." : "Low risk. Continue normal operations.",
      spraySchedule: ["Apply preventive fungicide on Day 1", "Second spray after 7 days", "Monitor leaf wetness daily"],
    });
    setLoading(false);
  };

  const riskColor = result?.riskLevel === "High" ? "#ef4444" : result?.riskLevel === "Moderate" ? "#f97316" : "#22c55e";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30 pt-20">
      <div className="container mx-auto px-4 py-12 max-w-7xl">

        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-purple-50 border border-purple-200 text-purple-700 text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Brain className="w-4 h-4" /> ML Prediction Engine
            </span>
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
              Disease Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-[var(--color-primary)]">Prediction</span>
            </h1>
            <p className="text-xl text-gray-600">Input farm conditions and get AI-powered early warning alerts before diseases strike.</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h3 className="font-heading font-bold text-xl mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[var(--color-primary)]" /> Farm Conditions
            </h3>

            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2 flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-[var(--color-primary)]" /> Crop Type
                </label>
                <select value={form.cropType} onChange={(e) => setForm({ ...form, cropType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] bg-white text-sm">
                  {CROPS.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              {[
                { key: "temperature", label: "Temperature (°C)", icon: Thermometer, min: 0, max: 50 },
                { key: "humidity", label: "Humidity (%)", icon: Droplets, min: 0, max: 100 },
                { key: "rainfall", label: "Rainfall (mm)", icon: CloudRain, min: 0, max: 200 },
                { key: "windSpeed", label: "Wind Speed (km/h)", icon: Wind, min: 0, max: 100 },
              ].map(({ key, label, icon: Icon, min, max }) => (
                <div key={key}>
                  <label className="text-sm font-medium text-gray-700 block mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Icon className="w-4 h-4 text-gray-500" /> {label}</span>
                    <span className="text-[var(--color-primary)] font-bold">{form[key as keyof typeof form]}</span>
                  </label>
                  <input type="range" min={min} max={max} value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full accent-[var(--color-primary)]" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1"><span>{min}</span><span>{max}</span></div>
                </div>
              ))}

              <Button onClick={handlePredict} disabled={loading} className="w-full rounded-xl h-12 gap-2 shadow-lg shadow-[var(--color-primary)]/20">
                <Brain className="w-5 h-5" />
                {loading ? "Predicting..." : "Predict Disease Risk"}
              </Button>
            </div>
          </motion.div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-6">
            {result ? (
              <>
                {/* Risk Score Card */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="relative w-36 h-36 shrink-0">
                      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="12" />
                        <motion.circle cx="50" cy="50" r="40" fill="none" stroke={riskColor} strokeWidth="12"
                          strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 40}`}
                          initial={{ strokeDashoffset: 2 * Math.PI * 40 }}
                          animate={{ strokeDashoffset: 2 * Math.PI * 40 * (1 - result.riskScore / 100) }}
                          transition={{ duration: 1.5, ease: "easeOut" }} />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-extrabold" style={{ color: riskColor }}>{result.riskScore}%</span>
                        <span className="text-xs text-gray-500 font-medium">Risk Score</span>
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-3 ${
                        result.riskLevel === "High" ? "bg-red-100 text-red-700" : result.riskLevel === "Moderate" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                      }`}>
                        <AlertTriangle className="w-4 h-4" /> {result.riskLevel} Risk
                      </div>
                      <h3 className="font-heading font-bold text-2xl text-gray-900 mb-3">{form.cropType} Disease Prediction</h3>
                      <p className="text-gray-600 leading-relaxed">{result.alertMessage}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Spray Schedule */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                  <h4 className="font-heading font-semibold text-lg mb-4">Recommended Spray Schedule</h4>
                  <ul className="space-y-3">
                    {result.spraySchedule.map((s: string, i: number) => (
                      <li key={i} className="flex items-center gap-4 p-4 bg-green-50 border border-green-100 rounded-xl text-sm font-medium text-green-800">
                        <span className="w-6 h-6 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center h-[300px] flex flex-col items-center justify-center gap-4">
                <Brain className="w-16 h-16 text-gray-200" />
                <h3 className="font-heading font-semibold text-xl text-gray-400">Prediction Results</h3>
                <p className="text-gray-400 text-sm">Fill in the farm conditions and click "Predict Disease Risk"</p>
              </div>
            )}

            {/* Weekly Risk Forecast Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
              <h3 className="font-heading font-bold text-xl mb-6">7-Day Risk Forecast</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={weekForecast} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="riskGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
                    formatter={(v: any) => [`${v}%`, "Disease Risk"]} />
                  <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={2.5} fill="url(#riskGradient)" dot={{ r: 4, fill: "#ef4444", strokeWidth: 0 }} />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
