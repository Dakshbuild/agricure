"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Layers, CloudRain, ShieldAlert, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

export default function SatelliteMonitoringPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl min-h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-gray-900 mb-2">Satellite Insights</h1>
          <p className="text-gray-600 max-w-2xl">Real-time NDVI indices and crop health monitoring powered by Sentinel-2 data.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-bold text-gray-700">Live Data Active</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 h-[600px]">
        {/* Map Area */}
        <div className="lg:col-span-3 bg-gray-100 rounded-3xl overflow-hidden relative border border-gray-200 shadow-inner">
          <div className="absolute inset-0 bg-blue-50/50 flex flex-col items-center justify-center text-center p-8 z-10">
             <Map className="w-16 h-16 text-blue-300 mb-4" />
             <h3 className="text-xl font-bold text-gray-900 mb-2">Map Integration Placeholder</h3>
             <p className="text-gray-500 max-w-sm">Leaflet/Mapbox integration goes here in production to render NDVI and soil moisture layers over farm bounds.</p>
          </div>
        </div>

        {/* Sidebar Data */}
        <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-600" /> Active Layers
            </h3>
            <div className="space-y-3">
              {['NDVI (Vegetation Index)', 'Soil Moisture', 'Land Surface Temp', 'Cloud Cover'].map((layer, i) => (
                <label key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100">
                  <input type="checkbox" className="w-4 h-4 rounded text-blue-600" defaultChecked={i === 0} />
                  <span className="text-sm font-medium text-gray-700">{layer}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-heading font-bold text-lg mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" /> Detected Anomalies
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">High Stress Zone</div>
                <div className="text-sm text-gray-800 font-medium">South-West Quadrant</div>
                <div className="text-xs text-gray-500 mt-2">NDVI dropped by 15% in the last 5 days. Inspect immediately.</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                <div className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1">Low Moisture</div>
                <div className="text-sm text-gray-800 font-medium">North Edge</div>
                <div className="text-xs text-gray-500 mt-2">Surface moisture below 20%.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
