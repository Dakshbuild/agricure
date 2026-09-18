import Link from "next/link";
import { Leaf, Code2, Briefcase, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5">
              <div className="bg-[var(--color-primary)] p-2 rounded-xl">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">AGRI CURE</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              AI Powered Smart Farming Platform. Detect diseases. Save water. Protect crops. Increase profits.
            </p>
            <div className="flex gap-3">
              {[Code2, Briefcase, MessageCircle].map((Icon, i) => (
                <Link key={i} href="#" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-[var(--color-primary)] transition-all">
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-5 text-white">Features</h4>
            <ul className="space-y-3">
              <li><Link href="/disease-detection" className="text-gray-400 hover:text-[var(--color-primary-light)] transition-colors text-sm">AI Disease Scanner</Link></li>
              <li><Link href="/chatbot" className="text-gray-400 hover:text-[var(--color-primary-light)] transition-colors text-sm">AI Chatbot</Link></li>
              <li><Link href="/smart-watering" className="text-gray-400 hover:text-[var(--color-primary-light)] transition-colors text-sm">Smart Irrigation</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-[var(--color-primary-light)] transition-colors text-sm">Farm Dashboard</Link></li>
              <li><Link href="/satellite-monitoring" className="text-gray-400 hover:text-[var(--color-primary-light)] transition-colors text-sm">Satellite Monitoring</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-5 text-white">Platform</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-gray-400 hover:text-[var(--color-primary-light)] transition-colors text-sm">About Project</Link></li>
              <li><Link href="/weather-alerts" className="text-gray-400 hover:text-[var(--color-primary-light)] transition-colors text-sm">Weather Alerts</Link></li>
              <li><Link href="/disease-prediction" className="text-gray-400 hover:text-[var(--color-primary-light)] transition-colors text-sm">Disease Prediction</Link></li>
              <li><Link href="/farm-connect" className="text-gray-400 hover:text-[var(--color-primary-light)] transition-colors text-sm">Farm Marketplace</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[var(--color-primary-light)] transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-5 text-white">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest smart farming updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex h-10 w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
              <button className="inline-flex items-center justify-center rounded-lg bg-[var(--color-primary)] text-white h-10 px-3 hover:bg-[var(--color-primary-dark)] transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AGRI CURE — Smart India Hackathon 2026. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
