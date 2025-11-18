/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // TOONIQブランドカラー - Blue系
        brand: {
          blue: '#2DA9D8',
          DEFAULT: '#2DA9D8',
        },
        blue: {
          50: '#F0F9FC',
          100: '#E0F3F9',
          200: '#C1E7F3',
          300: '#8DD4E8',
          400: '#52BBDB',
          500: '#2DA9D8',
          600: '#1B8FBF',
          700: '#15739A',
          800: '#105A78',
          900: '#0C4459',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#4B5563',
          800: '#3E4248',
          900: '#1E293B',
        },
        charcoal: {
          800: '#2C3338',
          900: '#1A1F24',
        },
        surface: '#FFFFFF',
        // ダークモードカラー
        'dark-bg': '#0F0F0F',
        'dark-card': '#1A1A1A',
        'dark-border': '#2A2A2A',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
