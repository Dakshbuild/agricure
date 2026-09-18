"use client";

import { motion } from "framer-motion";
import { Leaf, Code, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[var(--color-primary)]/30"
          >
            <Leaf className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gray-900"
          >
            About CroPly
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Smart India Hackathon Project aiming to revolutionize agriculture through AI.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl space-y-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg mx-auto"
          >
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">Problem Statement</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
              <p className="text-red-900 font-medium m-0">
                "Early Detection and Management of Crop Diseases and Pest Infestations."
              </p>
            </div>
            <p className="text-gray-600 mt-6 leading-relaxed">
              Every year, farmers lose a significant portion of their crop yield due to diseases and pests that go undetected until it is too late. Lack of immediate expert advice and unpredictable weather conditions further exacerbate the problem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Team Details</h3>
              <p className="text-sm text-gray-600">ID: SIH-UPES-2026-T029<br/>Name: AGRICURE</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Problem Statement</h3>
              <p className="text-sm text-gray-600">ID: 26131<br/>Category: Software</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Theme</h3>
              <p className="text-sm text-gray-600">Agriculture, FoodTech & Rural Development</p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-6">Our Solution</h2>
            <p className="text-gray-600 leading-relaxed">
              CroPly acts as a digital companion for farmers. By simply taking a picture of a leaf, our AI instantly diagnoses the problem and suggests treatments. Combined with smart watering schedules based on hyper-local weather data and a community connect feature, CroPly aims to protect crops, save water, and increase overall farming profitability.
            </p>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
