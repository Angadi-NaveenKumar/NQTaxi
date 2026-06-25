/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#F5C518',
        'primary-fg': '#000000',
        'bg-primary': '#0D0D0D',
        'bg-secondary': '#1A1A1A',
        'bg-tertiary': '#242424',
        'surface': '#1A1A1A',
        'surface-secondary': '#1A1A1A',
        'surface-elevated': '#242424',
        'text-primary': '#FFFFFF',
        'text-secondary': '#B0B0B0',
        success: '#4CAF50',
        warning: '#FF9800',
        danger: '#F44336',
        info: '#2196F3',
        muted: '#6B7280',
        input: '#2A2A2A',
        border: '#333333',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.3)',
        'card-lg': '0 8px 24px rgba(0, 0, 0, 0.4)',
        glow: '0 0 0 2px rgba(245, 197, 24, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out forwards',
        'slide-in': 'slideIn 0.2s ease-out forwards',
        'slide-in-from-bottom': 'slideInFromBottom 0.3s ease-out forwards',
        'zoom-in': 'zoomIn 0.2s ease-out forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideIn: { from: { transform: 'translateY(-20px)', opacity: 0 }, to: { transform: 'translateY(0)', opacity: 1 } },
        slideInFromBottom: { from: { transform: 'translateY(20px)', opacity: 0 }, to: { transform: 'translateY(0)', opacity: 1 } },
        zoomIn: { from: { transform: 'scale(0.95)', opacity: 0 }, to: { transform: 'scale(1)', opacity: 1 } },
      },
    },
  },
  plugins: [],
}