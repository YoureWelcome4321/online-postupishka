import { useContext } from "react";
import React from "react";
import { ThemeContext } from "../ThemeContext";
import { IoIosSunny,IoMdMoon } from "react-icons/io";
import DolphinAnimationReverse from "../components/DolphinAnimationReverse";


export default function HeaderNoButton() {

    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
      <div className={`px-5 flex font-medium text-xl items-center ${isDarkMode ? "bg-black" : "bg-white"}`}>
        <DolphinAnimationReverse isDarkMode={isDarkMode} />
        <h1 className={`my-6 ml-2 ${isDarkMode ? "text-white" : "text-[#363e45]"}`}>Онлайн-Поступишка</h1>
        <button
          onClick={toggleTheme}
          className={`ml-auto  px-4 py-2 rounded-full transition-colors ${
            isDarkMode ? "bg-[#6E7BF2] hover:bg-[#3d37f0]" : "bg-[#bedbff] hover:bg-blue-300"
          }`}
        >
          {isDarkMode ? <IoIosSunny  className="text-white"/> : <IoMdMoon className="text-[#1e2939]"/>}
        </button>
      </div>

    )

}