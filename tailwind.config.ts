import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'ikigai': {
          100: '',
          200: '#aad5b6',
          300: '',
          400: '',
          500: '',
          600: '#50795b',
          700: '#53785d',
          800: '#4f7259',
          900: '',
        },
        'verbena': {
          600: '#a78dc0',
          900: '#6611d0'
        },
        'limeshine': {
          300: '#c5e965',
          500: '#81f48c'
        },
        'primrose': {
          400: '#deaddf',
          500: '#d8a2d9',
          600: '#d891d9', //*
          800: '#c67dc7'
        },
        'plum': {
          800: '#511052'
        }
      },
      zIndex: {
        thumb: '999',
        bubble: '899'
      },
      boxShadow: {
        glow: "0px 0px 18px .4px rgba(160, 221, 227, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
