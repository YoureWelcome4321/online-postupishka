import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../ThemeContext";

const UniversityCard = ({
  university,
  region,
  directions,
  information,
  onSelect = () => {},
  isSelected = false,
  isMaxSelected = false,
}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedDirection, setSelectedDirection] = useState(0);
  const currentDirection = directions?.[selectedDirection] || {};
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg shadow-md overflow-hidden ${
        isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
      }`}
    >
      {/* Баннер с названием */}
      <div
        className={`px-4 py-3 relative ${
          isDarkMode ? "bg-[#3d37f0] text-white" : "bg-blue-600 text-white"
        }`}
      >
        <div
          className={`absolute top-3 right-4 px-3 py-1 rounded-full text-xs flex items-center gap-1 ${
            information ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {information ? (
            <>
              <span>✅ Актуальная информация</span>
            </>
          ) : (
            <>
              <span>⚠️ Требуется проверка</span>
            </>
          )}
        </div>
        <h3 className="text-lg">{university}</h3>
        <p className="text-sm opacity-80">{region}</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Направления */}
        <div className="space-y-2">
          <h4
            className={`text-sm font-medium ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Направления:
          </h4>
          <div className="flex flex-wrap gap-2">
            {directions?.map((dir, idx) => (
              <span
                key={idx}
                className={`
                  px-3 py-1 rounded-full text-xs cursor-pointer
                  ${selectedDirection === idx
                    ? isDarkMode
                      ? "bg-[#3d37f0]"
                      : "bg-blue-100 text-blue-800"
                    : isDarkMode
                    ? "bg-[#2d2d2d]"
                    : "bg-gray-100"
                  }
                  ${isDarkMode ? "text-white" : ""}
                `}
                onClick={() => setSelectedDirection(idx)}
              >
                {dir.program || dir.name || "Без названия"}
              </span>
            ))}
          </div>
        </div>

        {/* Информация о баллах */}
        <div className="grid grid-cols-3 gap-3 mt-3">
          {["min", "avg", "bud"].map((key) => (
            <div
              key={key}
              className={`rounded-lg p-3 text-center ${
                isDarkMode ? "bg-[#6e7bf2] text-white" : "bg-blue-100 text-blue-800"
              }`}
            >
              <div className="text-[10px] uppercase tracking-wider font-medium">
                {key === "min" && "Мин. балл"}
                {key === "avg" && "Ср. балл"}
                {key === "bud" && "Бюджет"}
              </div>
              <div className="text-xl font-bold mt-1">
                {currentDirection.scores?.[key] ?? "—"}
              </div>
            </div>
          ))}
        </div>

        {/* Стоимость обучения */}
        <div
          className={`mt-4 p-3 rounded-lg ${
            isDarkMode ? "bg-[#2d2d2d]" : "bg-gray-50"
          }`}
        >
          <p className="text-sm">
            Стоимость обучения:
            <span className="font-bold ml-2">
              {currentDirection.tuition_price?.toLocaleString() ?? "—"} ₽/год
            </span>
          </p>
        </div>

        {/* Кнопка выбора */}
        <button
          className={`
            w-full my-4 py-2 rounded-lg transition
            ${isSelected
              ? "bg-green-600 hover:bg-green-700 cursor-default"
              : isMaxSelected
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isDarkMode
              ? "bg-[#3d37f0] hover:bg-[#2a25b0] text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          `}
          disabled={isSelected || isMaxSelected}
          onClick={() => onSelect({
            university,
            direction: currentDirection.program || currentDirection.name || "Не указано"
          })}
        >
          {isSelected
            ? "Выбрано"
            : isMaxSelected
            ? "Достигнут лимит (5)"
            : "Выбрать направление"}
        </button>
      </div>
    </motion.div>
  );
};

export default UniversityCard;