const mystTheme = require('@myst-theme/styles');

module.exports = {
  darkMode: 'class',
  content: mystTheme.content,
  theme: {
    extend: {
      ...mystTheme.themeExtensions,
      colors: {
        'qepage-dark': '#222',
        'qetoolbar-light': '#efefef',
        'qetoolbar-dark': '#444',
        'qetoolbar-border': '#ccc',
        'qetext-light': '#444444',
        'qetext-dark': '#fff',
        'qetext-dark-muted': '#a6a6a6',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  safelist: mystTheme.safeList,
};
