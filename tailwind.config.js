module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'header-font': ['Are You Serious', 'cursive'],
      },
      height: {
        'header-height': '15vh',
      },
      screens: {
        sm: { max: '640px' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
