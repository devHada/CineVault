import React from "react";
import Json from "../components/authComponents/Json";
import Login from "../components/authComponents/Login";
import Cards from "../components/authComponents/Cards";
import Tss from "../components/authComponents/Tss";
import Theme from "../components/authComponents/Theme";
import Register from "../components/authComponents/Regiter";
import { ThemeDataContext } from "../context/ThemeContext";
import { useContext } from "react";
import { useEffect } from "react";
import Registernow from "../components/authComponents/Registernow";

const Auth = () => {
  // dark mode bg-gradient-to-r from-black to-slate-600
  //light mode bg-gradient-to-r from-white to-slate-400

  const { theme, click } = useContext(ThemeDataContext);

  return (
    <div
      id="auth"
      className={`h-screen w-screen py-10 flex justify-between items-center ${
        theme === "light"
          ? "bg-linear-to-r from-white to-slate-400"
          : "bg-linear-to-r from-slate-900 to-slate-700"
      } `}
    >
      <div
        style={{
          backdropFilter: "blur(80px) saturate(200%)",
          WebkitBackdropFilter: "blur(80px) saturate(200%)",
          background: "rgba(255, 255, 255, 0.08)", // Subtle white tint
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "32px",
          padding: "48px",
          boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `,
        }}
        className="flex flex-col  gap-3 w-1/2 pb-5 h-full  rounded-2xl  "
      >
        <Json />
        {click === 0 ? <Login /> : <Registernow />}
        <Theme />
        <Tss />
        <Register />
      </div>
      <div className=" w-1/2 h-full ml-8 ">
        <Cards />
      </div>
    </div>
  );
};

export default Auth;
