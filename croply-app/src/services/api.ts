// ============================================================
// CroPly — API Service
// ============================================================

const BASE_URL = 'http://10.0.2.2:3000/api'; // Android emulator
// const BASE_URL = 'http://localhost:3000/api'; // iOS simulator

// ── Generic Fetch Helper ──────────────────────────────────────────────────────

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: { ...defaultHeaders, ...options.headers },
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(errorBody.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ── Auth API ──────────────────────────────────────────────────────────────────

export const sendOTP = (phone: string) =>
  fetchAPI<{ success: boolean; message: string }>('/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });

export const verifyOTP = (phone: string, otp: string) =>
  fetchAPI<{ success: boolean; token: string; user: any }>('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ phone, otp }),
  });

export const googleLogin = (idToken: string) =>
  fetchAPI<{ success: boolean; token: string; user: any }>('/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  });

export const getCurrentUser = (token: string) =>
  fetchAPI<{ success: boolean; user: any }>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

// ── Dashboard API ─────────────────────────────────────────────────────────────

export const fetchDashboardData = () =>
  fetchAPI<any>('/dashboard');

// ── Scan API ──────────────────────────────────────────────────────────────────

export const analyzeCropImage = (crop: string, imageUri: string) =>
  fetchAPI<any>('/scan/analyze', {
    method: 'POST',
    body: JSON.stringify({ crop, image: imageUri }),
  });

export const fetchScanHistory = (userId: string) =>
  fetchAPI<{ success: boolean; scans: any[] }>(`/scan/history/${userId}`);

// ── Weather API ───────────────────────────────────────────────────────────────

export const fetchWeatherData = (lat?: number, lng?: number) =>
  fetchAPI<any>(`/weather/current?lat=${lat || 30.3165}&lng=${lng || 78.0322}`);

export const fetchWeatherForecast = () =>
  fetchAPI<{ forecast: any[]; alerts: any[] }>('/weather/forecast');

// ── Smart Watering API ────────────────────────────────────────────────────────

export const fetchWateringRecommendation = (params: {
  crop: string;
  growthStage?: string;
  soilMoisture?: number;
}) =>
  fetchAPI<any>('/watering/recommendation', {
    method: 'POST',
    body: JSON.stringify(params),
  });

// ── Crop Health API ───────────────────────────────────────────────────────────

export const fetchCropHealth = (farmId: string = 'farm_001') =>
  fetchAPI<any>(`/crop-health/${farmId}`);

// ── Outbreaks API ─────────────────────────────────────────────────────────────

export const fetchNearbyOutbreaks = (params?: {
  lat?: number;
  lng?: number;
  radius?: number;
  crop?: string;
  disease?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.lat) query.set('lat', String(params.lat));
  if (params?.lng) query.set('lng', String(params.lng));
  if (params?.radius) query.set('radius', String(params.radius));
  if (params?.crop) query.set('crop', params.crop);
  if (params?.disease) query.set('disease', params.disease);
  return fetchAPI<{ outbreaks: any[]; total: number }>(`/outbreaks/nearby?${query.toString()}`);
};

export const reportOutbreak = (data: {
  disease: string;
  crop: string;
  lat: number;
  lng: number;
  description?: string;
}) =>
  fetchAPI<{ success: boolean; message: string; id: string }>('/outbreaks/report', {
    method: 'POST',
    body: JSON.stringify(data),
  });

// ── Farm Connect API ──────────────────────────────────────────────────────────

export const fetchFarmConnect = () =>
  fetchAPI<any>('/farm-connect');

export const fetchSchemes = () =>
  fetchAPI<{ schemes: any[] }>('/marketplace/schemes');

// ── AI Assistant API ──────────────────────────────────────────────────────────

export const sendAssistantMessage = (message: string, language: string = 'en') =>
  fetchAPI<{ success: boolean; message: string; timestamp: string }>('/assistant/chat', {
    method: 'POST',
    body: JSON.stringify({ message, language }),
  });
