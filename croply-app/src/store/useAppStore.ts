import { create } from 'zustand';

// ── Types ─────────────────────────────────────────────────────────────────────

interface User {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  avatar?: string | null;
  language: string;
  farmCount?: number;
}

interface ScanResult {
  id: string;
  disease: string;
  confidence: number;
  severity: string;
  crop: string;
  date?: string;
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;

  // Language
  language: string;

  // Scan History
  recentScans: ScanResult[];

  // UI State
  isDarkMode: boolean;
  hasSeenOnboarding: boolean;
  hasSelectedLanguage: boolean;

  // Actions
  setUser: (user: User, token: string) => void;
  logout: () => void;
  setLanguage: (lang: string) => void;
  addScan: (scan: ScanResult) => void;
  setOnboardingSeen: () => void;
  setLanguageSelected: () => void;
  toggleDarkMode: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useAppStore = create<AppState>((set) => ({
  // Initial State
  isAuthenticated: false,
  user: null,
  token: null,
  language: 'en',
  recentScans: [],
  isDarkMode: false,
  hasSeenOnboarding: false,
  hasSelectedLanguage: false,

  // Actions
  setUser: (user, token) =>
    set({ isAuthenticated: true, user, token }),

  logout: () =>
    set({ isAuthenticated: false, user: null, token: null, recentScans: [] }),

  setLanguage: (lang) =>
    set({ language: lang }),

  addScan: (scan) =>
    set((state) => ({
      recentScans: [scan, ...state.recentScans].slice(0, 20),
    })),

  setOnboardingSeen: () =>
    set({ hasSeenOnboarding: true }),

  setLanguageSelected: () =>
    set({ hasSelectedLanguage: true }),

  toggleDarkMode: () =>
    set((state) => ({ isDarkMode: !state.isDarkMode })),

  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));
