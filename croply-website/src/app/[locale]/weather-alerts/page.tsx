"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Wind, Droplets, ThermometerSun, ShieldAlert, CloudLightning } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function WeatherAlertsPage() {
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    fetch('http://localhost:3001/api/weather-risk')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(d => setData(d))
      .catch(err => {
        console.error('Weather fetch error:', err);
        // Fallback dummy data if backend is unreachable
        setData({
          location: 'Pune, Maharashtra',
          current: { temp: 28, condition: 'Partly Cloudy', humidity: 76, windSpeed: 12 },
          diseaseRisk: 'High',
          forecast: [
            { day: 'Today', temp: 28, rainProbability: 62 },
            { day: 'Tue', temp: 26, rainProbability: 80 },
            { day: 'Wed', temp: 24, rainProbability: 45 },
            { day: 'Thu', temp: 27, rainProbability: 20 },
            { day: 'Fri', temp: 30, rainProbability: 10 },
            { day: 'Sat', temp: 31, rainProbability: 5 },
            { day: 'Sun', temp: 32, rainProbability: 5 }
          ]
        });
      });
  }, []);

  if (!data) return <div className="h-screen flex items-center justify-center"><CloudRain className="animate-pulse w-8 h-8 text-blue-500" /></div>;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[calc(100vh-80px)]">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-gray-900 mb-4">Weather Intelligence</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Hyper-local weather forecasts combined with AI disease risk analysis for your farm.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <CloudLightning className="w-48 h-48" />
          </div>
          <div>
            <div className="text-blue-100 font-medium mb-1">Current Weather in</div>
            <h2 className="text-3xl font-heading font-bold mb-8">Pune, Maharashtra</h2>
            
            <div className="flex items-end gap-6">
              <div className="text-7xl font-black">{data.temp || data.current?.temp}°C</div>
              <div className="text-2xl font-medium text-blue-100 mb-2 capitalize">{data.condition || data.current?.condition}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-12 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <div>
              <div className="text-blue-200 text-sm mb-1 flex items-center gap-2"><Droplets className="w-4 h-4"/> Humidity</div>
              <div className="font-bold text-xl">{data.humidity || data.current?.humidity}%</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm mb-1 flex items-center gap-2"><Wind className="w-4 h-4"/> Wind</div>
              <div className="font-bold text-xl">{data.wind || data.current?.windSpeed} km/h</div>
            </div>
            <div>
              <div className="text-blue-200 text-sm mb-1 flex items-center gap-2"><ThermometerSun className="w-4 h-4"/> UV Index</div>
              <div className="font-bold text-xl">High</div>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex flex-col justify-center">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-heading font-bold text-red-900 mb-2">Disease Risk: {data.risk || data.diseaseRisk}</h3>
          <p className="text-red-700 leading-relaxed mb-6">{data.riskMessage || data.alert || 'High humidity combined with current temperatures increases the risk of Blight in tomato crops by 45%.'}</p>
          <button className="bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-red-700 transition-colors">
            View Preventive Measures
          </button>
        </div>
      </div>
      
      <h3 className="text-2xl font-heading font-bold mb-6 mt-12">7-Day Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {data.forecast.map((f: any, i: number) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center hover:border-blue-200 hover:shadow-md transition-all">
            <div className="text-gray-500 font-medium mb-4">{f.day}</div>
            <CloudRain className="w-10 h-10 mx-auto text-blue-500 mb-4" />
            <div className="font-bold text-xl text-gray-900 mb-1">{f.temp}°C</div>
            <div className="text-xs font-semibold text-blue-600 flex items-center justify-center gap-1">
              <Droplets className="w-3 h-3" /> {f.rain || f.rainProbability}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
