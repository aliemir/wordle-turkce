const palette = {
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1e293b",
  slate900: "#0f172a",
  teal400: "#2dd4bf",
  teal700: "#0f766e",
  violet400: "#a78bfa",
  violet700: "#6d28d9",
  green700: "#15803d",
  yellow600: "#ca8a04",
};

export const dark = {
  backgroundColorPrimary: palette.slate900,
  backgroundColorSecondary: palette.slate800,
  backgroundColorTetriary: palette.slate700,
  green: palette.green700,
  yellow: palette.yellow600,
  bodyPrimary: palette.slate200,
  bodySecondary: palette.slate400,
  bodyTetriary: palette.slate100,
};

const theme = {
  colors: dark,
  fontFamilies: {
    Regular: "R",
    RegularItalic: "RegularItalic",
    Bold: "Bold",
    BoldItalic: "BoldItalic",
  },
  spacing: {
    s: 6,
    m: 12,
    l: 18,
    xs: 24,
  },
  borderRadii: {
    none: 0,
    s: 6,
    m: 12,
    l: 18,
    full: 999,
  },
};

export default theme;

export type Theme = typeof theme;
