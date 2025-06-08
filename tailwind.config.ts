/// <reference types="tailwindcss" />
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient-shift': 'gradient-shift 5s ease infinite',
        'twinkle': 'twinkle 3s infinite',
        'shooting': 'shooting 3s linear infinite',
        'aurora-1': 'aurora-1 20s ease infinite',
        'aurora-2': 'aurora-2 25s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' }
        },
        'shooting': {
          '0%': {
            transform: 'translateX(-100px) translateY(-100px) rotate(45deg)',
            opacity: '0'
          },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': {
            transform: 'translateX(calc(100vw + 100px)) translateY(calc(100vh + 100px)) rotate(45deg)',
            opacity: '0'
          }
        },
        'aurora-1': {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(10%) translateY(-10%)' },
          '50%': { transform: 'translateX(-5%) translateY(5%)' },
          '75%': { transform: 'translateX(5%) translateY(-5%)' }
        },
        'aurora-2': {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '25%': { transform: 'translateX(-10%) translateY(10%)' },
          '50%': { transform: 'translateX(5%) translateY(-5%)' },
          '75%': { transform: 'translateX(-5%) translateY(5%)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      },
      colors: {
        'night': {
          900: '#0a0a0f',
          800: '#0f0f1a',
          700: '#14142a',
          600: '#1a1a3a',
          500: '#16162d',
        }
      }
    },
  },
  plugins: [],
}

export default config