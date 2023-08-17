import { PaletteMode, createTheme } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
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
            secondary: "rgba(14,7,29,0.83)",
            disabled: "rgba(14,7,29,0.54)",
          },
          divider: "rgba(124,116,125,0.37)",
          error: {
            main: '#ba1a1a',
          }
        }
      : {
          primary: {
            main: "#d4bbff",
            light: "#543688",
            dark: "#ebdcff",
            contrastText: "#3c1c70",
          },
          secondary: {
            main: "#bdc2ff",
            light: "#363e90",
            dark: "#e3dfff",
            contrastText: "#020865",
          },
          background: {
            default: "#001b3d",
            paper: "#052141",
          },
          text: {
            secondary: "rgba(214,227,255,0.83)",
            disabled: "rgba(214,227,255,0.54)",
            primary: "rgba(214,227,255,0.83)",
            hint: "rgba(214,227,255,0.38)",
          },
          divider: "rgba(148,142,153,0.37)",
          error: {
            main: "#ffb4ab",
          },
        }),
  },
});
