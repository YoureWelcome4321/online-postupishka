import React, { useContext } from "react";
import { motion } from "framer-motion";
import { HiOutlineUserCircle, HiOutlineMail } from "react-icons/hi";
import { FaTelegramPlane } from "react-icons/fa";
import { ThemeContext } from "../ThemeContext";
import HeaderNoButton from "../components/HeaderNoButtons";

const Profile = () => {
  const { isDarkMode } = useContext(ThemeContext);

  // Пример данных пользователя (можно заменить на данные из API или контекста)
  const userData = {
    firstName: "Иван",
    email: "ivan@example.com",
    class: 10,
    telegram: "ivan_telegram",
  };

  return (
    <div className={`min-h-screen ${isDarkMode 
      ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white" 
      : "bg-[#f6f6f6] text-gray-800"}`}>
      <HeaderNoButton />
      <motion.div
        className="container mx-auto max-w-md mt-10 p-6 rounded-3xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: isDarkMode
            ? "linear-gradient(145deg, rgba(10,10,10,0.95) 0%, rgba(20,20,20,0.95) 50%, rgba(30,30,30,0.95) 100%)"
            : "linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(240,240,240,0.9) 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >
        {/* Заголовок */}
        <h1 className={`text-2xl font-bold text-center mb-6 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}>
          Профиль
        </h1>

        {/* Информация о пользователе */}
        <div className="space-y-4">
          {/* Имя */}
          <div className="relative flex items-center space-x-3">
            <HiOutlineUserCircle
              className={`text-2xl ${isDarkMode ? "text-white/70" : "text-gray-400"}`}
            />
            <div>
              <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {userData.firstName}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
                Имя пользователя
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="relative flex items-center space-x-3">
            <HiOutlineMail
              className={`text-2xl ${isDarkMode ? "text-white/70" : "text-gray-400"}`}
            />
            <div>
              <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {userData.email}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
                Email
              </p>
            </div>
          </div>

          {/* Класс */}
          <div className="relative flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 ${isDarkMode ? "text-white/70" : "text-gray-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <div>
              <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {userData.class} класс
              </p>
              <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
                Класс
              </p>
            </div>
          </div>

          {/* Telegram */}
          <div className="relative flex items-center space-x-3">
            <FaTelegramPlane
              className={`text-2xl ${isDarkMode ? "text-white/70" : "text-blue-500"}`}
            />
            <div>
              <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                @{userData.telegram}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
                Telegram
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center space-x-3">
            <HiOutlineMail
              className={`text-2xl ${isDarkMode ? "text-white/70" : "text-gray-400"}`}
            />
            <div>
              <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {userData.email}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
                Email
              </p>
            </div>
          </div>

          <div className="relative flex items-center space-x-3">
            <HiOutlineMail
              className={`text-2xl ${isDarkMode ? "text-white/70" : "text-gray-400"}`}
            />
            <div>
              <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                {userData.email}
              </p>
              <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
                Email
              </p>
            </div>
          </div>

        {/* Кнопка выхода */}
        <motion.button
          className={`w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-bold mt-6 shadow-lg ${
            isDarkMode ? "shadow-red-900/50" : "shadow-red-200"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            localStorage.removeItem("token"); // Удаление токена
            window.location.href = "/login"; // Перенаправление на страницу входа
          }}
        >
          Выйти
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;