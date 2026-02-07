import React from "react";
import tv from "../../assets/images/tv.png";

const Navbar = () => {
  return (
    <div className="h-30 flex w-full py-3  px-5 bg-white">
      <img src={tv} alt="" className="h-20 w-20" />
    </div>
  );
};

export default Navbar;
