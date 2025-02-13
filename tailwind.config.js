const mystTheme = require('@myst-theme/styles');

module.exports = {
  darkMode: 'class',
  content: mystTheme.content,
  theme: {
    extend: {
      ...mystTheme.themeExtensions,
      typography: {
        ...mystTheme.themeExtensions.typography,
        DEFAULT: {
          css: {
            fontSize: '1.125rem',
            fontWeight: '400',
            a: {
              color: 'rgb(0 73 121 / 0.8)',
              fontWeight: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
        invert: {
          css: {
            a: {
              color: '#ffffff',
              fontWeight: '600',
            },
          },
        },
      },
      gridTemplateColumns: {
        ...mystTheme.themeExtensions.gridTemplateColumns,
        'simple-sm':
          '[screen-start] 1fr [body-start] minmax(300px, 800px) [body-end] 1fr [screen-end]',
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
        'qeborder-blue': 'rgb(0 114 188)',
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif'],
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: '0', transform: 'translateY(-2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: '0', transform: 'translateX(2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: '0', transform: 'translateY(2px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: '0', transform: 'translateX(-2px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
  safelist: mystTheme.safeList,
};
