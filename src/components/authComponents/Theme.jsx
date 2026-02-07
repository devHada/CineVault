import React, { useContext } from "react";
import { SunMoon } from "lucide-react";
import { Sun } from "lucide-react";
import { ThemeDataContext } from "../../context/ThemeContext";
import { motion } from "motion/react";

const Theme = () => {
  const data = useContext(ThemeDataContext);

  const themeChange = () => {
    if (data.theme === "light") {
      data.setTheme("dark");
    } else {
      data.setTheme("light");
    }
  };
  return (
    <div className="h-10 w-[77%] flex justify-end items-center ">
      <motion.button
        onClick={themeChange}
        whileHover={{ scale: 1.1 }}
        className={` flex justify-center items-center size-10 ${data.theme === "light" ? "bg-black" : "bg-white"} font-normal  cursor-pointer active:scale-95 ${data.theme === "light" ? "text-white" : "text-black"} text-sm rounded-xl `}
      >
        {data.theme === "light" ? <Sun /> : <SunMoon />}
      </motion.button>
    </div>
  );
};

export default Theme;
