"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, ShieldCheck, Leaf, AlertTriangle, ArrowRight, Loader2, Info } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function DiseaseDetectionPage() {
  const t = useTranslations('DiseaseDetection');
  const locale = useLocale();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleScan = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/scan/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop: 'Tomato', language: locale }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl min-h-[calc(100vh-80px)]">
      <div className="text-center mb-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full font-semibold text-sm mb-4 border border-red-100">
          <ShieldCheck className="w-4 h-4" /> AI Powered Scanning
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-4">
          Crop Disease Scanner
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload a clear photo of the affected crop leaf. Our deep learning model will analyze it and provide an instant diagnosis and treatment plan.
        </motion.p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Scanner Side */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden group hover:border-[var(--color-primary)] hover:bg-green-50/30 transition-all">
            {preview ? (
              <div className="absolute inset-0">
                <img src={preview} alt="Crop" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="bg-white text-gray-900 px-6 py-3 rounded-xl font-medium cursor-pointer shadow-xl hover:scale-105 transition-transform">
                    Change Photo
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </label>
                </div>
                {loading && (
                  <div className="absolute inset-0 bg-[var(--color-primary)]/20 backdrop-blur-sm flex flex-col items-center justify-center text-white z-10">
                    <Loader2 className="w-12 h-12 animate-spin mb-4" />
                    <div className="font-heading font-bold text-xl drop-shadow-md">Analyzing Image...</div>
                    <div className="absolute top-0 inset-x-0 h-1 bg-[var(--color-primary)] animate-pulse" />
                    {/* Scanning Line Animation */}
                    <motion.div 
                      className="absolute inset-x-0 h-1 bg-white shadow-[0_0_15px_3px_#fff]"
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <UploadCloud className="w-10 h-10 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Upload Leaf Image</h3>
                <p className="text-gray-500 mb-6 max-w-[250px]">JPEG, PNG up to 10MB. Ensure the leaf is well lit.</p>
                <label className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium cursor-pointer hover:bg-gray-800 transition-colors shadow-lg">
                  Browse Files
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </>
            )}
          </div>

          <button
            onClick={handleScan}
            disabled={!selectedFile || loading}
            className="w-full mt-4 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] disabled:opacity-50 disabled:hover:bg-[var(--color-primary)] text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-green-900/10 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Scanning...</> : <><ShieldCheck className="w-5 h-5" /> Analyze Crop</>}
          </button>
        </motion.div>

        {/* Results Side */}
        <div className="h-full">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full bg-gray-50 rounded-3xl border border-gray-100 border-dashed flex flex-col items-center justify-center p-12 text-center min-h-[500px]">
                <Leaf className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-heading font-bold text-gray-400 mb-2">Scan Results Will Appear Here</h3>
                <p className="text-gray-400 text-sm max-w-[250px]">Upload an image and hit analyze to see the AI diagnosis.</p>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 h-full flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Diagnosis Result</div>
                    <h2 className="text-3xl font-heading font-extrabold text-red-600 flex items-center gap-3">
                      <AlertTriangle className="w-8 h-8" /> {result.disease}
                    </h2>
                    <div className="text-gray-500 mt-2 font-medium">Crop: {result.crop}</div>
                  </div>
                  <div className="bg-green-50 border border-green-100 px-4 py-2 rounded-2xl text-center">
                    <div className="text-xs font-semibold text-green-700 uppercase mb-1">Confidence</div>
                    <div className="text-2xl font-black text-green-800">{result.confidence}%</div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-[var(--color-primary)]" /> Actionable Treatment Plan
                  </h3>
                  <div className="space-y-4">
                    {result.treatment?.map((step: string, index: number) => (
                      <div key={index} className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center font-bold text-[var(--color-primary)] flex-shrink-0 shadow-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 pt-1 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <button className="text-[var(--color-primary)] font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Find Recommended Pesticides Nearby <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
