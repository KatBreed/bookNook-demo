module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': true,
      },
    },
    '@tailwindcss/postcss': {}, // use new separate PostCSS plugin
  },
};
