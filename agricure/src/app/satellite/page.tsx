"use client";

import { motion } from "framer-motion";
import { Satellite, Globe, Map, Navigation, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SatelliteView() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-screen flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl"
      >
        <div className="w-24 h-24 bg-secondary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Globe className="w-12 h-12 text-secondary" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 text-foreground">
          Live <span className="text-secondary">Satellite</span> Monitoring
        </h1>
        
        <p className="text-lg text-foreground/70 mb-12">
          Monitor your farm's health from space. We use Sentinel and Google Earth Engine APIs to provide real-time NDVI vegetation indexes and moisture maps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 text-left">
          <div className="glass p-6 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-secondary/10 rounded-xl"><Map className="text-secondary w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-lg mb-1">NDVI Vegetation Index</h3>
              <p className="text-sm text-foreground/60">Analyze crop health through multi-spectral satellite imagery.</p>
            </div>
          </div>
          <div className="glass p-6 rounded-2xl flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-xl"><Navigation className="text-primary w-6 h-6" /></div>
            <div>
              <h3 className="font-bold text-lg mb-1">Drought & Flood Detection</h3>
              <p className="text-sm text-foreground/60">Predict and monitor natural anomalies before they destroy yields.</p>
            </div>
          </div>
        </div>

        <div className="inline-block p-1 rounded-full bg-gradient-to-r from-secondary to-primary">
          <div className="px-8 py-4 bg-white rounded-full flex items-center gap-2 font-bold text-foreground">
            Development Phase 4 (Coming Soon)
          </div>
        </div>
        
        <div className="mt-8">
          <Link href="/" className="text-secondary hover:text-primary-dark font-medium inline-flex items-center gap-2">
            Return Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
