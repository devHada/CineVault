import React, { useContext, useState } from "react";
import { Mail } from "lucide-react";
import { LockKeyhole } from "lucide-react";
import { ThemeDataContext } from "../../context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { theme } = useContext(ThemeDataContext);

  const twoWayBind = (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
  };
  return (
    <div className="flex justify-center items-center gap-5 flex-col">
      <div className="flex items-center flex-col ">
        <h1
          className={`text-8xl ${theme === "light" ? "text-black" : "text-white"}  font-[neue] font-bold`}
        >
          Welcome
        </h1>
        <p
          className={`text-xl ${theme === "light" ? "text-black" : "text-white"}  font-normal  `}
        >
          We are glad to see you back with us.
        </p>
      </div>
      <form
        onSubmit={(e) => twoWayBind(e)}
        className="h-50 w-100 flex flex-col justify-end gap-3 "
      >
        <div
          style={{
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "12px",
            padding: "14px 16px",
            outline: "none",
          }}
          className="relative h-14 w-full bg-zinc-300  rounded-xl  "
        >
          <input
            type="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            className="h-full w-[90%] float-end border-none outline-none   text-shadow-neutral-900  font-bold"
          />
          <Mail className="absolute top-4 left-2" />
        </div>
        <div
          style={{
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.5)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "12px",
            padding: "14px 16px",
            outline: "none",
          }}
          className="relative h-14 w-full bg-zinc-300 rounded-xl  "
        >
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="h-full w-[90%] float-end border-none outline-none  text-shadow-neutral-900  font-bold"
          />
          <LockKeyhole className="absolute top-4 left-2" />
        </div>
        <button
          type="submit"
          style={{
            background: "linear-gradient(135deg, #000 0%, #333 100%)",

            padding: "16px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.5)";
            e.target.style.transform = "translateY(-2px)";
          }}
          className="h-14 w-full bg-black font-normal  cursor-pointer active:scale-95 text-white text-sm rounded-2xl "
        >
          LOGIN NOW
        </button>
      </form>
    </div>
  );
};

export default Login;
