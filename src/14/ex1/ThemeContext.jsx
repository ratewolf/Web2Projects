import React from "react";

const ThemeContext = React.createContext({
    theme: "light",
    toggleTheme: () => {}
});

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;