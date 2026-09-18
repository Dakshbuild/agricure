"use client";

import { motion } from "framer-motion";
import { ArrowRight, Satellite, ShieldCheck, Sprout, Leaf, Plane, Globe, Cloud, Droplets } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = [
    { label: "Farmers Helped", value: "10,000+", icon: <Sprout className="text-primary-light" /> },
    { label: "Diseases Detected", value: "2M+", icon: <ShieldCheck className="text-secondary" /> },
    { label: "Water Saved", value: "500M L", icon: <Droplets className="text-blue-400" /> },
    { label: "Active AI Predictions", value: "99.9%", icon: <Satellite className="text-primary-dark" /> },
  ];

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Animated Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-light-green/40 to-transparent dark:from-primary-dark/10" />
        
        {/* Floating Light Orbs (Fireflies) */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full bg-primary/40 blur-[2px]"
            style={{
              width: Math.random() * 8 + 2 + "px",
              height: Math.random() * 8 + 2 + "px",
            }}
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              x: [
                Math.random() * 100 + "vw",
                Math.random() * 100 + "vw",
                Math.random() * 100 + "vw",
              ],
              y: [
                Math.random() * 100 + "vh",
                Math.random() * 100 + "vh",
                Math.random() * 100 + "vh",
              ],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 15 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* AI Scanning Rings */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
              initial={{ width: "0vw", height: "0vw", opacity: 0.5 }}
              animate={{ width: "150vw", height: "150vw", opacity: 0 }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 3,
              }}
            />
          ))}
        </div>
        
        {/* Floating Leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute opacity-30 dark:opacity-20"
            initial={{ y: -50, x: Math.random() * 1000 - 500, rotate: 0 }}
            animate={{
              y: ["0vh", "100vh"],
              x: ["0vw", `${Math.random() * 20 - 10}vw`],
              rotate: [0, 360],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{ left: `${20 * i}%` }}
          >
            <Leaf className="w-8 h-8 text-primary" />
          </motion.div>
        ))}

        {/* Animated Clouds */}
        <motion.div
          className="absolute top-20 left-0 opacity-20"
          animate={{ x: ["-10vw", "110vw"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <Cloud className="w-24 h-24 text-gray-400" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-0 opacity-15"
          animate={{ x: ["110vw", "-10vw"] }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        >
          <Cloud className="w-32 h-32 text-gray-400" />
        </motion.div>

        {/* Satellite / Drone Simulation */}
        <motion.div
          className="absolute top-1/4 right-1/4 opacity-40"
          animate={{
            y: [0, -20, 0],
            x: [0, 30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="glass p-4 rounded-full border border-primary/20 bg-primary/5">
             <Plane className="w-10 h-10 text-primary-dark" />
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Hero Content */}
        <div className="flex flex-col items-center text-center pt-24 pb-16 lg:pt-32 lg:pb-24">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight text-foreground max-w-4xl leading-tight"
          >
            AI Powered Smart Farming for a <span className="text-gradient">Sustainable Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-foreground/70 max-w-2xl"
          >
            Detect Crop Diseases Early • Monitor Farm Health • Predict Risks • Save Water • Increase Yield
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/disease-detection"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-semibold text-lg overflow-hidden transition-all hover:bg-primary-dark hover:shadow-[0_0_40px_8px_rgba(76,175,80,0.3)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative z-10 flex items-center gap-2">
                Try AI Detection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            <Link
              href="/satellite"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 glass text-foreground rounded-full font-semibold text-lg transition-all hover:bg-black/5 dark:hover:bg-white/5 border border-primary/20 hover:border-primary/50"
            >
              <Globe className="w-5 h-5 text-primary" /> Live Satellite View
            </Link>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.8 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pb-24"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
              className="glass p-8 rounded-2xl flex flex-col items-center text-center transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-t border-l border-white/40 dark:border-white/10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="p-4 rounded-xl bg-background shadow-sm mb-4 group-hover:rotate-12 transition-transform duration-300">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-foreground font-heading">
                {stat.value}
              </h3>
              <p className="text-foreground/60 font-medium mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
        {/* Features Section */}
        <div id="features" className="py-24 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-bold text-foreground"
            >
              Next-Generation <span className="text-primary">Farming Intelligence</span>
            </motion.h2>
            <p className="mt-4 text-foreground/70 max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive tools to monitor, predict, and optimize your agricultural yield.
            </p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass p-8 rounded-3xl hover:bg-primary/5 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground">AI Disease Detection</h3>
              <p className="text-foreground/70">
                Upload crop images and get instant diagnosis with high accuracy. Find organic treatments and recovery timelines.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass p-8 rounded-3xl hover:bg-secondary/5 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
                <Globe className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground">Satellite Monitoring</h3>
              <p className="text-foreground/70">
                Live interactive satellite maps showing NDVI vegetation index, crop health heatmaps, and soil moisture levels.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
              }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="glass p-8 rounded-3xl hover:bg-blue-500/5 transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Droplets className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3 text-foreground">Smart Watering</h3>
              <p className="text-foreground/70">
                AI irrigation module predicting daily water requirements based on weather forecasts and soil conditions.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
