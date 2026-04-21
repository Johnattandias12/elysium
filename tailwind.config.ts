import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0c0c0c',
          surface: '#111111',
          elevated: '#1a1a1a',
        },
        border: {
          DEFAULT: '#222222',
          strong: '#333333',
        },
        text: {
          primary: '#e8e8e8',
          secondary: '#888888',
          muted: '#555555',
        },
        brand: {
          gold: '#C9A84C',
        },
        module: {
          finance: '#4ade80',
          study: '#60a5fa',
          health: '#f87171',
          routine: '#facc15',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      keyframes: {
        fadeSlideUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeSlideIn: {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% 0' },
          to: { backgroundPosition: '200% 0' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0)' },
          '50%': { boxShadow: '0 0 0 6px rgba(201,168,76,0.15)' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        ringFill: {
          from: { strokeDashoffset: '283' },
          to: { strokeDashoffset: 'var(--dash-offset)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-slide-up': 'fadeSlideUp 280ms cubic-bezier(0.16,1,0.3,1) both',
        'fade-slide-in': 'fadeSlideIn 280ms cubic-bezier(0.16,1,0.3,1) both',
        shimmer: 'shimmer 1.5s infinite linear',
        'scale-in': 'scaleIn 200ms ease-out both',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ring-fill': 'ringFill 1s cubic-bezier(0.16,1,0.3,1) both',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        gold: '0 0 20px rgba(201,168,76,0.15)',
        'gold-strong': '0 0 40px rgba(201,168,76,0.25)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
        glow: '0 0 60px rgba(201,168,76,0.08)',
      },
    },
  },
  plugins: [animate],
}

export default config
