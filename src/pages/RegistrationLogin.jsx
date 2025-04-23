import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUserCircle,
  HiOutlineLockClosed,
  HiOutlineMail,
  HiOutlineBookOpen
} from "react-icons/hi";
import { FaTelegram, FaGoogle, FaVk, FaTelegramPlane } from "react-icons/fa";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import { MdOutlineClass } from "react-icons/md";
import { motion } from "framer-motion";
import DolphinAnimationReverse from "../components/DolphinAnimationReverse";
import { ThemeContext } from "../ThemeContext";

const RegistrationLogin = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState(true);
  const [stackSearch, setStackSearch] = useState("");
  const egeData = [
    // ... список предметов ЕГЭ ...
  ];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    stack: [],
    email: "",
    telegram: "",
  });

  const inputVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const filteredStack = egeData.filter((subject) =>
    subject.toLowerCase().startsWith(stackSearch.toLowerCase())
  );

  const handleStackSelection = (subject) => {
    if (!formData.stack.includes(subject)) {
      setFormData((prev) => ({ ...prev, stack: [...prev.stack, subject] }));
    }
    setStackSearch("");
  };

  const removeStackItem = (subject) => {
    setFormData((prev) => ({
      ...prev,
      stack: prev.stack.filter((item) => item !== subject),
    }));
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white"
          : "bg-[#f6f6f6] text-gray-800"
      }`}
    >
      
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

      
      <motion.div
        className="container mx-auto max-w-md mt-10 p-6 rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: isDarkMode
            ? "linear-gradient(145deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.95) 50%, rgba(30,30,30,0.95) 100%)"
            : "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.9) 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        {/* Tabs */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              isDarkMode
                ? isLogin
                  ? "bg-[#6284ec] text-white"
                  : "text-white/70 hover:bg-[#6E7BF2]/10"
                : isLogin
                ? "bg-blue-100 text-blue-800"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Вход
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              isDarkMode
                ? !isLogin
                  ? "bg-[#6284ec] text-white"
                  : "text-white/70 hover:bg-[#6E7BF2]/10"
                : !isLogin
                ? "bg-blue-100 text-blue-800"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Регистрация
          </button>
        </div>

        {/* Input Fields */}
        <motion.div variants={inputVariants}>
          <div className="relative mb-6">
            <HiOutlineUserCircle
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? "text-white/70" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder={isLogin ? "Имя пользователя или email" : "Ваше имя"}
              className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                isDarkMode
                  ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                  : "bg-white placeholder-gray-300 focus:bg-gray-50"
              } border border-transparent focus:border-[#6E7BF2] transition-all`}
            />
          </div>

          {!isLogin && (
            <>
              <motion.div variants={inputVariants} className="relative mb-6">
                <HiOutlineMail
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-white/70" : "text-gray-400"
                  }`}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                    isDarkMode
                      ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                      : "bg-white placeholder-gray-300 focus:bg-gray-50"
                  } border border-transparent focus:border-[#6E7BF2] transition-all`}
                />
              </motion.div>
              
              <motion.div variants={inputVariants} className="relative mb-6">
                <MdOutlineClass 
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-white/70" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Класс"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                    isDarkMode
                      ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                      : "bg-white placeholder-gray-300 focus:bg-gray-50"
                  } border border-transparent focus:border-[#6E7BF2] transition-all`}
                />
              </motion.div>
              
              <motion.div variants={inputVariants} className="relative mb-6">
                <FaTelegramPlane 
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    isDarkMode ? "text-white/70" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Телеграм"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                    isDarkMode
                      ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                      : "bg-white placeholder-gray-300 focus:bg-gray-50"
                  } border border-transparent focus:border-[#6E7BF2] transition-all`}
                />
              </motion.div>
            </>
          )}

          <motion.div variants={inputVariants} className="relative mb-6">
            <HiOutlineLockClosed
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                isDarkMode ? "text-white/70" : "text-gray-400"
              }`}
            />
            <input
              type="password"
              placeholder="Пароль"
              className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                isDarkMode
                  ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                  : "bg-white placeholder-gray-300 focus:bg-gray-50"
              } border border-transparent focus:border-[#6E7BF2] transition-all`}
            />
          </motion.div>

         

          {/* Submit Button */}
          <motion.button
            className={`w-full bg-gradient-to-r from-[#6E7BF2] to-[#4a90e2] hover:from-[#3d37f0] hover:to-[#2d66d4] text-white py-3 rounded-full font-bold mb-6 shadow-lg`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </motion.button>

          {/* Links */}
          <div className="flex justify-between text-sm mb-8">
            <Link
              to="/forgot-password"
              className={`hover:underline ${
                isDarkMode ? "text-white/70" : "text-gray-500"
              }`}
            >
              Забыли пароль?
            </Link>
            {!isLogin && (
              <Link
                to="/login"
                className={`hover:underline ${
                  isDarkMode ? "text-white/70" : "text-gray-500"
                }`}
              >
                Уже есть аккаунт?
              </Link>
            )}
          </div>


          <div className="flex justify-center space-x-6">
            <button
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaGoogle
                className={`text-xl ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
              />
            </button>
            <button
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaVk
                className={`text-xl ${
                  isDarkMode ? "text-white" : "text-[#4a76a8]"
                }`}
              />
            </button>
            <button
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaTelegram
                className={`text-xl ${
                  isDarkMode ? "text-white" : "text-blue-500"
                }`}
              />
            </button>
          </div>

          {!isLogin && (
            <motion.p
              className={`text-center text-xs ${
                isDarkMode ? "text-white/60" : "text-gray-400"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Регистрируясь, вы соглашаетесь с <br />
              <Link
                to="/terms"
                className={`font-medium ${
                  isDarkMode ? "text-[#6E7BF2]" : "text-blue-600"
                }`}
              >
                условиями использования
              </Link>
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegistrationLogin;