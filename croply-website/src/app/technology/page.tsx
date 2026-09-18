"use client";

import { motion } from "framer-motion";
import { Server, Database, Smartphone, Cloud, Brain, Lock } from "lucide-react";

export default function Technology() {
  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Built on Modern Architecture</h1>
          <p className="text-xl text-gray-600">
            CroPly leverages the latest in web, mobile, and AI technologies to deliver a fast, reliable, and scalable platform.
          </p>
        </div>

        {/* Architecture Diagram */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            
            {/* Frontend */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-3xl relative z-10 flex flex-col items-center text-center border-t-4 border-blue-500"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                <Smartphone className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Frontend</h3>
              <ul className="text-gray-600 space-y-2 text-sm w-full">
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">React Native (App)</li>
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">Next.js (Web Dashboard)</li>
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">Tailwind CSS</li>
              </ul>
            </motion.div>

            {/* Backend & AI */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass p-8 rounded-3xl relative z-10 flex flex-col items-center text-center border-t-4 border-green-500"
            >
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Core & AI</h3>
              <ul className="text-gray-600 space-y-2 text-sm w-full">
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm flex items-center justify-center gap-2">
                  <Server className="w-4 h-4" /> Node.js & Express
                </li>
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">TensorFlow & OpenCV</li>
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">Gemini AI Engine</li>
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">Weather API Integration</li>
              </ul>
            </motion.div>

            {/* Database & Cloud */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass p-8 rounded-3xl relative z-10 flex flex-col items-center text-center border-t-4 border-purple-500"
            >
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-4">
                <Database className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-2">Data Layer</h3>
              <ul className="text-gray-600 space-y-2 text-sm w-full">
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">Supabase (PostgreSQL)</li>
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" /> Supabase Auth
                </li>
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm flex items-center justify-center gap-2">
                  <Cloud className="w-4 h-4" /> Cloud Storage
                </li>
                <li className="bg-white p-2 rounded-lg border border-gray-100 shadow-sm">Redis Cache</li>
              </ul>
            </motion.div>

            {/* Animated connections for desktop */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block z-0" style={{ top: '40%' }}>
              <motion.path
                d="M 250 0 C 350 0, 350 0, 450 0"
                fill="none"
                stroke="#2E7D32"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.path
                d="M 600 0 C 700 0, 700 0, 800 0"
                fill="none"
                stroke="#2E7D32"
                strokeWidth="2"
                strokeDasharray="5,5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
