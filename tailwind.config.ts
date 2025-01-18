import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.tsx', './src/**/*.scss'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: 'var(--font-montserrat)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
} satisfies Config
