"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, MapPin, Search, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function FarmConnectPage() {
  const [buyers, setBuyers] = useState<any[]>([]);
  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/marketplace/buyers')
      .then(res => res.json())
      .then(d => setBuyers(d.data));
      
    fetch('http://localhost:3001/api/marketplace/shops')
      .then(res => res.json())
      .then(d => setShops(d.data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl min-h-[calc(100vh-80px)]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-gray-900 mb-4">Farm Connect</h1>
          <p className="text-lg text-gray-600 max-w-2xl">Directly connect with local buyers, seed shops, and agricultural experts.</p>
        </div>
        <div className="w-full md:w-auto relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search buyers or shops..." 
            className="w-full md:w-80 bg-white border border-gray-200 rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
          />
        </div>
      </div>

      <div className="space-y-16">
        {/* Direct Buyers */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><ShoppingBag className="w-5 h-5"/></div>
            <h2 className="text-2xl font-heading font-bold text-gray-900">Direct Buyers Nearby</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyers.map((buyer, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{buyer.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" /> {buyer.distance} km away
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-sm font-semibold">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> {buyer.rating}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 mb-4">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Looking for</div>
                  <div className="font-medium text-gray-900">{buyer.lookingFor}</div>
                </div>
                <button className="w-full bg-white border-2 border-gray-100 hover:border-[var(--color-primary)] text-gray-700 hover:text-[var(--color-primary)] font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Buyer
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Local Shops */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><MapPin className="w-5 h-5"/></div>
            <h2 className="text-2xl font-heading font-bold text-gray-900">Verified Input Shops</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shops.map((shop, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{shop.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" /> {shop.distance} km away
                    </div>
                  </div>
                  {shop.verified && (
                    <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                      Verified
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {shop.inventory.map((item: string, j: number) => (
                    <span key={j} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{item}</span>
                  ))}
                </div>
                <button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white font-bold py-3 rounded-xl transition-colors">
                  View Inventory
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
