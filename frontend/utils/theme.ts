import { createTheme } from "@mui/material";

export // 样式
const theme = createTheme({
  palette: {
    primary: {
      main: "#846cb3",
      light: "#e0d6f5",
      dark: "#59446f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#4d57a9",
      light: "#dee0ff",
      dark: "#000965",
    },
    background: {
      default: "#f6f3fc",
      paper: "#fffbfe",
    },
    text: {
      primary: "rgba(14,7,29,0.83)",
      secondary: "rgba(14,7,29,0.54)",
      disabled: "rgba(14,7,29,0.38)",
    },
    divider: "rgba(124,116,125,0.37)",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          MuiDialog: {
            borderRadius: 24,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#4d57a9",
          textTransform: "none",
          borderRadius: "50vh",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#4d57a9",
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "28px 20px",
        },
      },
    },
  },
  typography: {
    fontFamily: [
      '"Exo 2"',
      '"Noto Sans SC"',
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});
