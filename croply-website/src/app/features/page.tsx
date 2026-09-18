"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CloudRain, MapPin, Users, Phone, Sprout, BarChart, Sun } from "lucide-react";

const features = [
  {
    title: "AI Disease Detection",
    desc: "Scan leaf using camera to detect diseases instantly. Get confidence scores, severity analysis, and treatment guides.",
    icon: ShieldCheck,
    color: "bg-red-50 text-red-600"
  },
  {
    title: "Crop Health Dashboard",
    desc: "Comprehensive view of your entire farm's health, monitoring healthy and diseased plants over time.",
    icon: BarChart,
    color: "bg-blue-50 text-blue-600"
  },
  {
    title: "Weather Prediction",
    desc: "Real-time weather API integration for accurate local forecasting to plan your farming activities.",
    icon: Sun,
    color: "bg-orange-50 text-orange-600"
  },
  {
    title: "Nearby Disease Map",
    desc: "Interactive map showing nearby disease outbreaks to help you take preventive measures early.",
    icon: MapPin,
    color: "bg-purple-50 text-purple-600"
  },
  {
    title: "Farm Connect",
    desc: "Marketplace connecting you with nearby buyers, agriculture shops, and government centers.",
    icon: Users,
    color: "bg-indigo-50 text-indigo-600"
  },
  {
    title: "Smart Watering",
    desc: "AI-suggested irrigation schedules based on soil moisture and rain predictions.",
    icon: CloudRain,
    color: "bg-cyan-50 text-cyan-600"
  },
  {
    title: "Expert Assistance",
    desc: "Connect with agricultural experts for personalized advice and remote assistance.",
    icon: Phone,
    color: "bg-teal-50 text-teal-600"
  },
  {
    title: "Growth Tracking",
    desc: "Track the growth stages of your crops and receive stage-specific recommendations.",
    icon: Sprout,
    color: "bg-green-50 text-green-600"
  }
];

export default function Features() {
  return (
    <div className="min-h-screen pt-20 bg-[var(--color-section)]">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-6"
          >
            Powerful Features for Modern Farming
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Everything you need to manage your crops, save resources, and increase yield in one platform.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feature.color}`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
