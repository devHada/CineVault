import React, { useState } from "react";

const Login = ({ dark, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const inputClass = `text-base w-full p-3 outline-none rounded-xl border-2 shadow-sm transition-all duration-300 font-raleway ${
    dark
      ? "text-white placeholder:text-gray-600 bg-[#31312E] border-gray-400/30 hover:border-white focus:border-yellow-400"
      : "text-[#1a2744] placeholder:text-gray-400 bg-white border-[#1a2744]/20 hover:border-[#1a2744]/60 focus:border-[#1a2744]"
  }`;

  return (
    <form className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-1 w-full">
          <label
            className={`font-raleway text-sm ml-1 ${dark ? "text-gray-400" : "text-[#1a2744]/60"}`}
          >
            Email
          </label>
          <input
            className={inputClass}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label
            className={`font-raleway text-sm ml-1 ${dark ? "text-gray-400" : "text-[#1a2744]/60"}`}
          >
            Password
          </label>
          <input
            className={inputClass}
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className={`text-base border-2 p-3 w-full rounded-xl font-extrabold font-raleway transition-all duration-300 ${
          dark
            ? "text-white bg-transparent border-gray-400/30 hover:border-yellow-400 hover:text-yellow-400"
            : "text-[#1a2744] bg-transparent border-[#1a2744]/30 hover:border-[#1a2744] hover:bg-[#1a2744] hover:text-white"
        }`}
        type="submit"
      >
        ENTER THE VAULT
      </button>
    </form>
  );
};

export default Login;
