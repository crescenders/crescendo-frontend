/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        NotoSans: ['Noto Sans Korean', 'sans-serif'],
      },
      fontSize: {
        10: '0.625rem',
        11: '0.688rem',
        12: '0.75rem',
        13: '0.8125rem',
        14: '0.875rem',
        15: '0.938rem',
        16: '1rem',
        17: '1.0625rem',
        18: '1.125rem',
        20: '1.25rem',
        24: '1.5rem',
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        brand: '#7F44AA',
        dark: '#333333',
        warning: '#D23F00',
        text: {
          primary: '#8A8A8A',
          secondary: '#5A5A5A',
          tertiary: '#373737',
        },
        status: {
          success: '#2BD239',
          error: '#FC5A2F',
        },
        line: {
          primary: '#C7C8D2',
        },
      },
      boxShadow: {
        card: '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25)',
        loginButton: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        button:
          '2px 4px 12px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.1)',
        header:
          '0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05)',
        studyCard:
          '0px 8px 20px rgba(0, 0, 0, 0.1), 0px 2px 8px rgba(0, 0, 0, 0.1)',
        base: ' 0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        bounce1: 'bounce 0.5s infinite',
        bounce2: 'bounce 0.5s infinite 50ms',
        bounce3: 'bounce 0.5s infinite 100ms',
        slideDown: 'slide 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        slideUp: 'slideUp 0.3s',
        neon: 'neon 2s linear infinite',
        'skeleton-gradient': 'skeleton-gradient 1.35s infinite ease-in-out',
        'skeleton-gradient1': 'skeleton-gradient1 1.35s infinite ease-in-out',
      },
      keyframes: {
        slide: {
          '0%': {
            transform: 'translateY(-100px)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        'skeleton-gradient': {
          '0%': {
            'background-color': 'rgba(165, 165, 165, 0.7)',
          },
          '50%': {
            'background-color': 'rgba(165, 165, 165, 0.99)',
          },
          '100%': {
            'background-color': 'rgba(165, 165, 165, 0.7)',
          },
        },
        'skeleton-gradient1': {
          '0%': {
            'background-color': 'rgba(215, 215, 215, 0.7)',
          },
          '50%': {
            'background-color': 'rgba(200, 200, 200, 0.99)',
          },
          '100%': {
            'background-color': 'rgba(215, 215, 215, 0.7)',
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(100%)',
            opacity: 0,
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
        },
        neon: {
          '0%': {
            filter: 'drop-shadow(0 0 10px rgba(110, 13, 208, 0.5))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 30px rgba(110, 13, 208, 0.5))',
          },
          '100%': {
            filter: 'drop-shadow(0 0 10px rgba(110, 13, 208, 0.5))',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
