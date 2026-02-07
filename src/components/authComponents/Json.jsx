import React from "react";
import Bot from "../../assets/json/Loader-Lou.json";
import ticket from "../../assets/json/Coupon.json";
import Lottie from "lottie-react";
import { useContext } from "react";
import { ThemeDataContext } from "../../context/ThemeContext";

const Json = () => {
  const { theme } = useContext(ThemeDataContext);
  return (
    <div className="flex flex-row justify-around  ">
      <Lottie
        className="px-9"
        animationData={Bot}
        loop={true}
        style={{ width: 200, height: 200 }}
      />
      <div>
        <h1
          className={` text-6xl underline font-[neue] font-semibold  ${theme === "light" ? "text-black" : "text-white"}`}
        >
          MovieFlix
        </h1>
      </div>
      <Lottie
        animationData={ticket}
        loop={true}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </div>
  );
};

export default Json;
