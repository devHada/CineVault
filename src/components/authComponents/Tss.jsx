import React, { useContext } from "react";
import { ThemeDataContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const Tss = () => {
  const { color, rotate } = useContext(ThemeDataContext);

  return (
    <div className="h-96 overflow-hidden relative w-96 flex justify-end items-center">
      <motion.svg
        width="130"
        height="130"
        viewBox="0 0 451 414"
        style={{
          color: color,
        }}
        xmlns="http://www.w3.org/2000/svg"
        className="fixed transform transition ease-in-out right-[94%] bottom-5 "
        animate={{ rotate: rotate }}
        transition={{ duration: 1 }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M241.148 0H208.995V130.934L155.664 9.53405L125.852 20.6117L180.565 145.156L77.2898 50.1737L54.5542 71.084L153.539 162.121L25.2622 110.575L12.3893 137.673L148.121 192.214H0V221.786H148.12L12.3893 276.326L25.2622 303.425L153.538 251.88L54.5542 342.916L77.2898 363.825L180.565 268.843L125.852 393.389L155.664 404.466L208.995 283.066V414H241.148V283.066L294.479 404.466L324.29 393.389L269.579 268.843L372.853 363.825L395.588 342.916L296.604 251.88L424.881 303.425L437.753 276.326L302.023 221.786H450.143V192.214H302.021L437.753 137.673L424.881 110.575L296.604 162.121L395.588 71.0838L372.853 50.1737L269.579 145.156L324.29 20.6117L294.479 9.53405L241.148 130.934V0Z"
          fill={color}
        />
      </motion.svg>
    </div>
  );
};

export default Tss;
