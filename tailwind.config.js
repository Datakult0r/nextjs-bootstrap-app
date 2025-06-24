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
        DEFAULT: "1.5rem", // 24px
        // // md: '1.5rem', // 40px
        // // lg: '2.5rem', // 40px
        // xl: "2.5rem", // 40px
        "2xl": "2.5rem", // 40px
      },
      screens: {
        // ...screens,
        "2xl": "1400px",
      },
    },
    boxShadow: {
      'blue-glow': '0 0 20px 5px #0066ff',
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-plus-jakarta-sans)", ...defaultFontFamily.sans],
        mono: ["var(--font-jetbrains-mono)", ...defaultFontFamily.mono],
      },
      colors: {
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        inverse: {
          DEFAULT: "hsl(var(--background-inverse))",
          foreground: "hsl(var(--foreground-inverse))",
        },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        spinLoaderLine: {
          '0%': { transform: 'rotate(45deg)' },
          '100%': { transform: 'rotate(405deg)' },
        },
        "bounce-right": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(25%)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        glow: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 8px rgba(246, 198, 36, 0.6))",
          },
          "50%": { filter: "drop-shadow(0 0 16px rgba(246, 198, 36, 0.8))" },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        slide: {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        spring: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        carousel: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "bounce-right": "bounce-right 0.5s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "aurora": "aurora 60s linear infinite",
        "glow": "glow 2s ease-in-out infinite",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        "slide": "slide var(--speed) ease-in-out infinite alternate",
        "spring": "spring 0.8s cubic-bezier(0.38,-0.06,0.27,0.81) infinite",
        "carousel": "carousel 40s linear infinite",
        "marquee": "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        'spin-slow': 'spin 2s linear infinite',
        'spin-loader-line': 'spinLoaderLine 2s linear infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      transitionDuration: {
        300: "300ms",
      },
      translate: {
        full: "100%",
        "-full": "-100%",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.38,-0.06,0.27,0.81)",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    addVariablesForColors,
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
