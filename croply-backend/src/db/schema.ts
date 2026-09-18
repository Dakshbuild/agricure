import { pgTable, serial, text, timestamp, boolean, integer, jsonb, decimal } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  phone: text("phone").unique().notNull(),
  name: text("name"),
  language: text("language").default("English"),
  location: text("location"),
  profilePic: text("profile_pic"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const farms = pgTable("farms", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name"),
  sizeAcres: decimal("size_acres"),
  latitude: decimal("latitude"),
  longitude: decimal("longitude"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const crops = pgTable("crops", {
  id: serial("id").primaryKey(),
  farmId: integer("farm_id").references(() => farms.id).notNull(),
  name: text("name").notNull(),
  plantedDate: timestamp("planted_date"),
  expectedHarvestDate: timestamp("expected_harvest_date"),
  growthStage: text("growth_stage"), // e.g., Seedling, Vegetative, Flowering
  createdAt: timestamp("created_at").defaultNow(),
});

export const diseaseScans = pgTable("disease_scans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  cropId: integer("crop_id").references(() => crops.id),
  imageUrl: text("image_url").notNull(),
  diseaseName: text("disease_name"),
  confidence: decimal("confidence"),
  severity: text("severity"), // Low, Medium, High
  symptoms: jsonb("symptoms"),
  treatments: jsonb("treatments"),
  latitude: decimal("latitude"),
  longitude: decimal("longitude"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const waterSchedules = pgTable("water_schedules", {
  id: serial("id").primaryKey(),
  cropId: integer("crop_id").references(() => crops.id).notNull(),
  date: timestamp("date").notNull(),
  waterRequiredLiters: decimal("water_required_liters"),
  status: text("status").default("Pending"), // Pending, Completed
});
