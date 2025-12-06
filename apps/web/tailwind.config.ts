import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Added UI package here so Tailwind scans it
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
}

export default config;
