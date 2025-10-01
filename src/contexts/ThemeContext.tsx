import React, { createContext, useEffect, useState, useContext } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import {getThemePalette} from "../utils/ThemePalettes";
import type {Theme as MuiTheme} from "@mui/material";


export type Theme = "light" | "dark" ;
export interface ThemeContextType {
    theme : Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
    muiTheme: MuiTheme;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);





export const ThemeProvider:React.FC<{children:React.ReactNode}> = ({children}) => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        const newTheme: Theme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };


    useEffect(() => {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark" ) {
            setTheme(stored);
        }
    }, []);


    const muiTheme = createTheme({
        palette:  getThemePalette(theme),
    });

    return <ThemeContext.Provider value={{theme, toggleTheme, setTheme, muiTheme}}>
        <MuiThemeProvider theme={muiTheme}>
            {children}
        </MuiThemeProvider>
    </ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
    const ctx = useContext(ThemeContext);
    if (ctx === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return ctx;
}