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
        'roomPink' : '#FF7B9C',
        'livingDarkGreen' : '#1C2321',
        'livingLightBlue' : '#7D98A1',
        'livingDarkGrey' : '#5E6572',
        'livingLightGrey' : '#A9B4C2',
        'livingWhite' : '#EEFIEF'

      }
    },
  },
  plugins: [],
}
