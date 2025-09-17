import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Add if using app directory
  ],
  theme: {
    extend: {
      // Only extend what you actually use
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // Critical for performance - remove unused styles
  corePlugins: {
    // Disable unused features to reduce bundle size
    preflight: true,
    container: true,
    accessibility: false,
    backdropOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
    textOpacity: false,
  },
  // Purge unused styles aggressively
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
} satisfies Config;