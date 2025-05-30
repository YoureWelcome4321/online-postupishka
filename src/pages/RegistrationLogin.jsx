import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  HiOutlineUserCircle,
  HiOutlineLockClosed,
  HiOutlineMail,
} from "react-icons/hi";
 
import { MdOutlineClass } from "react-icons/md";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import HeaderNoButton from "../components/MainPageComponents/Header";

const RegistrationLogin = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formRegistData, setFormRegistData] = useState({
    first_name: "",
    email: "",
    class_number: "",
    telegram: "",
    password: "",
  });
  const [formSignInData, setFormSignInData] = useState({
    identifier: "",
    password: "",
  });
  const [registErrors, setRegistErrors] = useState({});
  const [signInErrors, setSignInErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Функции валидации
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validateRegistration = () => {
    const errors = {};
    if (!formRegistData.first_name.trim()) errors.first_name = "Введите имя";
    if (!formRegistData.email.trim()) {
      errors.email = "Введите email";
    } else if (!validateEmail(formRegistData.email)) {
      errors.email = "Некорректный email";
    }
    if (!formRegistData.class_number) {
      errors.class_number = "Введите класс";
    } else if (
      formRegistData.class_number > 11 ||
      formRegistData.class_number < 9
    ) {
      errors.class_number = "Класс должен быть от 9 до 11";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        if (validateSignIn()) {
          const response = await axios.post(
            `${import.meta.env.VITE_API}/auth`,
            {
              ...formSignInData,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          localStorage.setItem("token", response.data.token);
          navigate("/main");
        }
      } else {
        if (validateRegistration()) {
          const response = await axios.post(
            `${import.meta.env.VITE_API}/reg`, 
            {
              ...formRegistData,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("registeringEmail", formRegistData.email); 

          navigate("/check-email");
        }
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          setLoginError("Неверный логин или пароль");
        } else if (status === 409) {
          setEmailError("Данная почта уже зарегистрирована");
        }
      }
      console.error("Ошибка при регистрации:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const processedValue =
      name === "class_number" ? parseInt(value, 10) : value;
    setRegistErrors({ ...registErrors, [name]: "" });
    setFormRegistData((prev) => ({ ...prev, [name]: processedValue }));
  };

  const handleSignInChange = (e) => {
    setSignInErrors({ ...signInErrors, [e.target.name]: "" });
    setLoginError("");
    setEmailError("");
    setFormSignInData({
      ...formSignInData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white"
          : "bg-[#f6f6f6] text-gray-800"
      }`}
    >
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
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <div className="flex justify-around mb-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setRegistErrors({});
              setSignInErrors({});
              setLoginError("");
              setEmailError("");
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
              setLoginError("");
              setEmailError("");
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
              name={isLogin ? "identifier" : "first_name"}
              value={
                isLogin ? formSignInData.identifier : formRegistData.first_name
              }
              onChange={isLogin ? handleSignInChange : handleInputChange}
              placeholder={isLogin ? "Логин или email" : "Логин"}
              autoComplete="username"
              className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                isDarkMode
                  ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                  : "bg-white placeholder-[#99a1af] focus:bg-gray-50"
              } border border-transparent focus:border-[#6E7BF2] transition-all ${
                (isLogin && signInErrors.identifier) ||
                (!isLogin && registErrors.first_name)
                  ? "border-red-500"
                  : ""
              }`}
            />
            {/* Валидация имени */}
            {(isLogin ? signInErrors.identifier : registErrors.first_name) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 ml-2 flex items-center space-x-2 text-red-500 text-xs w-full"
              >
                <span className="block w-2 h-2 rounded-full bg-red-500" />
                <span>
                  {isLogin ? signInErrors.identifier : registErrors.first_name}
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

                {/* Ошибка существующей почты */}
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-2 flex items-center space-x-2 text-red-500 text-sm w-full"
                  >
                    {emailError}
                  </motion.p>
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
                  type="number"
                  name="class_number"
                  value={formRegistData.class_number}
                  onChange={handleInputChange}
                  placeholder="Класс"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg ${
                    isDarkMode
                      ? "bg-[#222] placeholder-white/50 focus:bg-[#333]"
                      : "bg-white focus:bg-gray-50"
                  } border border-transparent focus:border-[#6E7BF2] transition-all ${
                    registErrors.class_number ? "border-red-500" : ""
                  }`}
                />
                {/* Валидация класса */}
                {registErrors.class_number && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 ml-2 flex items-center space-x-2 text-red-500 text-xs w-full"
                  >
                    <span className="block w-2 h-2 rounded-full bg-red-500" />
                    <span>{registErrors.class_number}</span>
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
              value={
                isLogin ? formSignInData.password : formRegistData.password
              }
              onChange={isLogin ? handleSignInChange : handleInputChange}
              placeholder="Пароль"
              autoComplete="current-password"
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
            {/* Валидация пароля */}
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
            className={`w-full bg-gradient-to-r from-[#6E7BF2] to-[#4a90e2] hover:from-[#3d37f0] hover:to-[#2d66d4] text-white py-3 rounded-full font-bold mb-1 shadow-lg ${
              isDarkMode ? "" : "shadow-blue-200"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </motion.button>

          {isLogin && (
            <p className="my-2 ml-2 flex items-center justify-center space-x-2 text-red-500 text-sm w-full">
              {loginError}
            </p>
          )}

          <div className="flex justify-between text-sm mt-3 mb-6">
            {!isLogin && (
              <button
                type="button"
                onClick={() => {
                  setIsLogin(true);
                  setRegistErrors({});
                  setSignInErrors({});
                  setLoginError("");
                  setEmailError("");
                }}
                className={`hover:underline ${
                  isDarkMode ? "text-white/70" : "text-gray-500"
                }`}
              >
                Уже есть аккаунт?
              </button>
            )}
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