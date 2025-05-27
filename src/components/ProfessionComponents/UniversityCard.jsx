import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../ThemeContext";

const UniversityCard = (
  {
    university,
    region,
    directions,
    information,
    isMaxSelected = false,
    selectedUniversities = [],
    onSaveUniversity,
  } = {}
) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedDirection, setSelectedDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentDirection = directions?.[selectedDirection] || {};
  
  // Получаем актуальные scores, с fallback на пустые значения
  const scores = currentDirection.scores || { min: "—", avg: "—", bud: "—" };

  const isSelected = selectedUniversities.some(
    (item) =>
      item.university === university &&
      item.direction === (currentDirection.name || currentDirection.program)
  );

  const handleSave = async () => {
    if (isSelected || isSubmitting || isMaxSelected) return;

    setIsSubmitting(true);
    try {
      // Формируем данные для отправки
      const payload = {
        university,
        direction: currentDirection.name || currentDirection.program,
        scores: {
          min: scores.min || 0,
          avg: scores.avg || 0,
          bud: scores.bud || 0,
        },
      };

      // Вызываем внешний обработчик, например, в родительском компоненте
      await onSaveUniversity(payload);
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        className={`px-4 py-3 ${
          isDarkMode ? "bg-[#3d37f0] text-white" : "bg-blue-600 text-white"
        }`}
      >
        <div
          className={`float-right px-3 py-1 rounded-full text-xs flex items-center gap-1 ${
            information ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {information ? <span>Актуальная информация</span> : <span>Требуется проверка</span>}
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
                {scores[key] ?? "—"}
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
            ${isDarkMode
              ? "bg-[#3d37f0] hover:bg-[#2a25b0] text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }
            ${isSelected && "bg-green-600 hover:bg-green-700 cursor-default"}
          `}
          onClick={handleSave}
          disabled={isSubmitting || isSelected || isMaxSelected}
        >
          {isSelected
            ? "Выбрано"
            : isSubmitting
            ? (
                <div className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Отправка...
                </div>
              )
            : "Выбрать направление"}
        </button>
      </div>
    </motion.div>
  );
};

export default UniversityCard;