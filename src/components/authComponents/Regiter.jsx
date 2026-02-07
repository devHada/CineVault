import React from "react";
import { useContext } from "react";
import { ThemeDataContext } from "../../context/ThemeContext";

const Register = () => {
  const { theme, setClick } = useContext(ThemeDataContext);
  return (
    <div className="h-10 w-full text-xl flex justify-center items-center   ">
      <h1
        onClick={() => {
          document.getElementById("1").style.display = "none";
          document.getElementById("2").style.display = "block";
          setClick(1);
        }}
        id="1"
        className={` cursor-pointer underline font-roboto font-bold ${theme === "light" ? "text-black" : "text-white"}`}
      >
        Don't have an account?
      </h1>
      <h1
        onClick={() => {
          document.getElementById("1").style.display = "block";
          document.getElementById("2").style.display = "none";
          setClick(0);
        }}
        id="2"
        style={{ display: "none" }}
        className={`  cursor-pointer underline font-roboto font-bold ${theme === "light" ? "text-black" : "text-white"}`}
      >
        Already have an account?
      </h1>
    </div>
  );
};

export default Register;
