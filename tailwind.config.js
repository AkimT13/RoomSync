/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'roomFont': ["Inria Serif"]
      },
      colors: {
        'roomDarkBlue' : '#4B4E6D',
        'roomLightGreen' : '#A1E887',
        'roomPink' : '#FF7B9C'
      }
    },
  },
  plugins: [],
}
