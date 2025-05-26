import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../ThemeContext";
import UniversityCard from "./UniversityCard";

export const Result = ({ results, loadingStatus, onClose = () => {} }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startSlide, setStartSlide] = useState(0);
  const maxSelections = 5;

  // Сброс при закрытии
  useEffect(() => {
    return () => {
      setSelectedUniversities([]);
    };
  }, []);

  // Обработка выбора университета
  const handleSelectUniversity = (university) => {
    if (selectedUniversities.some(
      (u) => u.university === university.university && 
             u.direction === university.direction
    )) {
      alert("Вы уже выбрали это направление");
      return;
    }

    if (selectedUniversities.length >= maxSelections) {
      alert("Максимум 5 направлений");
      return;
    }

    setSelectedUniversities((prev) => [...prev, university]);
  };

  // Переключение слайдов
  const goToNext = () => {
    if (results.length <= 1) return;
    setCurrentSlide((prev) => Math.min(prev + 1, results.length - 1));
  };

  const goToPrev = () => {
    if (results.length <= 1) return;
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Обработка начала свайпа
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setStartSlide(currentSlide);
  };

  // Обработка свайпа
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    
    if (Math.abs(diff) > 50) {
      setIsDragging(false);
      if (diff > 0 && startSlide > 0) {
        setCurrentSlide(startSlide - 1);
      } else if (diff < 0 && startSlide < results.length - 1) {
        setCurrentSlide(startSlide + 1);
      }
    }
  };

  // Обработка окончания свайпа
  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className={`
        min-h-screen absolute sm:relative inset-0 
        flex flex-col sm:my-0 sm:pt-0 my-18 pt-4 
        px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out
        ${isDarkMode ? "bg-[#141414] text-white" : "bg-white text-gray-900"}
        space-y-8 sm:space-y-6
      `}
    >
   

      {/* Заголовок и счетчик */}
      <div className=" sm:space-y-2 mb-4">
       <div className="flex">
        <h2 className="text-2xl px-3 sm:text-3xl font-bold mb-2">
          Самые подходящие ВУЗы для вас:
        </h2>
        <motion.button
        className="p-2 self-end mb-6 rounded-full transition-colors"
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
      </div>
        <div
          className={`ml-3 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs ${
            isDarkMode ? "bg-[#2d2d2d]" : "bg-gray-100"
          }`}
        >
          Выбрано: {selectedUniversities.length} / {maxSelections}
        </div>
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

      {/* Успешный результат */}
      {loadingStatus === "success" && results?.length > 0 && (
        <div className="relative">
          {/* Слайдер с карточками */}
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={() => setIsDragging(false)}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
                width: `${results.length * 100}%`,
              }}
            >
              {results.map((university, index) => (
                <div
                  key={`result-${index}`}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                >
                  <UniversityCard
                    {...university}
                    onSelect={handleSelectUniversity}
                    isSelected={selectedUniversities.some(
                      (u) =>
                        u.university === university.university &&
                        u.direction === university.direction
                    )}
                    isMaxSelected={
                      selectedUniversities.length >= maxSelections
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Индикаторы слайдов */}
          {results.length > 1 && (
            <div className="flex justify-center mt-4">
              {results.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 mx-1 rounded-full w-8 ${
                    index === currentSlide
                      ? isDarkMode
                        ? "bg-[#6e7bf2]"
                        : "bg-blue-600"
                      : isDarkMode
                      ? "bg-[#2d2d2d]"
                      : "bg-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          )}

          {/* Кнопки навигации */}
          {results.length > 1 && (
            <>
              <button
                className={`absolute top-1/2 left-2 transform -translate-y-1/2 z-10 p-2 rounded-full ${
                  currentSlide === 0
                    ? "opacity-50 cursor-not-allowed"
                    : isDarkMode
                    ? "bg-[#6e7bf2] hover:bg-[#5a67d8]"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white shadow-lg transition-all duration-200`}
                onClick={goToPrev}
                disabled={currentSlide === 0}
                aria-label="Предыдущий"
              >
                ‹
              </button>
              <button
                className={`absolute top-1/2 right-2 transform -translate-y-1/2 z-10 p-2 rounded-full ${
                  currentSlide === results.length - 1
                    ? "opacity-50 cursor-not-allowed"
                    : isDarkMode
                    ? "bg-[#6e7bf2] hover:bg-[#5a67d8]"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white shadow-lg transition-all duration-200`}
                onClick={goToNext}
                disabled={currentSlide === results.length - 1}
                aria-label="Следующий"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}

      {/* Нет рекомендаций */}
      {loadingStatus === "success" && (!results || results.length === 0) && (
        <div className="text-center text-gray-500">
          Нет рекомендаций по вашему профилю.
        </div>
      )}

      {/* Ошибка */}
      {loadingStatus === "error" && (
        <div className="text-center text-red-500">
          Ошибка загрузки данных. Попробуйте позже.
        </div>
      )}
    </div>
  );
};