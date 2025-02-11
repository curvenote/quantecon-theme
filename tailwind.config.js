const mystTheme = require('@myst-theme/styles');

module.exports = {
  darkMode: 'class',
  content: mystTheme.content,
  theme: {
    extend: {
      ...mystTheme.themeExtensions,
      gridTemplateColumns: {
        ...mystTheme.themeExtensions.gridTemplateColumns,
        'simple-sm': '[screen-start] 1fr [body-start] 800px [body-end] 1fr [screen-end]',
        'simple-xl':
          '[screen-start] 1fr 200px 20px [body-start] 800px [body-end] 20px [margin-start] 200px [margin-end] 1fr [screen-end]', // Two-column layout at large screens
      },
      gridColumn: {
        ...mystTheme.themeExtensions.gridColumn,
        screen: 'screen',
        'screen-start': 'screen-start',
        'screen-end': 'screen-end',
        body: 'body',
        'body-start': 'body-start',
        'body-end': 'body-end',
        margin: 'margin',
        'margin-start': 'margin-start',
        'margin-end': 'margin-end',
        'col-screen': 'screen-start / screen-end',
        'col-body': ' body-start / body-end',
        'col-margin': 'margin-start / margin-end',
        'gutter-left': 'screen-start / body-start',
        'gutter-right': 'margin-end / screen-end',
      },
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
