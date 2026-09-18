"use client";

import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    { title: "Capture Leaf", desc: "Take a clear photo of the affected crop leaf using the CroPly app." },
    { title: "AI Analysis", desc: "Our TensorFlow-based AI model processes the image in the cloud instantly." },
    { title: "Disease Detection", desc: "The system identifies the disease with a high confidence score." },
    { title: "Treatment", desc: "Receive immediate actionable treatment recommendations." },
    { title: "Weather Prediction", desc: "Check upcoming weather to plan the optimal time for treatment application." },
    { title: "Smart Watering", desc: "Adjust irrigation schedules automatically based on current data." },
    { title: "Healthy Crop", desc: "Monitor recovery and enjoy a healthier, higher-yielding harvest." },
  ];

  return (
    <div className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">How It Works</h1>
          <p className="text-xl text-gray-600">A seamless process designed for ease of use in the field.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-100 md:-translate-x-1/2" />

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative flex items-center mb-12 md:mb-24 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              {/* Dot */}
              <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-white border-4 border-[var(--color-primary)] flex items-center justify-center md:-translate-x-1/2 shadow-lg z-10">
                <span className="font-bold text-[var(--color-primary)]">{i + 1}</span>
              </div>

              {/* Content */}
              <div className={`ml-20 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <div className="glass p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="font-heading font-bold text-2xl mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
