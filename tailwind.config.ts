import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "var(--background-primary)",
          secondary: "var(--background-secondary)",
        },
        foreground: {
          primary: "var(--foreground-primary)",
          secondary: "var(--foreground-secondary)",
          lighter: "var(--foreground-lighter)",
        },
        primary: "var(--primary)",
        button: {
          primary: {
            background: "var(--button-background-primary)",
            hover: "var(--button-background-primary-hover)",
            active: "var(--button-background-primary-active)",
            foreground: "var(--button-foreground-primary)",
          },
        },
        card: {
          border: "var(--card-border)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        grow: "grow 1s linear forwards",
        leafGrow: "leafGrow 1s linear forwards",
        topLeafRight: "topLeafRight 1s linear forwards",
        topLeafLeft: "topLeafLeft 1s linear forwards",
      },
      keyframes: {
        grow: {
          "0%": { bottom: "-40%", width: "1%" },
          "100%": { bottom: "0%", width: "2%" },
        },
        leafGrow: {
          "0%": { width: "0%", height: "0%" },
          "100%": { width: "700%", height: "10%" },
        },
        topLeafRight: {
          "0%": { top: "5%", width: "0%", height: "0%", left: "10%" },
          "100%": { width: "700%", height: "10%", top: "-17%", left: "-120%" },
        },
        topLeafLeft: {
          "0%": { top: "0%", width: "0%", height: "0%" },
          "100%": { width: "700%", height: "10%", top: "-9%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
