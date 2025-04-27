/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],

  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.navigation-bar-button': {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0.75rem', // equivale ao p-3
          borderRadius: '9999px', // equivale ao rounded-full
          transition: 'all', // adicionar transições globais
        },
        '.navigation-bar-button:hover': {
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // equivale ao hover:shadow-lg
        },
        '.navigation-bar-button:active': {
          transform: 'scale(0.95)', // equivale ao active:scale-95
          backgroundColor: '#e5e7eb', // equivale ao active:bg-gray-200
        },
      });
    },
  ],
}