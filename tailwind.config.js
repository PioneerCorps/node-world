/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
    colors: {
      pastelPurple: "#8C7EFF",
      pastelPink: "#EDA1FF",
      pastelBlue: "#466CF7",
      pastelOrange: "#FF7764",
      pastelGreen: "#31A67B",
      pastelYellow: "#FFE471",

      bgDark1: "#22103A",
      bgDark2: "#321E4C",
      bgDark3: "#514167",
      bgLight1: "#706383",
      bgLight2: "#AFA8BA",

      bgBlack1: "#0E0E0F",
      bgBlack2: "#191616",
      bgBlack3: "#141414",
      bgBlack4: " #180000",

      bgGray1: "#1E1E1E",
      bgGray2: "#2F3031",
      bgGray3: "#565E5F",

      white1: "#CECBD5",
      white2: "#EEEDF1",

      borderOP: "#70638347",

      textDark1: "#706383",
      textDark2: "#321E4C",

      purpleOp15: "#8C7EFF29",
      purpleOp50: "#8C7EFF29",
      pinkOp: "#EDA1FF47",
      greenOp: "#31A67B80",
      orangeOp: "#FF776469",
      blackOp: "#00000057",
      bgLight1OP: "#70638347",
    },
  },
  plugins: [],
};
