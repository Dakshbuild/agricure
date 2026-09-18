"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, Calendar, Clock, ArrowRight, Settings } from 'lucide-react';

export default function SmartWateringPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/watering/recommendation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crop: 'Tomato', growthStage: 'Flowering', soilMoisture: 35 })
    })
      .then(res => res.json())
      .then(d => setData(d));
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center"><Droplets className="animate-pulse w-8 h-8 text-cyan-500" /></div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl min-h-[calc(100vh-80px)]">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-cyan-100 text-cyan-600 rounded-2xl">
          <Droplets className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-900">Smart Irrigation</h1>
          <p className="text-gray-600">AI-optimized watering schedules to save water and boost yield.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">🌱</div>
          <div>
            <div className="text-sm text-gray-500">Selected Crop</div>
            <div className="font-bold text-gray-900 text-lg">{data.crop}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">📈</div>
          <div>
            <div className="text-sm text-gray-500">Growth Stage</div>
            <div className="font-bold text-gray-900 text-lg">{data.growthStage}</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">💦</div>
          <div>
            <div className="text-sm text-gray-500">Current Soil Moisture</div>
            <div className="font-bold text-cyan-600 text-xl">{data.soilMoisture}%</div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden mb-10">
        <div className="absolute -right-10 -top-10 opacity-10">
          <Droplets className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <div className="text-cyan-100 font-medium uppercase tracking-widest text-sm mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4" /> Recommended Action
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">{data.recommendedAction}</h2>
          <div className="text-xl text-cyan-50 mb-8 max-w-2xl">
            Based on current moisture levels, weather forecast, and the {data.growthStage.toLowerCase()} stage of your {data.crop}.
          </div>
          
          <div className="flex flex-wrap gap-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-fit">
            <div>
              <div className="text-cyan-200 text-sm mb-1">Volume Needed</div>
              <div className="text-2xl font-bold">{data.amountLiters} Liters</div>
            </div>
            <div className="w-px bg-white/20" />
            <div>
              <div className="text-cyan-200 text-sm mb-1">Duration</div>
              <div className="text-2xl font-bold flex items-center gap-2"><Clock className="w-5 h-5"/> {data.durationMinutes} mins</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all flex items-center gap-2">
          Sync with IoT Pump <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
