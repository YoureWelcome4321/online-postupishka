import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { FaTasks, FaTrashAlt } from "react-icons/fa";
import { useState, useContext, useNavigate, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegPenToSquare } from "react-icons/fa6";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";


export default function Profile({ onClose = () => {} }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showSubjectList, setShowSubjectList] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: "",
    email: "",
    class: "",
    username: "",
    subjects: [],
  });

  const [editableData, setEditableData] = useState({
    firstName: "",
    email: "",
    class: "",
    telegram: "",
    subjects: [{ subject: "Русский язык", currentScore: "", desiredScore: "" }],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://postupi.vubni.com/api/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const initialData = {
      firstName: profileData.first_name || "",
      email: profileData.email || "",
      class: profileData.class || "",
      telegram: profileData.username || "",
      subjects: profileData.subjects?.length
        ? profileData.subjects.map((s) => ({
            ...s,
            currentScore: String(s.currentScore),
            desiredScore: String(s.desiredScore),
          }))
        : [{ subject: "Русский язык", currentScore: "", desiredScore: "" }],
    };
    setEditableData(initialData);
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...editableData.subjects];
    newSubjects[index][field] = value;
    setEditableData((prev) => ({ ...prev, subjects: newSubjects }));
  };

  const handleDeleteSubject = (index) => {
    const newSubjects = editableData.subjects.filter((_, i) => i !== index);
    setEditableData((prev) => ({ ...prev, subjects: newSubjects }));
  };

  const handleAddSubject = (subject) => {
    if (subject.includes("Математика")) {
      const filteredSubjects = editableData.subjects.filter(
        (s) => !s.subject.includes("Математика")
      );
      setEditableData((prev) => ({
        ...prev,
        subjects: [
          ...filteredSubjects,
          { subject, currentScore: "", desiredScore: "" },
        ],
      }));
    } else {
      if (!editableData.subjects.some((s) => s.subject === subject)) {
        setEditableData((prev) => ({
          ...prev,
          subjects: [
            ...prev.subjects,
            { subject, currentScore: "", desiredScore: "" },
          ],
        }));
      }
    }
    setShowSubjectList(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/sign";
  };

  return (

    <motion.div
      className={`absolute mt-16 inset-0 sm:relative sm:mx-auto sm:my-8 sm:w-[50%] sm:rounded-xl transition-all duration-300 ${
        isDarkMode ? "bg-[#141414] text-white" : "bg-white text-gray-900"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Заголовок профиля */}
      
      <div className="p-4 sm:p-6 flex justify-between items-center border-b sm:border-none">
        <h1 className={`text-xl sm:text-2xl font-bold ${
        isDarkMode ? " text-[#fff]" : "text-[#363e45]"
      }`}>Профиль</h1>
        <div className="flex space-x-3 sm:space-x-5 text-blue-600">
          {/* Кнопка редактирования */}
          {isEditing ? (
            <motion.button
              className="flex items-center p-2 text-blue-600 rounded-lg transition-all hover:bg-opacity-80"
              onClick={() => setIsEditing(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke={isDarkMode ? "#4ade80" : "#3371fc"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Сохранить
            </motion.button>
          ) : (
            <motion.button
              className={`flex items-center p-2 rounded-lg ${
                isDarkMode ? "text-[#6e7bf2]" : "text-blue-600"
              } transition-all hover:bg-opacity-80`}
              onClick={() => setIsEditing(true)}
            >
              <FaRegPenToSquare
                className={`text-lg mr-2 sm:text-xl ${
                  isDarkMode ? "text-[#6e7bf2]" : "text-blue-600"
                }`}
              />
              Изменить
            </motion.button>
          )}
          {/* Кнопка закрытия */}
          <motion.button
            className="p-2 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
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
      </div>

      {/* Основной контент */}
      <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[80vh] sm:max-h-none">
        {/* Личные данные */}
        <div className="space-y-4">
          {/* Имя */}
          <div>
            <label
              htmlFor="firstName"
              className="text-base sm:text-lg font-medium block mb-2"
            >
              Имя
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={editableData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Имя пользователя"
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-base sm:text-lg font-medium block mb-2"
            >
              Электронная почта
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editableData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Email"
              disabled={!isEditing}
            />
          </div>

          {/* Класс */}
          <div>
            <label
              htmlFor="class"
              className="text-base sm:text-lg font-medium block mb-2"
            >
              Класс
            </label>
            <input
              type="number"
              id="class"
              name="class"
              value={editableData.class}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Класс"
              disabled={!isEditing}
            />
          </div>

          {/* Telegram */}
          <div>
            <label
              htmlFor="telegram"
              className="text-base sm:text-lg font-medium block mb-2"
            >
              Телеграм
            </label>
            <div className="relative">
              <input
                type="text"
                id="telegram"
                name="telegram"
                value={editableData.telegram}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                placeholder="Telegram аккаунт"
                disabled={!isEditing}
              />
              {isEditing && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 dark:bg-gray-700"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(editableData.telegram);
                      alert("Telegram-код скопирован!");
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    viewBox="0 0 20 20"
                    fill={isDarkMode ? "#94a3b8" : "#64748b"}
                  >
                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm2 0h8a1 1 0 011 1v7a1 1 0 01-1 1H6a1 1 0 110-2V7a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Предметы ЕГЭ */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold">Предметы ЕГЭ</h2>
            {isEditing && (
              <button
                className="text-sm sm:text-base bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                onClick={() => setShowSubjectList(!showSubjectList)}
              >
                + Добавить предмет
              </button>
            )}
          </div>

          {/* Список добавления предметов */}
          {showSubjectList && (
            <div className="space-y-2 mb-4">
              {[
                "Математика (база)",
                "Математика (профиль)",
                "Информатика",
                "Физика",
                "Химия",
                "Биология",
                "Литература",
                "История",
                "Обществознание",
              ].map((subject) => {
                const hasMath = editableData.subjects.some((s) =>
                  s.subject.includes("Математика")
                );
                if (subject.includes("Математика")) {
                  const currentMath = editableData.subjects.find((s) =>
                    s.subject.includes("Математика")
                  );
                  if (currentMath && currentMath.subject === subject) return null;
                }
                return (
                  <button
                    key={subject}
                    className={`w-full px-3 py-2 rounded-lg text-left transition-colors ${
                      isDarkMode
                        ? "hover:bg-gray-700 text-gray-300"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => {
                      handleAddSubject(subject);
                      if (!isEditing) setIsEditing(true);
                    }}
                    disabled={
                      subject === "Русский язык" &&
                      editableData.subjects.some(
                        (s) => s.subject === "Русский язык"
                      )
                    }
                  >
                    {subject}
                    {subject === "Русский язык" && (
                      <span className="ml-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        (обязательный)
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Список текущих предметов */}
          <div className="space-y-4">
            {editableData.subjects.map((subj, index) => {
              const isRequired = subj.subject === "Русский язык";
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    isDarkMode
                      ? "border-[#d1d5dc] bg-gray-800"
                      : "border-[#d1d5dc] bg-white"
                  } border`}
                >
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">{subj.subject}</p>
                      {isRequired && (
                        <svg
                          className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500 dark:text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex space-x-4 mt-3 ">
                      <input
                        type="number"
                        placeholder="Текущий балл"
                        value={subj.currentScore}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            value === "" ||
                            (Number(value) >= 0 && Number(value) <= 100)
                          ) {
                            handleSubjectChange(index, "currentScore", value);
                          }
                        }}
                        className={`w-40 px-3 py-1 rounded border ${
                          isDarkMode
                            ? "border-[#d1d5dc] bg-gray-800 text-white"
                            : "border-[#d1d5dc] bg-white text-black"
                        }`}
                        disabled={!isEditing}
                        min="0"
                        max="100"
                      />
                      <input
                        type="number"
                        placeholder="Желаемый балл"
                        value={subj.desiredScore}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (
                            value === "" ||
                            (Number(value) >= 0 && Number(value) <= 100)
                          ) {
                            handleSubjectChange(index, "desiredScore", value);
                          }
                        }}
                        className={`w-40 px-3 py-1 rounded border ${
                          isDarkMode
                            ? "border-[#d1d5dc] bg-gray-800 text-white"
                            : "border-[#d1d5dc] bg-white"
                        }`}
                        disabled={!isEditing}
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                  {!isRequired && isEditing && (
                    <button onClick={() => handleDeleteSubject(index)}>
                      <FaTrashAlt
                        className={`text-lg sm:text-xl ${
                          isDarkMode ? "text-blue-500" : "text-blue-600"
                        }`}
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Кнопка выхода */}
        <motion.button
          className="float-right flex items-center justify-center p-3 sm:p-2 rounded-lg transition-colors mb-4 sm:mb-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          style={{
            background: isDarkMode
              ? "linear-gradient(145deg, #1e293b 0%, #334155 100%)"
              : "linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)",
          }}
        >
          <IoIosLogOut className="mr-2 text-md sm:text-md" />
          <span className="text-md sm:text-md font-medium">
            Выйти из аккаунта
          </span>
        </motion.button>
      </div>
        
    </motion.div>
     
  );
}