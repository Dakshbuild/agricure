import { Router, Request, Response } from 'express';
import { mockData } from '../data/mockData';
import { BhashiniService } from '../services/bhashini';

const router = Router();

// ── Auth ──────────────────────────────────────────────────────────────────────

router.post('/auth/send-otp', (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone number is required' });
  // In production: send OTP via SMS gateway
  res.json({ success: true, message: 'OTP sent successfully', expiresIn: 300 });
});

router.post('/auth/verify-otp', (req: Request, res: Response) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) return res.status(400).json({ error: 'Phone and OTP required' });
  // In production: verify OTP via gateway
  // Mock: any 6-digit OTP works
  if (otp.length !== 6) return res.status(401).json({ error: 'Invalid OTP' });
  res.json({
    success: true,
    token: 'mock_jwt_token_' + Date.now(),
    user: mockData.user,
  });
});

router.post('/auth/google', (req: Request, res: Response) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'Google ID token required' });
  res.json({
    success: true,
    token: 'mock_jwt_token_google_' + Date.now(),
    user: mockData.user,
  });
});

router.get('/auth/me', (req: Request, res: Response) => {
  res.json({ success: true, user: mockData.user });
});

// ── Dashboard ─────────────────────────────────────────────────────────────────

router.get('/dashboard', (req: Request, res: Response) => {
  res.json(mockData.dashboard);
});

// ── Disease Scan ──────────────────────────────────────────────────────────────

router.post('/scan/analyze', async (req: Request, res: Response) => {
  const { crop, language = 'en' } = req.body;
  // Simulate AI processing delay
  setTimeout(async () => {
    let result = { ...mockData.scanResult, crop: crop || 'Tomato' };
    
    if (language !== 'en') {
      // Translate the disease name and treatment steps
      result.disease = await BhashiniService.translate(result.disease, 'en', language);
      result.preventiveMeasures = await Promise.all(
        result.preventiveMeasures.map((step: string) => BhashiniService.translate(step, 'en', language))
      );
    }
    
    res.json(result);
  }, 2000);
});

router.get('/scan/history/:userId', (req: Request, res: Response) => {
  res.json({ success: true, scans: mockData.scanHistory });
});

router.get('/scan/:id', (req: Request, res: Response) => {
  const scan = mockData.scanHistory.find(s => s.id === req.params.id);
  if (!scan) return res.status(404).json({ error: 'Scan not found' });
  res.json({ success: true, scan });
});

// ── Weather ───────────────────────────────────────────────────────────────────

router.get('/weather/current', (req: Request, res: Response) => {
  const { lat, lng } = req.query;
  // In production: call OpenWeather API with lat/lng
  res.json({ success: true, ...mockData.weather });
});

router.get('/weather/forecast', (req: Request, res: Response) => {
  res.json({ success: true, forecast: mockData.weather.forecast, alerts: mockData.weather.alerts });
});

router.get('/weather-risk', (req: Request, res: Response) => {
  res.json(mockData.weather);
});

// ── Smart Watering ────────────────────────────────────────────────────────────

router.post('/watering/recommendation', (req: Request, res: Response) => {
  const { crop, growthStage, soilMoisture } = req.body;
  const result = {
    ...mockData.watering,
    crop: crop || mockData.watering.crop,
    growthStage: growthStage || mockData.watering.growthStage,
    soilMoisture: soilMoisture || mockData.watering.soilMoisture,
  };
  res.json(result);
});

router.get('/watering/schedule/:farmId', (req: Request, res: Response) => {
  res.json({ success: true, schedule: mockData.watering.schedule });
});

// ── Crop Health ───────────────────────────────────────────────────────────────

router.get('/crop-health/:farmId', (req: Request, res: Response) => {
  res.json({ success: true, ...mockData.cropHealth });
});

// ── Nearby Outbreaks ──────────────────────────────────────────────────────────

router.get('/outbreaks/nearby', async (req: Request, res: Response) => {
  const { lat, lng, radius = 20, crop, disease, language = 'en' } = req.query;
  let results = [...mockData.outbreaks];
  if (crop) results = results.filter(o => o.crop.toLowerCase() === (crop as string).toLowerCase());
  if (disease) results = results.filter(o => o.disease.toLowerCase().includes((disease as string).toLowerCase()));
  
  if (language !== 'en') {
    results = await Promise.all(results.map(async (o) => ({
      ...o,
      disease: await BhashiniService.translate(o.disease, 'en', language as string),
      status: await BhashiniService.translate(o.status, 'en', language as string)
    })));
  }
  
  res.json({ success: true, outbreaks: results, total: results.length });
});

router.post('/outbreaks/report', (req: Request, res: Response) => {
  const { disease, crop, lat, lng, description } = req.body;
  if (!disease || !crop || !lat || !lng) {
    return res.status(400).json({ error: 'disease, crop, lat, lng are required' });
  }
  res.json({
    success: true,
    message: 'Outbreak reported successfully. Thank you for helping your community.',
    id: 'ob_' + Date.now(),
  });
});

// ── Farm Connect / Marketplace ────────────────────────────────────────────────

router.get('/farm-connect', async (req: Request, res: Response) => {
  const { language = 'en' } = req.query;
  let data = { ...mockData.connections };
  
  if (language !== 'en') {
    data.buyers = await Promise.all(data.buyers.map(async (b: any) => ({
      ...b,
      description: await BhashiniService.translate(b.description, 'en', language as string)
    })));
  }
  
  res.json(data);
});

router.get('/marketplace/buyers', (req: Request, res: Response) => {
  res.json({ success: true, data: mockData.connections.buyers });
});

router.get('/marketplace/shops', (req: Request, res: Response) => {
  res.json({ success: true, data: mockData.connections.shops });
});

router.get('/marketplace/experts', (req: Request, res: Response) => {
  res.json({ success: true, data: mockData.connections.experts });
});

router.get('/marketplace/government', (req: Request, res: Response) => {
  res.json({ success: true, data: mockData.connections.government });
});

router.get('/marketplace/schemes', async (req: Request, res: Response) => {
  const { language = 'en' } = req.query;
  let schemes = [...mockData.schemes];
  
  if (language !== 'en') {
    schemes = await Promise.all(schemes.map(async (s: any) => ({
      ...s,
      name: await BhashiniService.translate(s.name, 'en', language as string),
      benefit: await BhashiniService.translate(s.benefit, 'en', language as string)
    })));
  }
  
  res.json({ success: true, schemes });
});

// ── AI Assistant ──────────────────────────────────────────────────────────────

router.post('/assistant/chat', async (req: Request, res: Response) => {
  const { message, language = 'en' } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  // 1. Translate user message to English if it's in a regional language
  const translatedInput = await BhashiniService.translate(message, language, 'en');

  // In production: call Gemini/OpenAI API with English text
  const lowerMsg = translatedInput.toLowerCase();
  const found = mockData.assistantResponses.find(r => lowerMsg.includes(r.query));

  let responseText = found
    ? found.response
    : `I understand you're asking about "${translatedInput}". As your AI farming assistant, I recommend consulting with your local agriculture expert or visiting the CroPly Disease Database for detailed information. You can also use the AI Scanner to identify any visible symptoms on your crops.`;

  // 2. Translate response back to user's native language
  const localizedResponse = await BhashiniService.translate(responseText, 'en', language);

  // Simulate AI processing time
  setTimeout(() => {
    res.json({
      success: true,
      message: localizedResponse,
      language,
      timestamp: new Date().toISOString(),
    });
  }, 1000);
});

export default router;
