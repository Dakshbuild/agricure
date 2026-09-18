"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Camera, Upload, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function DiseaseDetection() {
  return (
    <div className="container mx-auto px-6 py-24 min-h-screen flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-5xl w-full"
      >
        <motion.div 
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
          className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm"
        >
          <ShieldCheck className="w-12 h-12 text-primary" />
        </motion.div>
        
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 text-foreground">
          AI Crop <span className="text-primary">Disease Detection</span>
        </h1>
        
        <p className="text-lg text-foreground/70 mb-16 max-w-2xl mx-auto">
          Upload an image or use your camera to instantly identify crop diseases. Our advanced CNN models detect issues early and provide organic treatment plans.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 text-left items-center">
          {/* Animated Mock Upload Area */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative glass p-8 rounded-3xl border-dashed border-2 border-primary/40 flex flex-col items-center justify-center min-h-[350px] transition-colors cursor-pointer group overflow-hidden bg-white/40"
          >
            {/* AI Scanning Line Animation */}
            <motion.div 
              className="absolute left-0 right-0 h-1 bg-primary/80 shadow-[0_0_15px_4px_rgba(34,197,94,0.5)] z-10"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="flex gap-6 mb-6 relative z-20">
              <motion.div 
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all"
              >
                <Upload className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center transition-all"
              >
                <Camera className="w-8 h-8 text-primary" />
              </motion.div>
            </div>
            <h3 className="font-bold text-2xl mb-2 text-foreground relative z-20">Upload or Take Photo</h3>
            <p className="text-sm text-foreground/60 text-center max-w-xs relative z-20">Supported formats: JPG, PNG, HEIC. Max size 10MB.</p>
          </motion.div>

          {/* AI Features list */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center gap-8 p-6"
          >
            <motion.div variants={itemVariants} className="flex items-start gap-5 glass p-5 rounded-2xl">
              <motion.div whileHover={{ rotate: 15, scale: 1.2 }} className="p-2 bg-primary/10 rounded-xl flex-shrink-0">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <h4 className="font-bold text-xl mb-1">99.8% Accuracy</h4>
                <p className="text-foreground/60">Trained on the PlantVillage dataset with millions of crop images.</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-start gap-5 glass p-5 rounded-2xl">
              <motion.div whileHover={{ rotate: 15, scale: 1.2 }} className="p-2 bg-primary/10 rounded-xl flex-shrink-0">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <h4 className="font-bold text-xl mb-1">Confidence Scoring</h4>
                <p className="text-foreground/60">AI highlights affected plant parts with severity percentages.</p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex items-start gap-5 glass p-5 rounded-2xl">
              <motion.div whileHover={{ rotate: 15, scale: 1.2 }} className="p-2 bg-primary/10 rounded-xl flex-shrink-0">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <h4 className="font-bold text-xl mb-1">Organic Treatments</h4>
                <p className="text-foreground/60">Receive step-by-step organic remedies and recovery timelines.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8"
        >
          <Link href="/" className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-2 group">
            Return Home <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
