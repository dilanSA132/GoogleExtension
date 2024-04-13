
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Rutas de tus archivos fuente
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}" // Rutas de los archivos de bibliotecas externas
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
  ],
};
