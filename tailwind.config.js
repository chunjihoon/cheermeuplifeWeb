/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        // 아래처럼 커스텀 폰트 지정 가능
        fontFamily: {
          gotgam: ['SANJUGotgam', 'sans-serif'],
          giantsInline: ['Giants-Inline', 'sans-serif'],
          sans: ['"Noto Sans KR"', 'Apple SD Gothic Neo', 'sans-serif'],
          // 예시: Giants: ['Giants-Bold'], 등
        },
      },
    },
    plugins: [],
};