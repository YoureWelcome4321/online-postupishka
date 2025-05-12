import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext"; 
import UniversityCard from "../UniversityCard";

export const Result = ({ results, loadingStatus, onClose }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`
          min-h-screen absolute sm:relative inset-0 
          flex flex-col sm:my-0 sm:pt-0 my-16 pt-4 
          px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out
          ${isDarkMode ? "bg-[#141414] text-white" : "bg-white text-gray-900"}
          space-y-8 sm:space-y-6
        `}
    >
      {/* Кнопка закрытия */}
      <motion.button
        className="p-2 self-end mb-0 rounded-full transition-colors"
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6"
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

      {/* Заголовок */}
      <div className="text-center space-y-4 sm:space-y-2 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          Самые подходящие ВУЗы для вас:
        </h2>
        <p className="text-lg sm:text-base">На основе ваших ответов</p>
      </div>

      {/* Состояние загрузки */}
      {loadingStatus === "loading" && (
        <div className="flex justify-center items-center h-40">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="opacity-25"
            />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              className="opacity-75"
            />
          </svg>
        </div>
      )}

     {/*  {loadingStatus === "success" && results?.length > 0 ? ( */}
        <div className="space-y-4">
          {results.map((university, index) => (
            <UniversityCard key={index} {...university} />
          ))}
        </div>
      {/* ) : (
        <div className="text-center text-gray-500">
          Нет рекомендаций по вашему профилю
        </div>
      )} */}

      {/* Состояние ошибки */}
      {loadingStatus === "error" && (
        <div className="text-center text-red-500">
          Ошибка загрузки данных. Попробуйте позже.
        </div>
      )}
    </div>
  );
};
