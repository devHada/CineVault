import React, { useState } from "react";

export const ThemeDataContext = React.createContext();
const ThemeContext = (props) => {
  const [theme, setTheme] = useState("light");
  const [color, setColor] = useState("");
  const [rotate, setRotate] = useState(0);
  const [click, setClick] = useState(0);

  return (
    <div>
      <ThemeDataContext.Provider
        value={{
          theme,
          setTheme,
          color,
          setColor,
          rotate,
          setRotate,
          click,
          setClick,
        }}
      >
        {props.children}
      </ThemeDataContext.Provider>
    </div>
  );
};

export default ThemeContext;
