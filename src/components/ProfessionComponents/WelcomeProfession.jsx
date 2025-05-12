import React from "react";
import {motion } from "framer-motion";
import {useState, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { FaGraduationCap, FaRegLightbulb, FaChartLine } from "react-icons/fa";
import axios from "axios";

export const Welcome = ({ setStage, handleGetQuestion, onClose = () => {} }) => {
    const { isDarkMode } = useContext(ThemeContext);



    return (
      <div
        className={`
          min-h-screen
          absolute sm:relative inset-0 
          flex flex-col sm:my-0 sm:pt-0 my-16 pt-12
          px-4 sm:px-6 lg:px-8
          transition-all duration-500 ease-in-out
          ${isDarkMode ? "bg-[#141414] text-white" : "bg-white text-gray-900"}
        `}
      >
        <motion.button
          className="p-2 rounded-full  transition-colors"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 float-right w-5 sm:h-6 sm:w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={isDarkMode ? "#e2e8f0" : "#334155"}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative group">
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
            ></motion.div>
            <motion.div
              className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-3 sm:p-4 rounded-full text-white z-10"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaGraduationCap
                size={32}
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-4 sm:mb-6 px-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Профориентационный тест
        </motion.h1>

        <motion.div
          className={`
            ${isDarkMode ? "bg-[#141414]" : "bg-white"} 
            rounded-2xl shadow-xl border 
            ${isDarkMode ? "border-gray-700" : "border-gray-100"}
            mx-auto w-full max-w-sm sm:max-w-md
            transform transition-all duration-300 hover:shadow-2xl
          `}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className="p-4 sm:p-6">
            <p
              className={`mb-6 text-sm sm:text-base leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Этот тест проанализирует ваши интересы и облегчит выбор ВУЗа.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
              <motion.div
                className={`
                  ${isDarkMode ? "bg-blue-900/30" : "bg-blue-50"} 
                  p-2 rounded-xl flex flex-col items-center justify-center
                  transition-all duration-300 hover:scale-105 hover:shadow-md
                `}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`text-blue-500 mb-1 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  } transition-transform duration-300`}
                >
                  <FaRegLightbulb size={18} />
                </div>
                <p className="text-xs text-center px-1">
                  Узнайте подходящие вам ВУЗы
                </p>
              </motion.div>

              <motion.div
                className={`
                  ${isDarkMode ? "bg-green-900/30" : "bg-green-50"} 
                  p-2 rounded-xl flex flex-col items-center justify-center
                  transition-all duration-300 hover:scale-105 hover:shadow-md
                `}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`text-green-500 mb-1 ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  } transition-transform duration-300`}
                >
                  <FaChartLine size={18} />
                </div>
                <p className="text-xs text-center px-1">
                  Оцените свои возможности на поступление
                </p>
              </motion.div>

              <motion.div
                className={`
                  ${isDarkMode ? "bg-purple-900/30" : "bg-purple-50"} 
                  p-2 rounded-xl flex flex-col items-center justify-center
                  transition-all duration-300 hover:scale-105 hover:shadow-md
                `}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`text-purple-500 mb-1 ${
                    isDarkMode ? "text-purple-400" : "text-purple-600"
                  } transition-transform duration-300`}
                >
                  <FaGraduationCap size={18} />
                </div>
                <p className="text-xs text-center px-1">
                  Выберите подходящие вам направления
                </p>
              </motion.div>
            </div>

            <motion.button
              onClick={() => {
                setStage("test");
                handleGetQuestion();
              }}
              className={`
                w-full px-4 py-3 sm:px-6 sm:py-3
                bg-gradient-to-r from-blue-500 to-indigo-600 
                text-white rounded-xl shadow-md
                hover:shadow-xl transform hover:-translate-y-0.5
                transition-all duration-300 text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                relative overflow-hidden
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Начать тест</span>
              <span className="absolute inset-0 bg-white bg-opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="hidden sm:block mt-8 text-center text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Отвечайте максимально честно, ведь от ваших ответов зависит точность
          результатов
        </motion.div>

      </div>
      
    );
  };
