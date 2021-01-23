module.exports = {
  purge: {
    enabled: true,
    content: [
    './src/**/*.ejs',
    './public/**/*.js'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
