"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Store, ArrowRight, Package, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Marketplace() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-screen flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl"
      >
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Store className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 text-foreground">
          Farm Connect <span className="text-primary">Marketplace</span>
        </h1>
        
        <p className="text-lg text-foreground/70 mb-12">
          A seamless peer-to-peer marketplace connecting farmers directly with buyers. Buy seeds, sell crops, and rent equipment without middlemen.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
          <div className="glass p-6 rounded-2xl">
            <Package className="w-8 h-8 text-secondary mb-4" />
            <h3 className="font-bold text-lg mb-2">Direct Trading</h3>
            <p className="text-sm text-foreground/60">No middlemen. Trade directly with buyers for better margins.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <TrendingUp className="w-8 h-8 text-primary mb-4" />
            <h3 className="font-bold text-lg mb-2">Live Prices</h3>
            <p className="text-sm text-foreground/60">Real-time market prices updated dynamically using AI.</p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <ShoppingCart className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Secure Payments</h3>
            <p className="text-sm text-foreground/60">Safe, escrow-backed transactions ensuring trust on both sides.</p>
          </div>
        </div>

        <div className="inline-block p-1 rounded-full bg-gradient-to-r from-primary to-secondary">
          <div className="px-8 py-4 bg-white rounded-full flex items-center gap-2 font-bold text-foreground">
            Development Phase 4 (Coming Soon)
          </div>
        </div>
        
        <div className="mt-8">
          <Link href="/" className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-2">
            Return Home <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
