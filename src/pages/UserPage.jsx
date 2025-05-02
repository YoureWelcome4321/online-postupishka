import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import { IoDocumentOutline, IoAccessibilityOutline } from "react-icons/io5";
import { MdOutlinePsychologyAlt } from "react-icons/md";
import { CgSmileMouthOpen, CgSmileNeutral, CgSmileSad, CgGym } from "react-icons/cg";
import { PiSmileyAngry } from "react-icons/pi";
import { ThemeContext } from "../ThemeContext";
import HeaderNoButton from "../components/HeaderNoButtons";
import Header from "../components/Header";
import Profile from "../components/Profile";

const HomePage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const [showAlert, setAlert] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: "",
    email: "",
    class: "",
    username: "",
    subjects: [],
  });

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.online-postupishka.ru/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfileData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
      alert(`Ошибка: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode 
      ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white" 
      : "bg-[#f6f6f6] text-gray-800"}`}>
      <HeaderNoButton />
      {showAlert && <AreYouSure  onClose={() => setAlert(false)}/>}
      <div className={`flex ${isDarkMode?'bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a]':'bg-[#f6f6f6]'}`}>
        
        {/* Основное содержимое */}
        <motion.div
          className="max-w-full max-md:w-full p-6 bg-[#f6f6f6]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: isDarkMode 
              ? "#141414"
              : "#fff"
          }}
        >
          <header className="mt-8 max-sm:mt-0 sm:w-full">
            <h1 className="text-2xl pl-2 font-bold">
              Здравствуйте, {profileData.first_name}!
            </h1>
            <p className={`text-lg  ${isDarkMode?"text-white" : "text-[#363e45]"} pl-2`}>
              Как Ваше настроение сегодня?
            </p>
            <div className="flex justify-around mt-4 ">
              <button className={`bg-gray-200  text-4xl cursor-pointer rounded-full p-2`}>
                <CgSmileMouthOpen className={`text-[#363e45]`}/>
              </button>
              <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                <CgSmileNeutral className={`text-[#363e45]`}/>
              </button>
              <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                <CgSmileSad className={`text-[#363e45]`}/>
              </button>
              <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                <PiSmileyAngry className={`text-[#363e45]`}/>
              </button>
            </div>
          </header>

          <nav className="my-8 min-h-1.5 space-y-4  max-sm:hidden">
            <button
              onClick={() => setShowProfile(true)}
              className={`flex items-center py-2 w-full cursor-pointer ${isDarkMode ? 'hover:bg-gray-100 dark:hover:bg-[#6e7bf2] ' :'hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]'} p-2 transition-all rounded-lg`}
            >
              <HiOutlineUserCircle className="mr-2 text-xl" />
              Личный кабинет
            </button>
            <Link
              to="/trainers"
              className={`flex items-center py-2 p-2 ${isDarkMode ? 'hover:bg-gray-100 dark:hover:bg-[#6e7bf2] ' :'hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]'} transition-all rounded-lg`}
            >
              <CgGym className="mr-2 text-xl" />
              Тренажёры
            </Link>
            <Link
              to="/psychologist"
              className={`flex items-center py-2 p-2 ${isDarkMode ? 'hover:bg-gray-100 dark:hover:bg-[#6e7bf2] ' :'hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]'} transition-all rounded-lg`}
            >
              <MdOutlinePsychologyAlt className="mr-2 text-xl" />
              Психолог
            </Link>
            <Link
              to="/schedule"
              className={`flex items-center py-2 p-2 ${isDarkMode ? 'hover:bg-gray-100 dark:hover:bg-[#6e7bf2] ' :'hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]'} transition-all rounded-lg`}
            >
              <FaTasks className="mr-2 text-xl" />
              Помощь с расписанием
            </Link>
            <Link
              to="/specialties"
              className={`flex items-center py-2 p-2 ${isDarkMode ? 'hover:bg-gray-100 dark:hover:bg-[#6e7bf2] ' :'hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]'} transition-all rounded-lg`}
            >
              <IoAccessibilityOutline className="mr-2 text-xl" />
              Подбор специальности
            </Link>
            <Link
              to="/materials"
              className={`flex items-center py-2 p-2 ${isDarkMode ? 'hover:bg-gray-100 dark:hover:bg-[#6e7bf2] ' :'hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]'} transition-all rounded-lg`}
            >
              <IoDocumentOutline className="mr-2 text-xl" />
              Полезные материалы для поступления
            </Link>
          </nav>
        </motion.div>

        {/* Мобильное меню */}
        <nav className={`fixed bottom-0 left-0 w-full  z-100 shadow-lg sm:hidden ${isDarkMode 
      ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] " 
      : "bg-[#fff] "}`}>
          <div className="flex justify-around items-center py-4">
            <Link
              to="/trainers"
              className={`flex flex-col items-center  ${isDarkMode?"text-white" : "text-[#363e45]"} hover:text-blue-500`}
            >
              <CgGym size={24} />
              <span className="text-xs mt-1">Тренажёры</span>
            </Link>
            <Link
              to="/schedule"
              className={`flex flex-col items-center  ${isDarkMode?"text-white" : "text-[#363e45]"} hover:text-blue-500`}
            >
              <FaTasks size={24} />
              <span className="text-xs mt-1">Расписание</span>
            </Link>
            <Link
              to="/specialties"
              className={`flex flex-col items-center  ${isDarkMode?"text-white" : "text-[#363e45]"} hover:text-blue-500`}
            >
              <IoAccessibilityOutline size={24} />
              <span className="text-xs mt-1">Специальности</span>
            </Link>
            <button
              onClick={() => setShowProfile(true)}
              className={`flex flex-col items-center  ${isDarkMode?"text-white" : "text-[#363e45]"} hover:text-blue-500`}
            >
              <HiOutlineUserCircle size={24} />
              <span className="text-xs mt-1">Профиль</span>
            </button>
            
          </div>
        </nav>

        {/* Профиль */}
        {showProfile && <Profile  onClose={() => setShowProfile(false)}/>}
      </div>
    </div>
  );
};

export default HomePage;