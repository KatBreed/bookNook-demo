export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      heading: ['Merriweather', 'serif'],
      body: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#2C3E50',     // Deep slate
        secondary: '#6366F1',   // Indigo 500
        accent: '#D35400',      // Warm orange
        background: '#F3F4F6',  // Gray 200
        text: '#111827',        // Gray 900
      },
      fontSize: {
        hero: '2.5rem',   // 40px
        section: '2rem',  // 32px
      },
    },
  },
  plugins: [],
};
