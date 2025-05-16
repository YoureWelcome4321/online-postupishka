import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import axios from "axios";

const UniversityCard = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDirection, setSelectedDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState({
    university: "",
    direction: "",
    scores: { 
      min: 0,
      bud: 0,
      avg: 0 
    },
  });

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

  ])
  const [selectedUniversities, setSelectedUniversities] = useState([]);


  useEffect(() => {
    if (results.length > 0) {
      updateSelectedUniversity();
    }
  }, [currentSlide, selectedDirection, results]);

  const updateSelectedUniversity = () => {
    const university = results[currentSlide];
    const direction = university.directions[selectedDirection];
    setSelectedUniversity({
      university: university.university,
      direction: direction.name,
      scores: direction.scores,
    });
  };

  // Проверка лимита выбора
  const isLimitReached = selectedUniversities.length >= 5;

  // Обработка выбора направления
  const handleDirectionClick = (index) => {
    setSelectedDirection(index);
  };

  // Отправка данных на сервер
  const handleSendUniversity = async () => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      await axios.post(
        "https://api.online-postupishka.ru/university/add",
        selectedUniversity,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          } 
        }
      );
      /* console.log(selectedUniversity)
      console.log('Все ок') */
    } catch (error) {
      console.error("Ошибка отправки данных:", error);
      alert("Не удалось сохранить направление. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Основная функция сохранения
  const handleSaveUniversity = () => {
    updateSelectedUniversity();
    
    if (isLimitReached) {
      return alert("Максимум 5 выбранных вузов!");
    }

    const isDuplicate = selectedUniversities.some(item => 
      item.university === selectedUniversity.university &&
      item.direction === selectedUniversity.direction
    );

    if (isDuplicate) {
      return alert("Этот вуз уже выбран!");
    }

    setSelectedUniversities(prev => [...prev, selectedUniversity]);
    handleSendUniversity(selectedUniversity);
  };


  return (
    
    
    <div className={`
      relative  w-full max-w-3xl mx-auto
      ${isDarkMode ? "bg-[#141414] text-white" : "bg-white text-gray-900"}
    `}>
      <div className="flex items-center">
      <div className={`
         px-3 py-1 rounded-full ml-3 w-[22%] text-center justify-center text-xs flex items-center
        ${isDarkMode ? 'bg-[#3d37f0]' : 'bg-blue-600'}
        text-white z-10
      `}>
        Выбрано: {selectedUniversities.length} 
      </div>
        <p className="ml-3 ">Выберите до 5 направлений, как цель для поступления</p>
      </div>


      

      <div className="slider-container overflow-hidden mt-5">
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
                <div className={`
                  px-4 py-3 relative
                  ${isDarkMode ? 'bg-[#3d37f0] text-white' : 'bg-blue-600 text-white'}
                `}>
                  <div className={`
                    absolute top-3 right-4 px-3 py-1 rounded-full text-xs flex items-center gap-1
                    ${university.information ? 'bg-green-500' : 'bg-red-500'}
                  `}>
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

                <div className={`
                  p-4 space-y-4
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}>
                  {/* Особенности университета */}
                  <div className="space-y-2">
                    <h4 className={`
                      text-sm font-medium
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                    `}>
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
                    <h4 className={`
                      text-sm font-medium
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                    `}>
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
                              : isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-100'
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
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {['min', 'avg', 'bud'].map((key) => (
                      <div 
                        key={key}
                        className={`
                          rounded-lg p-3 text-center
                          ${isDarkMode ? 'bg-[#6e7bf2] text-white' : 'bg-blue-100 text-blue-800'}
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

                  <div className={`
                    mt-4 p-3 rounded-lg
                    ${isDarkMode ? 'bg-[#2d2d2d]' : 'bg-gray-50'}
                  `}>
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
                      ${selectedUniversities.some(item => 
                        item.university === selectedUniversity.university &&
                        item.direction === selectedUniversity.direction
                      ) && 'bg-green-600 hover:bg-green-700 cursor-default'}
                    `}
                    onClick={handleSaveUniversity}
                    disabled={
                      isSubmitting || 
                      selectedUniversities.some(item => 
                        item.university === selectedUniversity.university &&
                        item.direction === selectedUniversity.direction
                      )
                    }
                  >
                    {selectedUniversities.some(item => 
                      item.university === selectedUniversity.university &&
                      item.direction === selectedUniversity.direction
                    ) ? "Выбрано" : 
                      isSubmitting ? (
                        <div className="flex justify-center items-center">
                          <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Отправка...
                        </div>
                      ) : "Выбрать направление"
                    }
                  </button>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Кнопки навигации */}
        <button 
          className={`
            absolute text-2xl top-70 transform -translate-y-1/2 
            px-3 py-2 rounded-r focus:outline-none
            ${isDarkMode ? 'bg-[#6e7bf2] text-white hover:bg-[#2a25b0]' : 'bg-[#155dfc] text-white'}
            left-0
          `}
          onClick={() => {
            setCurrentSlide(prev => prev === 0 ? results.length - 1 : prev - 1);
            setSelectedDirection(0);
          }}
        >
          ‹
        </button>
        <button 
          className={`
            absolute text-2xl right-0 top-70 transform -translate-y-1/2 
            px-3 py-2 rounded-l focus:outline-none
            ${isDarkMode ? 'bg-[#6e7bf2] text-white hover:bg-[#2a25b0]' : 'bg-[#155dfc] text-white'}
          `}
          onClick={() => {
            setCurrentSlide(prev => (prev + 1) % results.length);
            setSelectedDirection(0);
          }}
        >
          ›
        </button>
      </div>

    
    </div>
  );
};

export default UniversityCard;