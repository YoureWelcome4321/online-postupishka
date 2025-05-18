import React, { useState ,useContext} from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import { useSwipeable } from "react-swipeable";

const Schedule = ({onClose = () => {}}) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); 
  const { isDarkMode } = useContext(ThemeContext);


  const allSchedule = [
    {
      week: 12,
      info: [
        {
          day_in_month: 12,
          schedule: [
            {
              time_start: "14:00",
              time_stop: "16:00",
              name: "Математика",
              description: "Подготовка к ЕГЭ"
            },
            {
              time_start: "16:30",
              time_stop: "18:00",
              name: "Физика",
              description: "Решение задач по кинематике"
            }
          ]
        },
        {
          day_in_month: 13,
          schedule: [
            {
              time_start: "15:00",
              time_stop: "17:00",
              name: "История",
              description: "Повтор темы: Вторая мировая война"
            }
          ]
        },
        {
          day_in_month: 14,
          schedule: []
        },
        {
          day_in_month: 15,
          schedule: [
            {
              time_start: "10:00",
              time_stop: "11:30",
              name: "Английский язык",
              description: "Грамматика"
            }
          ]
        },
        {
          day_in_month: 16,
          schedule: []
        },
        {
          day_in_month: 17,
          schedule: [
            {
              time_start: "11:00",
              time_stop: "12:30",
              name: "Химия",
              description: "Лабораторная работа"
            }
          ]
        },
        {
          day_in_month: 18,
          schedule: []
        }
      ]
    }
  ];

  const handleNextDay = () => {
    setSelectedDayIndex((prev) => (prev + 1) % 7);
  };

  const handlePrevDay = () => {
    setSelectedDayIndex((prev) => (prev - 1 + 7) % 7);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextDay,
    onSwipedRight: handlePrevDay,
    trackMouse: true,
  });

  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];

  const currentWeek = allSchedule[0]; 

  return (
    <motion.div
      {...swipeHandlers}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`absolute mt-18 z-10 inset-0 sm:relative sm:mx-auto rounded-xl p-6 ${isDarkMode ? "bg-[#141414]" : "bg-[#f6f6f6]"} shadow-md`}
    >
     <div className="flex items-center mb-5">
      <h2 className={`text-2xl font-semibold  ${isDarkMode ? "text-white" : "text-[#363e45]"}`}>
        Расписание
      </h2>

      <motion.button
        className="flex p-2 ml-auto items-center mt-2 rounded-full transition-colors"
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

      <div className="flex justify-between  mb-6">
        {currentWeek.info.map((dayData, index) => {
          const dayName = daysOfWeek[index % 7]; 
          const dayNumber = dayData.day_in_month;

          return (
           <div key={index}>
            <span className="flex mb-2 text-xs justify-center">{dayName}</span>
            <button
              onClick={() => setSelectedDayIndex(index)}
              className={`w-10 h-10 flex flex-col items-center justify-center rounded-full transition-all ${
                selectedDayIndex === index
                  ? isDarkMode ? "bg-[#3d37f0] text-white" : "bg-blue-600 text-white"
                  : isDarkMode ? "bg-[#222222] text-white" : "bg-white text-[#363e45]"
              }`}
            >
              <span className="text-lg font-medium">{dayNumber}</span>
            </button>
           </div>
          );
        })}
      </div>

      {/* Расписание на выбранный день */}
      <div>
        <h3 className={`text-lg font-semibold mb-3 ${isDarkMode ? "text-white" : "text-[#363e45]"}`}>
          {daysOfWeek[selectedDayIndex]}, {currentWeek.info[selectedDayIndex]?.day_in_month} число
        </h3>

        {currentWeek.info[selectedDayIndex]?.schedule?.length > 0 ? (
          <ul className="space-y-2">
            {currentWeek.info[selectedDayIndex].schedule.map((lesson, index) => (
              <li
                key={index}
                className={`p-3 rounded-lg ${isDarkMode ? "bg-[#222222] text-white" : "bg-white text-[#363e45]"}`}
              >
                <strong>{lesson.time_start} – {lesson.time_stop}</strong>
                <br />
                {lesson.name} — {lesson.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Занятий нет</p>
        )}
      </div>

      {/* Кнопка добавления занятия */}
      <button className={`mt-6 w-full py-2 ${isDarkMode ? "bg-[#3d37f0]":  "bg-blue-600 hover:bg-blue-700"} text-white rounded-lg transition-colors`}>
        Добавить занятие
      </button>
    </motion.div>
  );
};

export default Schedule;