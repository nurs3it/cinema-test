import { createTheme } from "@mui/material/styles";

import { tokens } from "@/theme/tokens";

export const muiTheme = createTheme({
  palette: {
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
    },
    text: {
      primary: tokens.colors.primary.foreground,
      secondary: tokens.colors.secondary.foreground,
    },
    background: {
      default: tokens.colors.background.default,
      paper: tokens.colors.background.paper,
    },
    border: {
      main: tokens.colors.border.main,
    },
    accent: {
      main: tokens.colors.accent.main,
      light: tokens.colors.accent.light,
      dark: tokens.colors.accent.dark,
      foreground: tokens.colors.accent.foreground,
    },
  },
  spacing: factor => `${factor * 0.25}rem`,
  typography: {
    fontSize: 16,
    fontWeight: tokens.fontWeight,
  },
  shape: {
    borderRadius: 8,
  },
});
