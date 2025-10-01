import type {PaletteOptions} from "@mui/material/styles";

export const lightPalette: PaletteOptions = {
    mode: "light",
    primary: {
        main: "#2e7d32",
        light: "#4caf50",
        dark: "#1b5e20",
        contrastText: "#ffffff",
    },
    secondary: {
        main: "#66bb6a",
        light: "#81c784",
        dark: "#388e3c",
        contrastText: "#ffffff",
    },
    success: {
        main: "#4caf50",
        light: "#81c784",
        dark: "#388e3c",
    },
    error: {
        main: "#d32f2f",
        light: "#ef5350",
        dark: "#c62828",
    },
    warning: {
        main: "#ff9800",
        light: "#ffb74d",
        dark: "#f57c00",
    },
    info: {
        main: "#0288d1",
        light: "#03a9f4",
        dark: "#01579b",
    },
    background: {
        default: "#f1f8f4",
        paper: "#ffffff",
    },
    text: {
        primary: "#212121",
        secondary: "#555555",
        disabled: "#9e9e9e",
    },
    divider: "rgba(46, 125, 50, 0.12)",
};

export const darkPalette: PaletteOptions = {
    mode: "dark",
    primary: {
        main: "#66bb6a",
        light: "#81c784",
        dark: "#4caf50",
        contrastText: "#000000",
    },
    secondary: {
        main: "#81c784",
        light: "#a5d6a7",
        dark: "#66bb6a",
        contrastText: "#000000",
    },
    success: {
        main: "#66bb6a",
        light: "#81c784",
        dark: "#4caf50",
    },
    error: {
        main: "#ef5350",
        light: "#e57373",
        dark: "#d32f2f",
    },
    warning: {
        main: "#ffb74d",
        light: "#ffd54f",
        dark: "#ff9800",
    },
    info: {
        main: "#29b6f6",
        light: "#4fc3f7",
        dark: "#0288d1",
    },
    background: {
        default: "#0a0a0a",
        paper: "#1e1e1e",
    },
    text: {
        primary: "#ffffff",
        secondary: "#b0b0b0",
        disabled: "#666666",
    },
    divider: "rgba(102, 187, 106, 0.12)",
};
export const getThemePalette = (mode: "light" | "dark") => {
    return mode === "light" ? lightPalette : darkPalette;
};