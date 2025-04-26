import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlineUserCircle,
  HiOutlineMail,
} from "react-icons/hi";
import {
  FaTasks
} from "react-icons/fa";
import { IoDocumentOutline , IoAccessibilityOutline} from "react-icons/io5";
import { MdOutlinePsychologyAlt } from "react-icons/md";
import { CgSmileMouthOpen, CgSmileNeutral, CgSmileSad , CgGym} from "react-icons/cg";
import { PiSmileyAngry } from "react-icons/pi";
import { FaTelegramPlane } from "react-icons/fa";
import { ThemeContext } from "../ThemeContext";

import HeaderNoButton from "../components/HeaderNoButtons";

const HomePage = () => {
  const [showProfile, setShowProfile] = useState(false); // Состояние для переключения между HomePage и Profile
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const userData = {
    firstName: "Иван",
    email: "ivan@example.com",
    class: 10,
    telegram: "ivan_telegram",
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаление токена
    navigate("/login"); // Перенаправление на страницу входа
  };

  return (
    <div className="bg-[#f6f6f6]" >
      <HeaderNoButton/>
      {/* Основное содержимое */}
      <motion.div
        className="container max-w-sm  p-6 bg-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
       

        {/* Отображение HomePage */}
          <>
            <header className="p-0">
              <h1 className="text-2xl pl-2 font-bold">Здравствуйте, Анна!</h1>
              <p className="text-lg text-[#363e45] pl-2">Как Ваше настроение сегодня?</p>
              <div className="flex justify-around mt-4 ">
                <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                  <CgSmileMouthOpen />
                </button>
                <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                  <CgSmileNeutral />
                </button>
                <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                  <CgSmileSad />
                </button>
                <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                  <PiSmileyAngry />
                </button>
              </div>
            </header>

            {/* Меню из Header */}
            <nav className="mt-6 space-y-4">
            <button 
                onClick={() => setShowProfile(true)}
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <HiOutlineUserCircle className="mr-2 text-xl" />
                Личный кабинет
                </button>
              <Link
                to="/trainers"
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <CgGym className="mr-2 text-xl" />
                Тренажёры
              </Link>
              <Link
                to="/psychologist"
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <MdOutlinePsychologyAlt className="mr-2 text-xl" />
                Психолог
              </Link>
              <Link
                to="/schedule"
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <FaTasks className="mr-2 text-xl" />
                Помощь с расписанием
              </Link>
              <Link
                to="/specialties"
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <IoAccessibilityOutline className="mr-2 text-xl"/>
                Подбор специальности
              </Link>
              <Link
                to="/specialties"
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <IoDocumentOutline className="mr-2 text-xl"/>
                Полезные материалы для поступления
              </Link>
            </nav>
    
            

            
          </>

        {/* Отображение Profile */}
        {showProfile && (
  <motion.div
    className={`absolute top-0 right-0 w-full md:w-2/3 h-screen p-6 rounded-l-3xl transition-all duration-300 ${
      isDarkMode 
        ? "bg-[#1a1a1a] text-white"
        : "bg-white text-gray-800"
    }`}
    initial={{ opacity: 0, x: "100%" }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: "100%" }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {/* Заголовок профиля */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Профиль</h1>
      <button 
        className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => setShowProfile(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    {/* Контент профиля */}
    <div className="">
      {/* Имя */}
      <div className="flex items-center space-x-4 p-4 bg-opacity-10 rounded-lg">
        <HiOutlineUserCircle 
          className={`text-3xl ${isDarkMode ? "text-white/70" : "text-gray-400"}`} 
        />
        <div>
          <p className="font-semibold text-lg">{userData.firstName}</p>
          <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
            Имя пользователя
          </p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-center space-x-4 p-4 bg-opacity-10 rounded-lg">
        <HiOutlineMail 
          className={`text-3xl ${isDarkMode ? "text-white/70" : "text-gray-400"}`} 
        />
        <div>
          <p className="font-semibold text-lg">{userData.email}</p>
          <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
            Email
          </p>
        </div>
      </div>

      {/* Класс */}
      <div className="flex items-center space-x-4 p-4 bg-opacity-10 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${isDarkMode ? "text-white/70" : "text-gray-400"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <div>
          <p className="font-semibold text-lg">{userData.class} класс</p>
          <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
            Учебный класс
          </p>
        </div>
      </div>

      {/* Telegram */}
      <div className="flex items-center space-x-4 p-4 bg-opacity-10 rounded-lg">
        <FaTelegramPlane 
          className={`text-3xl ${isDarkMode ? "text-white/70" : "text-blue-500"}`} 
        />
        <div>
          <p className="font-semibold text-lg">@{userData.telegram}</p>
          <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
            Telegram аккаунт
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4 p-4 bg-opacity-10 rounded-lg">
        <FaTelegramPlane 
          className={`text-3xl ${isDarkMode ? "text-white/70" : "text-blue-500"}`} 
        />
        <div>
          <p className="font-semibold text-lg">@{userData.telegram}</p>
          <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
            Telegram аккаунт
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4 p-4 bg-opacity-10 rounded-lg">
        <FaTelegramPlane 
          className={`text-3xl ${isDarkMode ? "text-white/70" : "text-blue-500"}`} 
        />
        <div>
          <p className="font-semibold text-lg">@{userData.telegram}</p>
          <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
            Telegram аккаунт
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4 p-4 bg-opacity-10 rounded-lg">
        <FaTelegramPlane 
          className={`text-3xl ${isDarkMode ? "text-white/70" : "text-blue-500"}`} 
        />
        <div>
          <p className="font-semibold text-lg">@{userData.telegram}</p>
          <p className={`text-sm ${isDarkMode ? "text-white/60" : "text-gray-500"}`}>
            Telegram аккаунт
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
        onClick={handleLogout}
      >
        Выйти
      </motion.button>
    </div>
  </motion.div>
)}
         
      </motion.div>
    </div>
  );
};

export default HomePage;