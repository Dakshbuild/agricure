import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json({ limit: "10mb" }));

// ─── Health ──────────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "agri-cure-backend", version: "1.0.0" });
});

// ─── Users ───────────────────────────────────────────────────────────────────
app.post("/api/users", async (req, res) => {
  try {
    const { email, name, role } = req.body;
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name, role: role || "FARMER" },
    });
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id }, include: { scans: true } });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// ─── Scans (Disease Detection) ───────────────────────────────────────────────
app.post("/api/scans", async (req, res) => {
  try {
    const { userId, imageUrl, disease, confidence, severity, treatment } = req.body;
    const scan = await prisma.scan.create({
      data: { userId, imageUrl, disease, confidence, severity, treatment },
    });
    res.json({ success: true, scan });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/scans", async (req, res) => {
  const { userId } = req.query;
  const scans = await prisma.scan.findMany({
    where: userId ? { userId: String(userId) } : undefined,
    orderBy: { createdAt: "desc" },
    take: 20,
  });
  res.json(scans);
});

// ─── AI Disease Analysis (mocked / plug-in your model here) ──────────────────
app.post("/api/analyze-disease", async (req, res) => {
  const { cropType } = req.body;

  // Simulated AI result — replace with real model call (Plant.id / TF.js)
  const results: Record<string, { disease: string; confidence: number; severity: string; treatment: string }> = {
    tomato: {
      disease: "Late Blight (Phytophthora infestans)",
      confidence: 96.8,
      severity: "High",
      treatment: "Apply Mancozeb 75% WP @ 2.5g/L. Remove infected leaves immediately. Improve air circulation.",
    },
    wheat: {
      disease: "Yellow Rust (Puccinia striiformis)",
      confidence: 91.4,
      severity: "Moderate",
      treatment: "Spray Propiconazole 25% EC @ 1 mL/L. Ensure proper spacing between plants.",
    },
    rice: {
      disease: "Blast Disease (Magnaporthe oryzae)",
      confidence: 88.7,
      severity: "Critical",
      treatment: "Apply Tricyclazole 75% WP @ 0.6g/L. Drain field for 3-4 days.",
    },
    corn: {
      disease: "Northern Corn Leaf Blight",
      confidence: 84.2,
      severity: "Moderate",
      treatment: "Apply Azoxystrobin fungicide. Rotate crops next season.",
    },
  };

  const key = cropType?.toLowerCase() || "tomato";
  const result = results[key] || results.tomato;

  res.json({
    success: true,
    analysis: {
      ...result,
      affectedArea: `${(Math.random() * 30 + 5).toFixed(1)}%`,
      expectedRecovery: "7-14 days with treatment",
      fertilizer: "NPK 17:17:17 @ 25g per plant",
      pesticide: "Cypermethrin 10% EC as preventive measure",
      preventiveMeasures: [
        "Ensure proper drainage in fields",
        "Avoid overhead irrigation",
        "Use certified disease-free seeds",
        "Maintain crop rotation schedule",
      ],
    },
  });
});

// ─── Disease Risk Prediction (ML-simulated) ───────────────────────────────────
app.post("/api/predict-risk", async (req, res) => {
  const { temperature, humidity, rainfall, cropType } = req.body;

  // Simple heuristic risk model — plug your real ML model here
  let riskScore = 0;
  if (humidity > 80) riskScore += 35;
  if (temperature > 28 && temperature < 35) riskScore += 25;
  if (rainfall > 50) riskScore += 20;
  riskScore += Math.random() * 20;
  riskScore = Math.min(Math.round(riskScore), 100);

  const riskLevel = riskScore > 70 ? "High" : riskScore > 40 ? "Moderate" : "Low";

  res.json({
    success: true,
    prediction: {
      riskScore,
      riskLevel,
      cropType: cropType || "General",
      alertMessage:
        riskLevel === "High"
          ? "Immediate action required. Apply preventive fungicide."
          : riskLevel === "Moderate"
          ? "Monitor closely. Prepare fungicide spray."
          : "Conditions are safe. Continue normal operations.",
      nextCheckIn: "48 hours",
      weeklyForecast: Array.from({ length: 7 }, (_, i) => ({
        day: i + 1,
        risk: Math.min(Math.round(riskScore + (Math.random() - 0.5) * 15), 100),
      })),
    },
  });
});

// ─── Irrigation Recommendation ────────────────────────────────────────────────
app.post("/api/irrigation", async (req, res) => {
  const { cropType, temperature, humidity, growthStage } = req.body;

  const baseWater: Record<string, number> = { rice: 80, wheat: 45, tomato: 60, corn: 55, default: 50 };
  const base = baseWater[cropType?.toLowerCase()] || baseWater.default;
  let waterLiters = base;
  if (temperature > 35) waterLiters *= 1.3;
  if (humidity < 40) waterLiters *= 1.2;

  res.json({
    success: true,
    recommendation: {
      waterAmount: `${Math.round(waterLiters)}L per 100 sqm`,
      bestTime: temperature > 32 ? "Early morning (5:30–7:00 AM)" : "Evening (5:00–7:00 PM)",
      frequency: "Every 2 days",
      method: "Drip irrigation preferred",
      waterSavings: "Estimated 35% savings vs conventional",
      weeklySchedule: ["Mon", "Wed", "Fri", "Sun"].map((day) => ({
        day,
        amount: `${Math.round(waterLiters * 0.95 + Math.random() * 5)}L`,
        time: "06:00 AM",
      })),
    },
  });
});

// ─── Marketplace ──────────────────────────────────────────────────────────────
app.get("/api/marketplace", async (req, res) => {
  const items = await prisma.marketplaceItem.findMany({ orderBy: { createdAt: "desc" }, take: 20 });
  res.json(items);
});

app.post("/api/marketplace", async (req, res) => {
  try {
    const item = await prisma.marketplaceItem.create({ data: req.body });
    res.json({ success: true, item });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─── Chatbot (Simulated — plug OpenAI key here) ───────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  const msg = message?.toLowerCase() || "";

  let reply = "I'm your AGRI CURE AI assistant. Ask me about crop diseases, fertilizers, weather or farming tips!";

  if (msg.includes("disease") || msg.includes("blight") || msg.includes("rust"))
    reply = "Common crop diseases include Late Blight, Yellow Rust, and Blast Disease. Use our AI Scanner for instant diagnosis! Apply the recommended fungicide early and ensure good field drainage.";
  else if (msg.includes("water") || msg.includes("irrigat"))
    reply = "Smart irrigation saves up to 40% water! Water your crops early morning or evening. Use drip irrigation for best results. Monitor soil moisture regularly.";
  else if (msg.includes("fertiliz"))
    reply = "Use NPK (17:17:17) as a balanced fertilizer. Apply urea for nitrogen boost. For organic farming, try compost or vermicompost at 2 tonnes/acre.";
  else if (msg.includes("weather") || msg.includes("rain"))
    reply = "Check the Weather Alerts page for real-time forecasts. High humidity (>80%) increases disease risk. Avoid spraying pesticides before rain.";
  else if (msg.includes("government") || msg.includes("scheme") || msg.includes("pm"))
    reply = "Key government schemes: PM-KISAN (₹6000/year), PMFBY (crop insurance), KCC (Kisan Credit Card), PMKSY (irrigation subsidy). Visit your nearest agriculture office for registration.";
  else if (msg.includes("organic"))
    reply = "For organic farming: use neem oil as biopesticide, vermicompost as fertilizer, crop rotation to manage pests, and intercropping to increase biodiversity.";
  else if (msg.includes("soil"))
    reply = "Test your soil pH (ideal: 6.0–7.5). Add lime to increase pH, sulfur to decrease it. Use organic matter to improve soil structure and water retention.";

  res.json({ success: true, reply, timestamp: new Date().toISOString() });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌿 AGRI CURE Backend running at http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health\n`);
});
