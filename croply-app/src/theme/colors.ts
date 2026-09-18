// ============================================================
// CroPly Design System — Colors
// ============================================================

export const COLORS = {
  // ── Brand Colors ──────────────────────────────────────────
  primary: '#2E7D32',        // Forest Green
  primaryDark: '#1B5E20',    // Deep Forest
  primaryLight: '#4CAF50',   // Leaf Green
  primarySurface: '#E8F5E9', // Light Green Surface

  secondary: '#66BB6A',      // Secondary Green
  secondaryDark: '#388E3C',
  secondaryLight: '#A5D6A7',

  accent: '#FFB300',         // Amber Accent
  accentDark: '#FF8F00',
  accentLight: '#FFE082',
  accentSurface: '#FFF8E1',

  // ── Semantic Colors ───────────────────────────────────────
  success: '#2E7D32',
  successLight: '#E8F5E9',
  warning: '#F57C00',
  warningLight: '#FFF3E0',
  danger: '#C62828',
  dangerLight: '#FFEBEE',
  info: '#1565C0',
  infoLight: '#E3F2FD',

  // ── Risk Colors ───────────────────────────────────────────
  riskHigh: '#C62828',
  riskMedium: '#F57C00',
  riskLow: '#2E7D32',
  riskNone: '#1565C0',

  // ── Neutral ───────────────────────────────────────────────
  background: '#F8FAF8',
  surfaceLight: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceDim: '#F1F5F1',
  cardBackground: '#FFFFFF',

  // ── Text ──────────────────────────────────────────────────
  textPrimary: '#1A2E1A',
  textSecondary: '#4A6741',
  textTertiary: '#7A9478',
  textLight: '#FFFFFF',
  textMuted: '#9E9E9E',
  textDark: '#1A2E1A',
  textGrey: '#6B7280',

  // ── Borders & Lines ───────────────────────────────────────
  border: '#E2EDE2',
  borderLight: '#F0F7F0',
  divider: '#E8F0E8',

  // ── Gradients (as arrays for LinearGradient) ──────────────
  gradientPrimary: ['#2E7D32', '#66BB6A'] as const,
  gradientAccent: ['#FFB300', '#FF8F00'] as const,
  gradientHero: ['#1B5E20', '#2E7D32', '#388E3C'] as const,
  gradientCard: ['#FFFFFF', '#F8FAF8'] as const,
  gradientSky: ['#E8F5E9', '#F1F8E9'] as const,

  // ── Legacy Aliases (backwards compat) ─────────────────────
  primaryGreen: '#2E7D32',
  darkGreen: '#1B5E20',
  lightGreen: '#E8F5E9',
  accentYellow: '#FFB300',
  warningOrange: '#F57C00',
  dangerRed: '#C62828',
};

export const SIZES = {
  // ── Spacing ───────────────────────────────────────────────
  xs: 4,
  sm: 8,
  md: 12,
  padding: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,

  // ── Border Radius ─────────────────────────────────────────
  radiusSm: 8,
  radius: 12,
  radiusMd: 16,
  radiusLg: 20,
  largeRadius: 24,
  radiusXl: 28,
  radiusFull: 999,

  // ── Icon sizes ────────────────────────────────────────────
  iconSm: 16,
  iconMd: 24,
  iconLg: 32,
  iconXl: 48,

  // ── Font sizes ────────────────────────────────────────────
  fontXs: 11,
  fontSm: 13,
  fontMd: 15,
  fontBase: 16,
  fontLg: 18,
  fontXl: 20,
  fontXxl: 24,
  fontDisplay: 28,
  fontHero: 36,
  fontBig: 48,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#2E7D32',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
};

export const TYPOGRAPHY = {
  // ── Font weights ──────────────────────────────────────────
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,

  // ── Line heights ──────────────────────────────────────────
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,

  // ── Common text styles ────────────────────────────────────
  hero: {
    fontSize: SIZES.fontHero,
    fontWeight: '800' as const,
    lineHeight: SIZES.fontHero * 1.2,
    color: COLORS.textPrimary,
  },
  h1: {
    fontSize: SIZES.fontDisplay,
    fontWeight: '700' as const,
    lineHeight: SIZES.fontDisplay * 1.3,
    color: COLORS.textPrimary,
  },
  h2: {
    fontSize: SIZES.fontXxl,
    fontWeight: '700' as const,
    lineHeight: SIZES.fontXxl * 1.3,
    color: COLORS.textPrimary,
  },
  h3: {
    fontSize: SIZES.fontXl,
    fontWeight: '600' as const,
    lineHeight: SIZES.fontXl * 1.4,
    color: COLORS.textPrimary,
  },
  body: {
    fontSize: SIZES.fontBase,
    fontWeight: '400' as const,
    lineHeight: SIZES.fontBase * 1.5,
    color: COLORS.textSecondary,
  },
  caption: {
    fontSize: SIZES.fontSm,
    fontWeight: '400' as const,
    lineHeight: SIZES.fontSm * 1.4,
    color: COLORS.textTertiary,
  },
  label: {
    fontSize: SIZES.fontSm,
    fontWeight: '600' as const,
    lineHeight: SIZES.fontSm * 1.4,
    color: COLORS.textSecondary,
  },
};
