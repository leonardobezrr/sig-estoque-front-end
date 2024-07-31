import {nextui} from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: "",
  plugins: [nextui(
    {
      defaultTheme: "dark", // default theme from the themes object
      defaultExtendTheme: "dark",
      themes: {
        light: {
          primary: "#00FF00",
        },
        extend: {colors: {
          primary: "#00FF00",
        }},
      },
    }
  )],
}
