"use client";

import { motion } from "framer-motion";
import { Sun, CloudRain, Wind, Thermometer, Droplets, Gauge, AlertTriangle, Bug, Sprout } from "lucide-react";

export default function WeatherDashboard() {
  const weatherStats = [
    { label: "Temperature", value: "28°C", icon: <Thermometer className="w-6 h-6 text-orange-500" /> },
    { label: "Humidity", value: "65%", icon: <Droplets className="w-6 h-6 text-blue-400" /> },
    { label: "Wind Speed", value: "12 km/h", icon: <Wind className="w-6 h-6 text-teal-400" /> },
    { label: "Rain Prob.", value: "20%", icon: <CloudRain className="w-6 h-6 text-indigo-400" /> },
    { label: "UV Index", value: "6.5", icon: <Sun className="w-6 h-6 text-yellow-500" /> },
    { label: "Pressure", value: "1012 hPa", icon: <Gauge className="w-6 h-6 text-purple-400" /> },
  ];

  const aiRisks = [
    { title: "Disease Outbreak", level: "Low", color: "text-green-500", bg: "bg-green-500/10", icon: <AlertTriangle className="w-5 h-5" /> },
    { title: "Pest Risk", level: "Moderate", color: "text-yellow-500", bg: "bg-yellow-500/10", icon: <Bug className="w-5 h-5" /> },
    { title: "Irrigation Need", level: "High", color: "text-red-500", bg: "bg-red-500/10", icon: <Sprout className="w-5 h-5" /> },
  ];

  return (
    <div className="container mx-auto px-6 py-24 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
          AI Weather <span className="text-primary">Forecast</span>
        </h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Real-time weather analytics combined with AI predictions to protect your crops and optimize resources.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Current Weather */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
          className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {weatherStats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-6 rounded-3xl flex flex-col items-center justify-center text-center hover:bg-primary/5 transition-colors cursor-pointer group"
            >
              <div className="mb-4 p-3 bg-background rounded-2xl shadow-sm group-hover:rotate-12 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold font-heading text-foreground mb-1">{stat.value}</h3>
              <p className="text-sm font-medium text-foreground/60">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Column - AI Predictions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-8 rounded-3xl flex flex-col"
        >
          <h2 className="text-2xl font-bold font-heading text-foreground mb-6 flex items-center gap-2">
            <Gauge className="w-6 h-6 text-primary" /> AI Risk Analysis
          </h2>
          
          <motion.div 
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } }
            }}
            className="flex flex-col gap-6 flex-grow"
          >
            {aiRisks.map((risk, idx) => (
              <motion.div 
                key={idx} 
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
                }}
                whileHover={{ scale: 1.02, x: -5 }}
                className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-glass-border cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${risk.bg} ${risk.color}`}>
                    {risk.icon}
                  </div>
                  <span className="font-semibold text-foreground">{risk.title}</span>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${risk.bg} ${risk.color}`}>
                  {risk.level}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="mt-8 p-4 rounded-2xl bg-primary/10 border border-primary/20"
          >
            <p className="text-sm text-primary-dark dark:text-primary-light font-medium">
              <strong className="block mb-1">AI Recommendation:</strong>
              Due to moderate pest risk and high irrigation needs, it is advised to activate smart sprinklers tonight and apply organic neem oil tomorrow morning.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
