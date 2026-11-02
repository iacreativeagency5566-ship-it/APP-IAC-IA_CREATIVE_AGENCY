import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { bg: "#0A0E14", surface: "#111827", neon: "#00E5A0", violet: "#7C5CFF", ink: "#E6EDF3", mute: "#8B949E", line: "#1f2937" },
    fontFamily: { display: ["var(--font-display)", "sans-serif"], body: ["var(--font-body)", "sans-serif"], mono: ["var(--font-mono)", "monospace"] },
    keyframes: {
      "marquee-x": { to: { transform: "translateX(calc(-100% - var(--gap)))" } },
      pop: { "0%": { transform: "scale(.9)" }, "60%": { transform: "scale(1.08)" }, "100%": { transform: "scale(1)" } },
      "marquee-y": { to: { transform: "translateY(calc(-100% - var(--gap)))" } },
    },
    animation: { pop: "pop 500ms ease-out 1", "marquee-x": "marquee-x 40s linear infinite", "marquee-y": "marquee-y 40s linear infinite" },
  } },
} satisfies Config;
