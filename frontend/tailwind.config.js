/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple Tahoe-inspired palette
        glass: {
          dark: {
            bg: 'rgba(255, 255, 255, 0.06)',
            border: 'rgba(255, 255, 255, 0.06)',
          },
          light: {
            bg: 'rgba(255, 255, 255, 0.65)',
            border: 'rgba(0, 0, 0, 0.06)',
          },
        },
        base: {
          dark: '#0b0f14',
          light: '#ffffff',
        },
      },
      backdropBlur: {
        glass: '10px',
        'glass-light': '8px',
      },
      boxShadow: {
        glass: '0 6px 24px rgba(0, 0, 0, 0.12)',
        'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.16)',
      },
      borderRadius: {
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}

