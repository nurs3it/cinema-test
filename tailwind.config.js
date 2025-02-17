const { tokens } = require("./src/theme/tokens");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: {
          main: tokens.colors.primary.main,
          light: tokens.colors.primary.light,
          dark: tokens.colors.primary.dark,
          foreground: tokens.colors.primary.foreground,
        },
        secondary: {
          main: tokens.colors.secondary.main,
          light: tokens.colors.secondary.light,
          dark: tokens.colors.secondary.dark,
          foreground: tokens.colors.secondary.foreground,
        },
        accent: {
          main: tokens.colors.accent.main,
          light: tokens.colors.accent.light,
          dark: tokens.colors.accent.dark,
          foreground: tokens.colors.accent.foreground,
        },
        background: {
          default: tokens.colors.background.default,
          paper: tokens.colors.background.paper,
        },
        border: {
          main: tokens.colors.border.main,
        },
      },
      spacing: tokens.spacing,
      fontSize: tokens.fontSize,
      fontWeight: tokens.fontWeight,
      borderRadius: tokens.borderRadius,
      border: {
        main: tokens.colors.border.main,
      },
      background: {
        default: tokens.colors.background.default,
        paper: tokens.colors.background.paper,
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
