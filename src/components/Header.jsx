import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import { IoIosSunny, IoMdMoon,IoIosMenu } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";

function Header() {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginUser , buttonStyle] = useState('Зарегистрироваться');
  const [loginLink , buttonLink] = useState('/sign')

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null){
        buttonStyle('Личный кабинет')
        buttonLink('/profile')
    } 
  },[])


  return (
    <div className={`py-3 ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-[#fff]'} sticky top-0 z-50`}>
      {/* Мобильное меню */}
      <div className="md:hidden px-5 flex justify-between items-center">
        <Link to="/">
          <img 
            src={isDarkMode ? "./dolphin.png" : "./dolphin.png"} 
            className="w-10"
            alt="Логотип"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors"
          >
            {isDarkMode ? (
              <IoIosSunny className="text-white text-2xl" />
            ) : (
              <IoMdMoon className="text-black text-2xl" />
            )}
          </button>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <IoIosMenu className="text-3xl" />
          </button>
        </div>
      </div>

      <div className="hidden md:flex px-5 items-center">
        <Link to="/">
          <img 
            src={isDarkMode ? "./dolphin.png" : "./dolphin.png"} 
            className="w-12 mr-6"
            alt="Логотип"
          />
        </Link>
        <div className="flex items-center space-x-8">
          <Link to="/trainers" className="hover:text-blue-300 transition-colors">
            Тренажёры
          </Link>
          <Link to="/psychologist" className="hover:text-blue-300 transition-colors">
            Психолог
          </Link>
          <Link to="/schedule" className="hover:text-blue-300 transition-colors">
            Помощь с расписанием
          </Link>
          <Link to="/specialties" className="hover:text-blue-300 transition-colors">
            Подбор специальности
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button className="px-6 py-2 bg-[#6E7BF2] hover:bg-[#3d37f0] text-white rounded-full transition-colors">
            <Link to={`${loginLink}`}>{loginUser}</Link>
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
              <IoIosSunny className="text-white text-2xl" />
            ) : (
              <IoMdMoon className="text-black text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Мобильное меню (выезжающее) */}
      <motion.div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed inset-0 bg-white dark:bg-[#1a1a1a] z-40 md:hidden transition-transform duration-300`}
      >
        <div className="p-5 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <Link to="/">
            <img 
              src={isDarkMode ? "./dolphin.png" : "./dolphin.png"} 
              className="w-10"
              alt="Логотип"
            />
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <AiOutlineClose className="text-3xl" />
          </button>
        </div>
        <nav className="p-5 space-y-4">
          <Link 
            to="/trainers"
            className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            onClick={toggleMobileMenu}
          >
            Тренажёры
          </Link>
          <Link 
            to="/psychologist"
            className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            onClick={toggleMobileMenu}
          >
            Психолог
          </Link>
          <Link 
            to="/schedule"
            className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            onClick={toggleMobileMenu}
          >
            Помощь с расписанием
          </Link>
          <Link 
            to="/specialties"
            className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            onClick={toggleMobileMenu}
          >
            Подбор специальности
          </Link>
          <button className="w-full px-6 py-3 bg-[#6E7BF2] hover:bg-[#3d37f0] text-white rounded-full transition-colors mt-4">
            <Link to={`${loginLink}`}>{loginUser}</Link>
          </button>
        </nav>
      </motion.div>

      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </div>
  );
}

export default Header;