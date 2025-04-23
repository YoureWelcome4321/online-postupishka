import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import {
  HiOutlineLightBulb,
  HiOutlineAcademicCap,
  HiOutlineChatAlt2,
  HiOutlineClipboardList,
} from "react-icons/hi";
import { IoIosSunny,IoMdMoon } from "react-icons/io";
import { motion } from "framer-motion";
import DolphinAnimationReverse from "../components/DolphinAnimationReverse";
import StressChart from "../components/StressChart";


const MainPage = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`${isDarkMode ? "bg-[#0e0e0e]" : "bg-[#f6f6f6]"} min-h-screen`}>
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

      <header className="relative pt-20 pb-20 overflow-hidden">
        <div className="container mx-auto relative z-10 text-center">
          <motion.h1
            className={`text-6xl md:text-8xl font-black mb-8 ${isDarkMode ? "text-white" : "text-[#262d32]"}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Выбираем вуз<br />без страха
          </motion.h1>
          <motion.p
            className={`text-xl md:text-3xl mb-12 font-medium ${isDarkMode ? "text-white" : "text-[#262d32]"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ваш персональный гид в мире образования
          </motion.p>
          <motion.button
            className={`relative ${isDarkMode ? "bg-[#6E7BF2] hover:bg-[#3d37f0]" : "bg-[#066be7] hover:bg-blue-800"} transition-all text-white py-4 px-12 rounded-full font-bold`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/main">Начать сейчас</Link>
          </motion.button>
        </div>
      </header>

      <section className="container mx-auto mt-10 px-4 mb-10">
        <motion.h2
          className={`text-4xl md:text-5xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-[#262d32]"}`}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Что беспокоит абитуриентов?
        </motion.h2>
        <StressChart isDarkMode={isDarkMode} />
      </section>

      <section className="container mx-auto mt-25 px-4 mb-10">
        <motion.h2
          className={`text-4xl md:text-5xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-[#262d32]"}`}
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Почему выбирают нас?
        </motion.h2>
        <div className="grid pt-11 px-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className={`relative p-8 rounded-3xl overflow-hidden ${
                isDarkMode
                  ? "bg-gradient-to-b from-[#2437EC]/20 to-[#6E7BF2]/10"
                  : "bg-gradient-to-b from-[#bedbff]/20 to-[#8ec0ff]/10"
              }`}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div
                className={`absolute inset-0 rounded-3xl blur-xl transition-opacity duration-500 group-hover:opacity-100 opacity-50 ${
                  isDarkMode
                    ? "bg-gradient-radial from-[#2437EC]/40 via-transparent to-transparent"
                    : "bg-gradient-radial from-[#8ec0ff]/40 via-transparent to-transparent"
                }`}
              />
              <div className="relative z-10 space-y-4 text-center">
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 ${isDarkMode ? "text-[#7d88f3]" : "text-[#066be7]"}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  {[HiOutlineAcademicCap, HiOutlineLightBulb, HiOutlineChatAlt2, HiOutlineClipboardList][i]({
                    className: "w-full h-full",
                  })}
                </motion.div>
                <motion.h3
                  className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-[#363e45]"}`}
                >
                  {["Подготовка к ЕГЭ", "Профориентация", "Психологическая поддержка", "План поступления"][i]}
                </motion.h3>
                <motion.p className={`text-${isDarkMode ? "gray-400" : "stone-500"}`}>
                  {[
                    "Персональные графики и пробные тесты",
                    "Тесты и анализ ваших сильных сторон",
                    "Ежедневные советы и чат с психологом",
                    "Пошаговая инструкция от выбора до зачисления",
                  ][i]}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="relative mb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-6 h-6 rounded-full ${isDarkMode ? "bg-[#2437EC]/30" : "bg-[#8ec0ff]/30"} blur-xl`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>
        <div className="container mx-auto px-4 mt-25 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              className={`ml-15 mr-15 order-2 lg:order-1 ${isDarkMode ? "text-white" : "text-[#363e45]"}`}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className={`text-4xl md:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-[#363e45]"}`}
              >
                Как это работает?
              </motion.h2>
              <motion.p
                className={`text-lg mb-8 ${isDarkMode ? "text-white" : "text-[#363e45]"}`}
              >
                Бот анализирует ваши интересы, страхи и текущий уровень подготовки, создавая индивидуальную траекторию
              </motion.p>
              <ul className={`space-y-4 ${isDarkMode ? "text-white" : "text-[#363e45]"}`}>
                {[...Array(6)].map((_, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center space-x-3"
                  >
                    <span className={`w-2 h-2 ${isDarkMode ? "bg-white" : "bg-[#363e45]"} rounded-full`} />
                    <span>
                      {[
                        "Поддержка 24/7",
                        "Помощь в выборе специальности",
                        "Рекомендации по вузам",
                        "Анализ пробелов в знаниях",
                        "Напоминания о занятиях",
                        "Ежедневная проверка знаний ",
                      ][i]}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="order-1 lg:order-2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/phone.png"
                alt="Telegram бот интерфейс"
                className="w-[60%] rounded-3xl transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <section className="relative mt-20 pb-20 overflow-hidden">
        <motion.div
          className="container mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className={`text-4xl md:text-6xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-[#363e45]"}`}
          >
            Готовы начать?
          </motion.h2>
          <motion.p
            className={`text-lg mb-8 ${isDarkMode ? "text-gray-400" : "text-stone-500"}`}
          >
            Станьте тем, кто будет уверен в своем будущем
          </motion.p>
          <motion.button
            className={`relative ${isDarkMode ? "bg-[#6E7BF2] hover:bg-[#3d37f0]" : "bg-[#066be7] hover:bg-[#4a90e2]"} transition-all text-white py-4 px-12 rounded-full font-bold`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <a href="https://t.me/postupishka_bot">Начать бесплатно</a>
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default MainPage;