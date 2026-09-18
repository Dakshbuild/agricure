"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CloudRain, ShieldCheck, Sprout, ChevronDown, Bot, Map, Droplets, TrendingUp, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { HeroParticles } from "@/components/HeroParticles";

const STATS = [
  { value: "96.8%", label: "Detection Accuracy" },
  { value: "50K+", label: "Diseases Trained" },
  { value: "40%", label: "Water Saved" },
  { value: "12+", label: "AI Features" },
];

const FEATURES = [
  { title: "AI Disease Scanner", desc: "Instant leaf disease detection with 96%+ accuracy using deep learning.", icon: ShieldCheck, href: "/disease-detection", color: "bg-red-50 text-red-600" },
  { title: "AI Chatbot", desc: "Ask anything about farming — diseases, fertilizers, government schemes.", icon: Bot, href: "/chatbot", color: "bg-purple-50 text-purple-600" },
  { title: "Satellite Monitoring", desc: "Real-time NDVI and crop health maps from Sentinel-2 satellites.", icon: Map, href: "/satellite-monitoring", color: "bg-blue-50 text-blue-600" },
  { title: "Disease Prediction", desc: "ML-powered risk prediction before diseases strike your farm.", icon: TrendingUp, href: "/disease-prediction", color: "bg-orange-50 text-orange-600" },
  { title: "Smart Irrigation", desc: "AI-optimized watering schedules saving up to 40% water.", icon: Droplets, href: "/smart-watering", color: "bg-cyan-50 text-cyan-600" },
  { title: "Weather Intelligence", desc: "7-day forecasts with farm-specific disease risk alerts.", icon: CloudRain, href: "/weather-alerts", color: "bg-sky-50 text-sky-600" },
];

const TESTIMONIALS = [
  { name: "Ravi Sharma", role: "Wheat Farmer, Punjab", text: "AGRI CURE detected Yellow Rust in my wheat field 3 days before it spread. Saved 80% of my crop!", rating: 5 },
  { name: "Priya Patel", role: "Tomato Grower, Gujarat", text: "The smart irrigation saved me ₹15,000 in water bills this season. Amazing AI technology!", rating: 5 },
  { name: "Mohan Das", role: "Rice Farmer, Andhra Pradesh", text: "The chatbot answered all my questions about government schemes in Hindi. Very helpful!", rating: 5 },
];

export default function Home() {
  const t = useTranslations("HomePage");
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <div className="relative overflow-hidden">
      {/* ─── Hero ─────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        <HeroParticles />
        {/* Animated BG */}
        <motion.div style={{ y: blobY }} className="absolute inset-0 -z-10">
          <div className="absolute top-[-5%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[var(--color-primary-light)]/15 blur-[120px]" />
          <div className="absolute bottom-[-5%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[var(--color-primary)]/10 blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-50/50 blur-3xl" />
        </motion.div>

        {/* Grid pattern */}
        <div className="absolute inset-0 -z-10 opacity-[0.02]" style={{
          backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex flex-col gap-6">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-2 rounded-full w-fit">
                <Zap className="w-4 h-4" /> {t('heroTag', 'Smart India Hackathon 2026')}
              </motion.div>

              <h1 className="font-heading text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
                <span className="text-gray-900">{t('heroTitle1', 'AI Powered')}</span>{" "}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-green-300">
                  {t('heroTitle2', 'Smart Farming')}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-[520px] leading-relaxed">
                {t('heroDesc', 'Detect diseases before they spread. Chat with AI experts. Monitor satellite health. Save water. Protect crops. Increase profits.')}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="rounded-full h-14 px-8 shadow-xl shadow-[var(--color-primary)]/25 text-base gap-2" asChild>
                  <Link href="/disease-detection"><Sprout className="w-5 h-5" /> Try AI Scanner</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base gap-2" asChild>
                  <Link href="/chatbot"><Bot className="w-5 h-5" /> Chat with AI</Link>
                </Button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 pt-6 border-t border-gray-100 mt-2">
                {STATS.map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                    <div className="font-heading font-extrabold text-2xl text-gray-900">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Phone Mockup + Floating Cards */}
            <div className="relative hidden lg:flex items-center justify-center h-[650px]">
              {/* Main Phone */}
              <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
                className="relative z-10 w-[300px] h-[620px] rounded-[3rem] border-[10px] border-gray-900 bg-white shadow-[0_40px_80px_rgba(0,0,0,0.25)] overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-7 bg-gray-900 z-20 flex justify-center items-center">
                  <div className="w-20 h-4 bg-gray-800 rounded-full" />
                </div>
                {/* Screen */}
                <div className="h-full bg-gradient-to-br from-green-50 to-white pt-10 p-4 flex flex-col gap-3">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">AI Detection</div>
                        <div className="text-sm font-bold text-red-600">Late Blight Detected</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <motion.div className="h-full bg-red-500 rounded-full" initial={{ width: 0 }} animate={{ width: "96.8%" }} transition={{ delay: 1, duration: 1 }} />
                    </div>
                    <div className="text-xs text-right text-gray-500 mt-1">96.8% confidence</div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex-1">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Crop Health Score</div>
                    <div className="flex items-end gap-1 h-24 justify-between">
                      {[65, 72, 60, 85, 78, 91, 88].map((h, i) => (
                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                          transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                          className={`flex-1 rounded-t-sm ${i === 6 ? "bg-[var(--color-primary)]" : "bg-green-100"}`} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              {[
                { Icon: CloudRain, title: "Rain Alert", sub: "Expected in 3h", delay: 0, y: "10%", x: "-20%", color: "bg-blue-50 text-blue-600" },
                { Icon: ShieldCheck, title: "AI Scan Done", sub: "0 diseases found", delay: 0.5, y: "70%", x: "75%", color: "bg-green-50 text-green-600" },
                { Icon: TrendingUp, title: "Yield Forecast", sub: "+18% this season", delay: 1, y: "30%", x: "78%", color: "bg-purple-50 text-purple-600" },
              ].map(({ Icon, title, sub, delay, y, x, color }, i) => (
                <motion.div key={i}
                  style={{ top: y, left: x }}
                  animate={{ y: [0, i % 2 === 0 ? -12 : 12, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut", delay }}
                  className="absolute glass rounded-2xl shadow-xl px-4 py-3 flex items-center gap-3 z-20 min-w-[160px]">
                  <div className={`p-2 rounded-xl ${color}`}><Icon className="w-5 h-5" /></div>
                  <div><div className="text-xs text-gray-500 font-medium">{title}</div><div className="text-sm font-bold text-gray-900">{sub}</div></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400">
          <span className="text-xs font-medium tracking-widest uppercase mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>

      {/* ─── Tech Banner ──────────────────────────────────────────────────── */}
      <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Powered By</p>
        <div className="flex gap-12 md:gap-20 justify-center flex-wrap opacity-50 grayscale">
          {["React Native", "Expo", "Express.js", "Supabase", "Drizzle ORM", "Redis", "TensorFlow", "Leaflet"].map((t) => (
            <span key={t} className="font-heading font-bold text-lg md:text-2xl text-gray-700">{t}</span>
          ))}
        </div>
      </section>

      {/* ─── Features Grid ───────────────────────────────────────────────── */}
      <section className="py-28 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-4xl md:text-5xl font-heading font-extrabold mb-4">
              Everything a Farmer Needs
            </motion.h2>
            <p className="text-xl text-gray-600">12 AI-powered features designed for the modern Indian farmer.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={f.href} className="block bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all p-8 group h-full">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${f.color} group-hover:scale-110 transition-transform`}>
                    <f.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-3 text-gray-900">{f.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                  <div className="flex items-center gap-2 mt-5 text-[var(--color-primary)] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-extrabold mb-4">Trusted by Farmers</h2>
            <p className="text-xl text-gray-600">Real stories from farmers using AGRI CURE.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-heading font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-primary)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white blur-2xl" />
        </div>
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-extrabold mb-6">
            Start Protecting Your Crops Today
          </motion.h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Join thousands of farmers using AI to detect diseases early, save water, and maximize yield.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="rounded-full h-14 px-10 bg-white text-[var(--color-primary-dark)] hover:bg-gray-100 shadow-2xl font-bold gap-2" asChild>
              <Link href="/disease-detection"><Sprout className="w-5 h-5" /> Try Free AI Scanner</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-14 px-10 border-white text-white hover:bg-white/10" asChild>
              <Link href="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
