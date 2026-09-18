"use client";

import { motion } from "framer-motion";
import { Droplets, CloudRain, Sun, Activity, Sprout, ShieldAlert, Calendar } from "lucide-react";

export default function SmartIrrigationDashboard() {
  return (
    <div className="min-h-screen pt-28 pb-16 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-heading font-extrabold text-foreground tracking-tight"
            >
              Smart <span className="text-primary">Irrigation</span> & Crop Monitoring
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-foreground/70 mt-2 font-medium"
            >
              Real-time AI analysis of your farm's soil, weather, and crop health.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 bg-primary/10 text-primary-dark dark:text-primary-light px-4 py-2 rounded-full text-sm font-bold shadow-sm border border-primary/20"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Live Updates Active
          </motion.div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Status Column */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Irrigation Hero Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden bg-white/40 dark:bg-black/20"
            >
              {/* Decorative background blur */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
                <div>
                  <h2 className="text-sm uppercase tracking-wider font-bold text-foreground/50 mb-1">AI Recommendation</h2>
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                      <CloudRain className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-extrabold text-foreground">Wait for Rain</h3>
                  </div>
                  <p className="text-foreground/70 mt-3 max-w-sm font-medium">
                    Heavy rainfall expected in 8 hours. Irrigation is not recommended at this time to prevent waterlogging.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-2 text-foreground/60 mb-1 text-sm font-bold uppercase tracking-wider">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      Water Savings
                    </div>
                    <div className="text-3xl font-extrabold text-foreground">2,450 <span className="text-lg text-foreground/50 font-medium">Liters</span></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Soil Moisture", value: "42%", icon: Droplets, color: "text-blue-500", bg: "bg-blue-500/10 border-blue-500/20" },
                { label: "Temperature", value: "28°C", icon: Sun, color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/20" },
                { label: "Crop Health", value: "95%", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10 border-emerald-500/20" },
                { label: "Disease Risk", value: "Low", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20" },
              ].map((metric, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="glass p-5 rounded-2xl border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform cursor-pointer bg-white/40 dark:bg-black/20"
                >
                  <div className={`p-3 rounded-xl mb-3 border ${metric.bg} ${metric.color}`}>
                    <metric.icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                  <div className="text-[10px] font-bold text-foreground/50 uppercase tracking-widest">{metric.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Crop Health Progress */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm bg-white/40 dark:bg-black/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-primary" />
                  Crop Growth Stage: <span className="text-primary">Vegetative</span>
                </h3>
                <span className="text-sm font-medium text-foreground/50 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Day 42 of 120</span>
              </div>
              
              <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "35%" }}
                  transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-light to-primary"
                >
                   {/* Shimmer effect inside progress bar */}
                   <div className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                </motion.div>
              </div>
              <div className="flex justify-between mt-3 text-xs font-bold text-foreground/40 uppercase tracking-wider px-1">
                <span>Seedling</span>
                <span className="text-primary">Vegetative</span>
                <span>Flowering</span>
                <span>Harvest</span>
              </div>
            </motion.div>

          </div>

          {/* Sidebar / AI Assistant & Notifications */}
          <div className="space-y-6">
            
            {/* AI Assistant */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-primary-dark to-primary rounded-3xl p-6 text-white shadow-lg shadow-primary/30 relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 p-4 opacity-10 rotate-12">
                <Activity className="w-48 h-48" />
              </div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3 relative z-10">
                <span className="p-2 bg-white/20 rounded-xl backdrop-blur-md border border-white/20"><Activity className="w-5 h-5" /></span>
                AI Crop Assistant
              </h3>
              
              <div className="space-y-3 relative z-10">
                {[
                  "Your wheat crop is exceptionally healthy (95% score).",
                  "Rain is expected within the next 8 hours. Delay irrigation.",
                  "Nitrogen deficiency detected in Zone B. Apply fertilizer.",
                  "High humidity may increase fungal disease risk today."
                ].map((text, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="flex gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 hover:bg-white/20 transition-all cursor-default shadow-sm"
                  >
                    <div className="w-2 h-2 rounded-full bg-white mt-1.5 shrink-0 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                    <p className="text-sm text-white/95 leading-relaxed font-medium">{text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Satellite Mock */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="glass p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm bg-white/40 dark:bg-black/20"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-foreground">Satellite NDVI</h3>
                <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  Live
                </span>
              </div>
              
              <div className="w-full aspect-video rounded-2xl bg-gray-200 dark:bg-gray-800 relative overflow-hidden border border-gray-200 dark:border-gray-700 shadow-inner group cursor-pointer">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-40 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] group-hover:scale-105 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-green-900/10"></div>
                
                {/* Mock NDVI Overlay */}
                <div className="absolute inset-4 rounded-xl bg-emerald-500/40 mix-blend-multiply blur-md flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }} 
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1/3 h-1/2 bg-amber-500/60 rounded-full blur-xl absolute top-4 left-4"
                  ></motion.div>
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="w-1/4 h-1/3 bg-red-500/50 rounded-full blur-xl absolute bottom-4 right-8"
                  ></motion.div>
                </div>
                
                {/* Overlay UI */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  <div className="px-2 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-md text-[10px] font-bold shadow flex items-center gap-1.5 border border-gray-200 dark:border-gray-700">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div> Healthy
                  </div>
                  <div className="px-2 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-md text-[10px] font-bold shadow flex items-center gap-1.5 border border-gray-200 dark:border-gray-700">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div> Stressed
                  </div>
                </div>
              </div>
              <p className="text-[10px] font-bold text-foreground/40 mt-3 text-center uppercase tracking-widest">Simulated Sentinel-2 Multispectral Data</p>
            </motion.div>

          </div>
        </div>
      </div>
      
      {/* Required custom CSS for shimmer in global css or inline */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
  );
}
