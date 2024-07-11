import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        custom: {
          'soft-black': "#181A18",
          'all': 'hsl(22, 0%, 45%)',
          'normal': 'hsl(55, 25%, 65%)',
          'fire': 'hsl(17, 88%, 64%)',
          'water': 'hsl(219, 75%, 61%)',
          'electric': 'hsl(54, 93%, 65%)',
          'grass': 'hsl(100, 51%, 63%)',
          'ice': 'hsl(180, 54%, 73%)',
          'fighting': 'hsl(359, 61%, 52%)',
          'poison': 'hsl(309, 45%, 56%)',
          'ground': 'hsl(46, 68%, 71%)',
          'flying': 'hsl(248, 83%, 72%)',
          'psychic': 'hsl(332, 89%, 70%)',
          'bug': 'hsl(70, 71%, 48%)',
          'rock': 'hsl(47, 55%, 50%)',
          'ghost': 'hsl(276, 34%, 48%)',
          'dragon': 'hsl(251, 93%, 67%)',
          'dark': 'hsl(18, 18%, 46%)',
          'steel': 'hsl(240, 12%, 80%)',
          'fairy': 'hsl(331, 55%, 68%)',
          // Tags
          'tag-normal': 'hsl(55, 25%, 75%)',
          'tag-fire': 'hsl(17, 88%, 74%)',
          'tag-water': 'hsl(219, 75%, 71%)',
          'tag-electric': 'hsl(54, 93%, 75%)',
          'tag-grass': 'hsl(100, 51%, 73%)',
          'tag-ice': 'hsl(180, 54%, 83%)',
          'tag-fighting': 'hsl(359, 61%, 62%)',
          'tag-poison': 'hsl(309, 45%, 66%)',
          'tag-ground': 'hsl(46, 68%, 81%)',
          'tag-flying': 'hsl(248, 83%, 82%)',
          'tag-psychic': 'hsl(332, 89%, 80%)',
          'tag-bug': 'hsl(70, 71%, 58%)',
          'tag-rock': 'hsl(47, 55%, 60%)',
          'tag-ghost': 'hsl(276, 34%, 58%)',
          'tag-dragon': 'hsl(251, 93%, 77%)',
          'tag-dark': 'hsl(18, 18%, 56%)',
          'tag-steel': 'hsl(240, 12%, 90%)',
          'tag-fairy': 'hsl(331, 55%, 78%)',
        },
      },
      screens: {
        'md': {'raw': '(min-width: 840px)'},
        'hsm': { 'raw': '(min-height: 620px) and (min-width: 768px)' },
        'hmd': { 'raw': '(min-height: 880px)' },
        'hxl': { 'raw': '(min-height: 1050px)' },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
};
export default config;
