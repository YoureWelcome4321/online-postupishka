import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUserCircle,
  HiOutlineLockClosed,
  HiOutlineMail
} from "react-icons/hi";
import { FaTelegramPlane, FaGoogle, FaVk, FaTelegram } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import HeaderNoButton from "../components/HeaderNoButtons";

const RegistrationLogin = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isLogin, setIsLogin] = useState(true);
  const [formRegistData, setFormRegistData] = useState({
    firstName: "",
    email: "",
    class: "",
    telegram: "",
    password: ""
  });
  const [formSignInData, setFormSignInData] = useState({
    identifier: "",
    password: ""
  });
  const [registErrors, setRegistErrors] = useState({});
  const [signInErrors, setSignInErrors] = useState({});

  // Функции валидации
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validateTelegram = (telegram) => /^@[a-zA-Z0-9_]+$/.test(telegram);

  const validateRegistration = () => {
    const errors = {};
    if (!formRegistData.firstName.trim()) errors.firstName = "Введите имя";
    if (!formRegistData.email.trim()) {
      errors.email = "Введите email";
    } else if (!validateEmail(formRegistData.email)) {
      errors.email = "Некорректный email";
    }
    if (!formRegistData.class.trim()) {
      errors.class = "Введите класс";
    } else if (formRegistData.class > 11) {
      errors.class = "Класс не может быть больше 11";
    }
    if (!formRegistData.telegram.trim()) {
      errors.telegram = "Введите Telegram";
    } else if (!validateTelegram(formRegistData.telegram)) {
      errors.telegram = "Telegram должен начинаться с @";
    }
    if (formRegistData.password.length < 6) {
      errors.password = "Пароль должен быть не менее 6 символов";
    }
    setRegistErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignIn = () => {
    const errors = {};
    if (!formSignInData.identifier.trim()) {
      errors.identifier = "Введите логин или email";
    }
    if (!formSignInData.password.trim()) {
      errors.password = "Введите пароль";
    }
    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (validateSignIn()) console.log("Вход:", formSignInData);
    } else {
      if (validateRegistration()) console.log("Регистрация:", formRegistData);
    }
  };

  const handleInputChange = (e) => {
    setRegistErrors({ ...registErrors, [e.target.name]: "" });
    setFormRegistData({ ...formRegistData, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInErrors({ ...signInErrors, [e.target.name]: "" });
    setFormSignInData({ ...formSignInData, [e.target.name]: e.target.value });
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
        <div className="flex justify-around mb-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setRegistErrors({});
              setSignInErrors({});
            }}
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
            onClick={() => {
              setIsLogin(false);
              setRegistErrors({});
              setSignInErrors({});
            }}
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
        <form onSubmit={handleSubmit}>
          {/* Поле имени */}
          <div className="relative mb-4">
            <HiOutlineUserCircle
              className={`absolute left-4 flex mt-4.5 z-10 ${
                isDarkMode ? "text-white/70" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              name={isLogin ? "identifier" : "firstName"}
              value={isLogin ? formSignInData.identifier : formRegistData.firstName}
              onChange={isLogin ? handleSignInChange : handleInputChange}
              placeholder={isLogin ? "Имя пользователя или email" : "Ваше имя"}
              className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                isDarkMode
                  ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                  : "bg-white placeholder-[#99a1af] focus:bg-gray-50"
              } border border-transparent focus:border-[#6E7BF2] transition-all ${
                (isLogin && signInErrors.identifier) || 
                (!isLogin && registErrors.firstName) 
                  ? "border-red-500"
                  : ""
              }`}
            />
            {/* Валидация имени */}
            {(isLogin ? signInErrors.identifier : registErrors.firstName) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 ml-2 flex items-center space-x-2 text-red-500 text-xs w-full"
              >
                <span className="block w-2 h-2 rounded-full bg-red-500" />
                <span>
                  {isLogin ? signInErrors.identifier : registErrors.firstName}
                </span>
              </motion.div>
            )}
          </div>

          {/* Поля регистрации */}
          {!isLogin && (
            <>
              {/* Email */}
              <div className="relative mb-4">
                <HiOutlineMail
                  className={`absolute left-4 flex mt-4.5 z-10  ${
                    isDarkMode ? "text-white/70" : "text-gray-400"
                  }`}
                />
                <input
                  type="email"
                  name="email"
                  value={formRegistData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                    isDarkMode
                      ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                      : "bg-white focus:bg-gray-50"
                  } border border-transparent focus:border-[#6E7BF2] transition-all ${
                    registErrors.email ? "border-red-500" : ""
                  }`}
                />
                {/* Валидация email */}
                {registErrors.email && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-2 flex items-center space-x-2 text-red-500 text-xs w-full"
                  >
                    <span className="block w-2 h-2 rounded-full bg-red-500" />
                    <span>{registErrors.email}</span>
                  </motion.div>
                )}
              </div>

              {/* Класс */}
              <div className="relative mb-4">
                <MdOutlineClass
                  className={`absolute left-4 flex mt-4.5 z-10  ${
                    isDarkMode ? "text-white/70" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  name="class"
                  value={formRegistData.class}
                  onChange={handleInputChange}
                  placeholder="Класс"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                    isDarkMode
                      ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                      : "bg-white focus:bg-gray-50"
                  } border border-transparent focus:border-[#6E7BF2] transition-all ${
                    registErrors.class ? "border-red-500" : ""
                  }`}
                />
                {/*  Валидация класса */}
                {registErrors.class && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-2 flex items-center space-x-2 text-red-500 text-xs w-full"
                  >
                    <span className="block w-2 h-2 rounded-full bg-red-500" />
                    <span>{registErrors.class}</span>
                  </motion.div>
                )}
              </div>

              {/* Telegram */}
              <div className="relative mb-4">
                <FaTelegramPlane
                  className={`absolute left-4 flex mt-4.5 z-10  ${
                    isDarkMode ? "text-white/70" : "text-gray-400"
                  }`}
                />
                <input
                  type="text"
                  name="telegram"
                  value={formRegistData.telegram}
                  onChange={handleInputChange}
                  placeholder="Телеграм"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                    isDarkMode
                      ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                      : "bg-white focus:bg-gray-50"
                  } border border-transparent focus:border-[#6E7BF2] transition-all ${
                    registErrors.telegram ? "border-red-500" : ""
                  }`}
                />
                {/*  Валидация Telegram */}
                {registErrors.telegram && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-2 flex items-center space-x-2 text-red-500 text-xs w-full"
                  >
                    <span className="block w-2 h-2 rounded-full bg-red-500" />
                    <span>{registErrors.telegram}</span>
                  </motion.div>
                )}
              </div>
            </>
          )}

          {/* Поле пароля */}
          <div className="relative mb-4">
            <HiOutlineLockClosed
              className={`absolute left-4 flex mt-4.5 z-10  ${
                isDarkMode ? "text-white/70" : "text-gray-400"
              }`}
            />
            <input
              type="password"
              name="password"
              value={isLogin ? formSignInData.password : formRegistData.password}
              onChange={isLogin ? handleSignInChange : handleInputChange}
              placeholder="Пароль"
              className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                isDarkMode
                  ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                  : "bg-white focus:bg-gray-50"
              } border border-transparent focus:border-[#6E7BF2] transition-all ${
                (isLogin ? signInErrors.password : registErrors.password) 
                  ? "border-red-500"
                  : ""
              }`}
            />
            {/*  Валидация для пароля */}
            {(isLogin ? signInErrors.password : registErrors.password) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 ml-2 flex items-center space-x-2 text-red-500 text-xs w-full"
              >
                <span className="block w-2 h-2 rounded-full bg-red-500" />
                <span>
                  {isLogin ? signInErrors.password : registErrors.password}
                </span>
              </motion.div>
            )}
          </div>

          {/* Кнопка отправки */}
          <motion.button
            type="submit"
            className={`w-full bg-gradient-to-r from-[#6E7BF2] to-[#4a90e2] hover:from-[#3d37f0] hover:to-[#2d66d4] text-white py-3 rounded-full font-bold mb-6 shadow-lg ${
              isDarkMode ? "" : "shadow-blue-200"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </motion.button>

          {/* Ссылки и соцсети */}
          <div className="flex justify-between text-sm mb-6">
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
          <div className="flex justify-center space-x-6 mb-6">
            <button
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaGoogle className={`text-xl ${isDarkMode ? "text-white" : "text-gray-700"}`} />
            </button>
            <button
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaVk className={`text-xl ${isDarkMode ? "text-white" : "text-[#4a76a8]"}`} />
            </button>
            <button
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <FaTelegram className={`text-xl ${isDarkMode ? "text-white" : "text-blue-500"}`} />
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
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationLogin;