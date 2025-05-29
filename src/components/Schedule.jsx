import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import { useSwipeable } from "react-swipeable";
import axios from "axios";

const Schedule = ({ onClose = () => {} }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const { isDarkMode } = useContext(ThemeContext);
  const [editing, setEditing] = useState(false);

  const [userSchedule, setUserSchedule] = useState({
    content: "",
  });

  const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  const dayNamesFull = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье"
  ];

  // Получаем текущую дату
  const today = new Date();

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i - ((today.getDay() + 6) % 7));
    return date;
  });

  const adjustedToday = (today.getDay() + 6) % 7;


  const initialDays = weekDates.map(date => ({
    day_in_month: date.getDate(),
    schedule: [],
  }));

  const [allSchedule, setAllSchedule] = useState([
    {
      week: 1,
      info: [...initialDays],
    },
  ]);

  const currentWeek = allSchedule[0];

  // Устанавливаем текущий день при монтировании
  useEffect(() => {
    setSelectedDayIndex(adjustedToday);
  }, []);

  // Для свайпов
  const handleNextDay = () => setSelectedDayIndex((prev) => (prev + 1) % 7);
  const handlePrevDay = () => setSelectedDayIndex((prev) => (prev - 1 + 7) % 7);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextDay,
    onSwipedRight: handlePrevDay,
    trackMouse: true,
  });

  // Загрузка расписания с сервера
  const handleGetSchedule = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.online-postupishka.ru/schedule ",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.length > 0) {
        const updatedSchedule = [...initialDays];

        response.data.forEach((week) => {
          week.info.forEach((dayData) => {
            const dayIndexFromServer = dayData.day - 1; // 1 = ПН → index 0
            if (updatedSchedule[dayIndexFromServer]) {
              updatedSchedule[dayIndexFromServer].schedule = dayData.schedule || [];
            }
          });
        });

        setAllSchedule([{ week: 1, info: updatedSchedule }]);
      }
    } catch (error) {
      console.error("Ошибка загрузки расписания:", error);
    }
  };

  // Отправка пользовательского расписания
  const handleSendSchedule = async () => {
    try {
      const token = localStorage.getItem("token");

      const fullContent = `${userSchedule.content} в ${
        dayNamesFull[selectedDayIndex]}`; 

      await axios.post(
        "https://api.online-postupishka.ru/schedule ",
        { content: fullContent },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      handleGetSchedule();
      setEditing(false);
    } catch (error) {
      console.error("Ошибка отправки расписания:", error);
    }
  };

  useEffect(() => {
    handleGetSchedule();
  }, []);

  return (
    <motion.div
      {...swipeHandlers}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`absolute my-18 min-[1025px]:my-6 min-[1025px]:mr-auto min-[1025px]:w-[30%] min-[1025px]:max-w-lg z-10 inset-0 min-[1025px]:relative rounded-xl p-6 ${
        isDarkMode ? "bg-[#141414]" : "bg-[#f6f6f6] sm:bg-[#fff]"
      } shadow-md`}
    >
      <div className="flex items-center mb-5">
        <h2
          className={`text-2xl font-semibold ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Расписание:
        </h2>

        <motion.button
          className="p-2 min-[1025px]:hidden ml-auto rounded-full transition-colors"
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

      {/* Кнопки дней */}
      <div className="flex justify-between mb-6">
        {daysOfWeek.map((dayName, index) => {
          const dayNumber = initialDays[index].day_in_month;

          return (
            <div key={index} className="flex flex-col items-center">
              <span className="mb-2 text-xs">{dayName}</span>
              <button
                onClick={() => setSelectedDayIndex(index)}
                className={`cursor-pointer w-10 h-10 flex flex-col items-center justify-center rounded-full transition-all ${
                  selectedDayIndex === index
                    ? isDarkMode
                      ? "bg-[#3d37f0] text-white"
                      : "bg-blue-600 text-white"
                    : isDarkMode
                    ? "bg-[#222222] text-white"
                    : "bg-white sm:bg-[#f6f6f6] text-[#363e45]"
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
        <h3
          className={`text-lg font-semibold mb-3 ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {daysOfWeek[selectedDayIndex]},{" "}
          {currentWeek?.info?.[selectedDayIndex]?.day_in_month ||
            initialDays[selectedDayIndex].day_in_month}{" "}
          число
        </h3>

        {currentWeek?.info?.[selectedDayIndex]?.schedule?.length > 0 ? (
          <ul className="space-y-2">
            {currentWeek.info[selectedDayIndex].schedule.map((lesson, idx) => (
              <li
                key={idx}
                className={`p-3 rounded-lg ${
                  isDarkMode
                    ? "bg-[#222222] text-white"
                    : "bg-white sm:bg-[#f6f6f6] text-gray-800"
                }`}
              >
                <strong>
                  {lesson.time_start} – {lesson.time_stop}
                </strong>
                <br />
                {lesson.name}{" "}
                {lesson.description ? `— ${lesson.description}` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p className={` ${isDarkMode ? 'text-gray-200 ' : 'text-gray-800'}`}>Занятий нет</p>
        )}
      </div>

      {/* Кнопки управления */}
      {editing ? (
        <button
          className={`cursor-pointer mt-6 w-full py-2 ${
            isDarkMode ? "bg-[#3d37f0]" : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-lg transition-colors`}
          onClick={() => {
            handleSendSchedule();
            setEditing(false);
          }}
        >
          Отправить занятия
        </button>
      ) : (
        <button
          className={`cursor-pointer mt-6 w-full py-2 ${
            isDarkMode ? "bg-[#3d37f0]" : "bg-blue-600 hover:bg-blue-700"
          } text-white rounded-lg transition-colors`}
          onClick={() => setEditing(true)}
        >
          Добавить занятие
        </button>
      )}

      {/* Поле ввода с подсказкой о дне */}
      {editing && (
        <div className="my-4 w-full">
          <label
            htmlFor="scheduleInput"
            className= {`block text-sm font-medium mb-4 ${isDarkMode ? 'text-gray-200 ' : 'text-gray-800'}`}
          >
            Напишите свои занятия на день — настроим расписание под вас
          </label>

          <div
            className={`border-l-4 pl-3 mb-2 ${
              isDarkMode ? "border-blue-500" : "border-blue-600"
            }`}
          >
            <span className="text-sm font-medium">
              День: {dayNamesFull[selectedDayIndex]}
            </span>
          </div>

          <textarea
            value={userSchedule.content}
            onChange={(e) =>
              setUserSchedule({
                content: e.target.value,
              })
            }
            id="scheduleInput"
            placeholder="Ваши занятия на сегодня..."
            rows={4}
            className={`w-full px-4 py-3 rounded-lg ${isDarkMode ? 'bg-[#222222]' : 'bg-[#fff] min-[1025px]:bg-[#f6f6f6]'} text-white placeholder-gray-500 
                     border border-transparent focus:border-blue-500 focus:outline-none 
                     shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 resize-y`}
          />
        </div>
      )}
    </motion.div>
  );
};

export default Schedule;