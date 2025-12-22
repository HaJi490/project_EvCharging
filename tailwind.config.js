/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        // Next.js App Router의 표준 경로
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // globals.css의 :root에 정의된 변수를 가져옴
                primary: 'var(--primary-color)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            }
        },
    },
    plugins: [],
}