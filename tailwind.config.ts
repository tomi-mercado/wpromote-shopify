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
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
