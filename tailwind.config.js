/** @type {import('tailwindcss').Config} */
import {
  screens,
  fontFamily as defaultFontFamily,
} from "tailwindcss/defaultTheme";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", ...defaultFontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...defaultFontFamily.mono],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom AI/Brain Cyberpunk Theme Colors
        "neural-purple": "hsl(var(--neural-purple))",
        "cyber-cyan": "hsl(var(--cyber-cyan))",
        "electric-blue": "hsl(var(--electric-blue))",
        "neon-pink": "hsl(var(--neon-pink))",
        "brain-glow": "hsl(var(--brain-glow))",
        "matrix-green": "hsl(var(--matrix-green))",
        "vr-purple": "hsl(var(--vr-purple))",
        "ai-cyan": "hsl(var(--ai-cyan))",
        "neural-pink": "hsl(var(--neural-pink))",
        // Legacy brand colors (keeping for compatibility)
        coral: {
          DEFAULT: "hsl(var(--coral))",
          foreground: "hsl(var(--coral-foreground))",
          subtle: "hsl(var(--coral-subtle))",
          "subtle-foreground": "hsl(var(--coral-subtle-foreground))",
        },
        teal: {
          DEFAULT: "hsl(var(--teal))",
          foreground: "hsl(var(--teal-foreground))",
          subtle: "hsl(var(--teal-subtle))",
          "subtle-foreground": "hsl(var(--teal-subtle-foreground))",
        },
        navy: {
          DEFAULT: "hsl(var(--navy))",
          foreground: "hsl(var(--navy-foreground))",
          subtle: "hsl(var(--navy-subtle))",
          "subtle-foreground": "hsl(var(--navy-subtle-foreground))",
        },
        mustard: {
          DEFAULT: "hsl(var(--mustard))",
          foreground: "hsl(var(--mustard-foreground))",
          subtle: "hsl(var(--mustard-subtle))",
          "subtle-foreground": "hsl(var(--mustard-subtle-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-from-top": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        // AI/Neural theme animations
        "neural-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(var(--primary) / 0.5), 0 0 10px hsl(var(--primary) / 0.3), 0 0 15px hsl(var(--primary) / 0.2)"
          },
          "50%": {
            boxShadow: "0 0 10px hsl(var(--primary) / 0.8), 0 0 20px hsl(var(--primary) / 0.6), 0 0 30px hsl(var(--primary) / 0.4)"
          }
        },
        "brain-glow": {
          "0%, 100%": {
            textShadow: "0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary))"
          },
          "50%": {
            textShadow: "0 0 8px hsl(var(--primary)), 0 0 16px hsl(var(--primary)), 0 0 24px hsl(var(--primary)), 0 0 32px hsl(var(--accent))"
          }
        },
        "data-flow": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" }
        },
        "hologram-flicker": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
          "75%": { opacity: "0.9" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-in-out",
        "fade-out": "fade-out 0.5s ease-in-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        // AI/Neural theme animations
        "neural-pulse": "neural-pulse 2s ease-in-out infinite",
        "brain-glow": "brain-glow 3s ease-in-out infinite",
        "data-flow": "data-flow 2s linear infinite",
        "hologram": "hologram-flicker 4s ease-in-out infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
  ],
};

// This plugin adds each Tailwind color as a global CSS variable
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
