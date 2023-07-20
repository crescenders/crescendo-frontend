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
    },
  },
  plugins: [],
};
