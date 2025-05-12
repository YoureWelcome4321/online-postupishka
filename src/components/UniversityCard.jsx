import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";

const UniversityCard = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [results] = useState([
    {
      university: "Московский государственный университет (МГУ)",
      directions: [
        { 
          name: "Прикладная математика",
          scores: { min: 270, avg: 310, bud: 340 },
          price: 150000
        },
        { 
          name: "Информатика",
          scores: { min: 260, avg: 300, bud: 330 },
          price: 160000
        }
      ],
      features: ["стипендии", "научные лаборатории", "международные программы"],
      information: true
    },
    {
      university: "Высшая школа экономики (ВШЭ)",
      directions: [
        { 
          name: "Экономика",
          scores: { min: 240, avg: 280, bud: 320 },
          price: 140000
        },
        { 
          name: "Data Science",
          scores: { min: 250, avg: 290, bud: 330 },
          price: 170000
        }
      ],
      features: ["стажировки", "современные кампусы", "гибкий график"],
      information: true
    }
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDirection, setSelectedDirection] = useState(0);
  const totalSlides = results.length;

  useEffect(() => {
    setSelectedDirection(0);
  }, [currentSlide]);

  const handleDirectionClick = (index) => {
    setSelectedDirection(index);
  };

  return (
    <div 
      className={`
        slider-container relative overflow-hidden w-full max-w-3xl mx-auto 
         ${isDarkMode ? "bg-[#141414] text-white" : "bg-white text-gray-900"}
      `}
    >
      <div 
        className="slides flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {results.map((university, index) => (
          <div key={index} className="w-full flex-shrink-0 px-4">
            <motion.div 
              className={`
                rounded-lg shadow-md overflow-hidden
                ${isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'}
              `}
              
            >
              {/* Баннер актуальности */}
              <div 
                className={`
                  px-4 py-3 relative
                  ${isDarkMode ? 'bg-[#3d37f0] text-white' : 'bg-blue-600 text-white'}
                `}
              >
                <div 
                  className={`
                    absolute top-3 right-4 px-3 py-1 rounded-full text-xs flex items-center gap-1
                    ${university.information 
                      ? 'bg-green-500' 
                      : 'bg-red-500'
                    }
                  `}
                >
                  {university.information ? (
                    <>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Актуальная информация
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Требуется проверка
                    </>
                  )}
                </div>
                <h3 className="text-lg font-bold mt-7">{university.university}</h3>
              </div>

              <div 
                className={`
                  p-4 space-y-4
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}
              >
                {/* Особенности университета */}
                <div className="space-y-2">
                  <h4 
                    className={`
                      text-sm font-medium
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                    `}
                  >
                    Особенности университета:
                  </h4>
                  <ul className="space-y-1">
                    {university.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs">
                        <svg 
                          className={`w-3 h-3 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path 
                            fillRule="evenodd" 
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                            clipRule="evenodd" 
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Направления */}
                <div className="space-y-2">
                  <h4 
                    className={`
                      text-sm font-medium
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                    `}
                  >
                    Направления:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {university.directions.map((dir, idx) => (
                      <span 
                        key={idx}
                        className={`
                          px-3 py-1 rounded-full text-xs cursor-pointer
                          ${selectedDirection === idx 
                            ? isDarkMode ? 'bg-[#3d37f0]' : 'bg-[#dbeafe]'
                            : isDarkMode 
                              ? 'bg-[#2d2d2d]' 
                              : 'bg-gray-100'
                          }
                          ${isDarkMode && 'text-white'}
                        `}
                        onClick={() => handleDirectionClick(idx)}
                      >
                        {dir.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Информация о направлении */}
                <div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {['min', 'avg', 'bud'].map((key) => (
                      <div 
                        key={key} 
                        className={`
                          rounded-lg p-3 text-center
                          ${isDarkMode 
                            ? 'bg-[#6e7bf2] text-white' 
                            : 'bg-blue-100 text-blue-800'
                          }
                        `}
                      >
                        <div className="text-[10px] uppercase tracking-wider font-medium">
                          {key === 'min' && 'Мин. балл'}
                          {key === 'avg' && 'Ср. балл'}
                          {key === 'bud' && 'Бюджет'}
                        </div>
                        <div className="text-xl font-bold mt-1">
                          {university.directions[selectedDirection].scores[key]}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div 
                    className={`
                      mt-4 p-3 rounded-lg
                      ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'}
                    `}
                  >
                    <p className="text-sm">
                      Стоимость обучения: 
                      <span className="font-bold ml-2">
                        {university.directions[selectedDirection].price.toLocaleString()} ₽/год
                      </span>
                    </p>
                  </div>

                  <button 
                    className={`
                      w-full my-4 py-2 rounded-lg transition
                      ${isDarkMode 
                        ? 'bg-[#3d37f0] hover:bg-[#2a25b0] text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }
                    `}
                  >
                    Выбрать направление
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Кнопки навигации */}
      <button 
        className={`
          absolute  text-2xl top-1/2 transform -translate-y-1/2 
          px-3 py-2 rounded-r focus:outline-none
          ${isDarkMode 
            ? 'bg-[#6e7bf2] text-white hover:bg-[#2a25b0]' 
            : 'bg-[#155dfc] text-white'
          }
        `}
        onClick={() => setCurrentSlide(prev => prev === 0 ? totalSlides - 1 : prev - 1)}
      >
        ‹
      </button>
      <button 
        className={`
          absolute  text-2xl right-0 top-1/2 transform -translate-y-1/2 
          px-3 py-2 rounded-l focus:outline-none
          ${isDarkMode 
            ? 'bg-[#6e7bf2] text-white hover:bg-[#2a25b0]' 
            : 'bg-[#155dfc] text-white'
          }
        `}
        onClick={() => setCurrentSlide(prev => (prev + 1) % totalSlides)}
      >
        ›
      </button>
    </div>
  );
};

export default UniversityCard;