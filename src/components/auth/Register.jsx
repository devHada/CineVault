import React from "react";

const Register = ({ dark }) => {
  const inputClass = `text-base w-full p-3 outline-none rounded-xl border-2 shadow-sm transition-all duration-300 font-raleway
    ${
      dark
        ? "text-white placeholder:text-gray-600 bg-[#31312E] border-gray-400/30 hover:border-white focus:border-yellow-400"
        : "text-black placeholder:text-gray-400 bg-gray-100 border-gray-300 hover:border-gray-500 focus:border-yellow-400"
    }`;

  return (
    <form className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1 w-full">
          <label
            className={`font-raleway text-sm ml-1 ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            Name
          </label>
          <input className={inputClass} type="text" placeholder="Wilson Fisk" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label
            className={`font-raleway text-sm ml-1 ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            Email
          </label>
          <input
            className={inputClass}
            type="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label
            className={`font-raleway text-sm ml-1 ${dark ? "text-gray-400" : "text-gray-500"}`}
          >
            Set Password
          </label>
          <input
            className={inputClass}
            type="password"
            placeholder="••••••••"
          />
        </div>
      </div>
      <button
        className={`text-base border-2 p-3 w-full rounded-xl font-extrabold font-raleway transition-all duration-300
          ${
            dark
              ? "text-white bg-transparent border-gray-400/30 hover:border-white hover:text-yellow-400 focus:border-yellow-400"
              : "text-black bg-transparent border-gray-300 hover:border-black hover:text-yellow-500 focus:border-yellow-400"
          }`}
        type="submit"
      >
        JOIN THE VAULT
      </button>
    </form>
  );
};

export default Register;
