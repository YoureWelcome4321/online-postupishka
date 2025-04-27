import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { HiOutlineUserCircle, HiOutlineMail } from "react-icons/hi";
import { FaTasks, FaTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoDocumentOutline, IoAccessibilityOutline } from "react-icons/io5";
import { MdOutlinePsychologyAlt } from "react-icons/md";
import {
  CgSmileMouthOpen,
  CgSmileNeutral,
  CgSmileSad,
  CgGym,
} from "react-icons/cg";
import { PiSmileyAngry } from "react-icons/pi";
import { FaTelegramPlane } from "react-icons/fa";
import { ThemeContext } from "../ThemeContext";
import HeaderNoButton from "../components/HeaderNoButtons";

const HomePage = () => {
  const [showProfile, setShowProfile] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showSubjectList, setShowSubjectList] = useState(false);
  const [loading, setLoading] = useState("Загрузка");

  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    firstName: "",
    email: "",
    class: "",
    username: "",
    subjects: [],
  });
  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...editableData.subjects];
    newSubjects[index][field] = value;
    setEditableData((prev) => ({ ...prev, subjects: newSubjects }));
  };

  const handleDeleteSubject = (index) => {
    const newSubjects = editableData.subjects.filter((_, i) => i !== index);
    setEditableData((prev) => ({ ...prev, subjects: newSubjects }));
  };

  // В обработчике добавления предмета
  const handleAddSubject = (subject) => {
    if (subject.includes("Математика")) {
      // Удаляем все предыдущие математики
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
      // Обычное добавление других предметов
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

  const [editableData, setEditableData] = useState(profileData);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://postupi.vubni.com/api/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfileData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
      alert(`Ошибка: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  console.log(profileData);

  useEffect(() => {
    setEditableData(profileData);
  }, [profileData]);

  // Загрузка при монтировании
  useEffect(() => {
    getUser();
  }, []);

  // Обработчики изменений
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // В useEffect добавьте проверку user
  useEffect(() => {
    const initialData = {
      firstName: profileData.first_name || "",
      email: profileData.email || "",
      class: profileData.class || "",
      telegram: profileData.username || "",
      subjects: profileData.subjects || [
        {
          subject: "Русский язык",
          currentScore: "",
          desiredScore: "",
        },
      ],
    };
    setEditableData(initialData);
  }, [profileData]);

  return (
    <div>
      <HeaderNoButton />
      <div className="bg-[#f6f6f6] flex">
        {/* Основное содержимое */}
        <motion.div
          className="container max-w-sm   p-6 bg-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <>
            <header className="p-0">
              <h1 className="text-2xl pl-2 font-bold">
                Здравствуйте, {profileData.first_name}!
              </h1>
              <p className="text-lg text-[#363e45] pl-2">
                Как Ваше настроение сегодня?
              </p>
              <div className="flex justify-around mt-4 ">
                <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                  <CgSmileMouthOpen />
                </button>
                <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                  <CgSmileNeutral />
                </button>
                <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                  <CgSmileSad />
                </button>
                <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                  <PiSmileyAngry />
                </button>
              </div>
            </header>

            {/* Меню из Header */}
            <nav className="mt-6 space-y-4">
              <button
                onClick={() => setShowProfile(true)}
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <HiOutlineUserCircle className="mr-2 text-xl" />
                Личный кабинет
              </button>
              <Link
                to="/trainers"
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <CgGym className="mr-2 text-xl" />
                Тренажёры
              </Link>
              <Link
                to="/psychologist"
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <MdOutlinePsychologyAlt className="mr-2 text-xl" />
                Психолог
              </Link>
              <Link
                to="/schedule"
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <FaTasks className="mr-2 text-xl" />
                Помощь с расписанием
              </Link>
              <Link
                to="/specialties"
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <IoAccessibilityOutline className="mr-2 text-xl" />
                Подбор специальности
              </Link>
              <Link
                to="/materials"
                className="flex items-center py-2 hover:bg-gray-100 dark:hover:bg-[#dbeafe] p-2 hover:text-[#193cb8] transition-all  rounded-lg"
              >
                <IoDocumentOutline className="mr-2 text-xl" />
                Полезные материалы для поступления
              </Link>
            </nav>
          </>
        </motion.div>
        {/* Отображение Profile */}
        {showProfile && (
      <motion.div
            className={`mx-10 mt-2 rounded-lg w-[50%] p-6 transition-all duration-300 ${
              isDarkMode ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-800"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Заголовок профиля */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Профиль</h1>
              <div className="flex space-x-4">
                {/* Кнопка редактирования */}
                {isEditing ? (
                  <motion.button
                    className={`p-2 text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setIsEditing(false);
                      console.log("Сохраненные данные:", editableData);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.button>
                ) : (
                  <motion.button
                    className={`flex items-center p-2 text-blue-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsEditing(true)}
                  >
                    <FaRegPenToSquare className="flex text-xl items-center mr-1" />
                    Изменить
                  </motion.button>
                )}

                {/* Кнопка закрытия */}
                <motion.button
                  className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowProfile(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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

            {/* Контент профиля */}
            <div className="mt-6 space-y-6">
              {/* Личные данные */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Личные данные</h2>
                <div className="space-y-4">
                  {/* Имя */}
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      Имя
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={editableData.firstName}
                      onChange={handleChange}
                      className={`px-4 py-2 border rounded-md w-full ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-800 text-white"
                          : "border-gray-300"
                      }`}
                      placeholder="Имя пользователя"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium">
                      Электронная почта
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editableData.email}
                      onChange={handleChange}
                      className={`px-4 py-2 border rounded-md w-full ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-800 text-white"
                          : "border-gray-300"
                      }`}
                      placeholder="Email"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Класс */}
                  <div className="flex flex-col">
                    <label htmlFor="class" className="text-sm font-medium">
                      Класс
                    </label>
                    <input
                      type="number"
                      id="class"
                      name="class"
                      value={editableData.class}
                      onChange={handleChange}
                      className={`px-4 py-2 border rounded-md w-full ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-800 text-white"
                          : "border-gray-300"
                      }`}
                      placeholder="Класс"
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Telegram */}
                  <div className="flex flex-col">
                    <label htmlFor="telegram" className="text-sm font-medium">
                      Телеграм
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="telegram"
                        name="telegram"
                        value={editableData.telegram}
                        onChange={handleChange}
                        className={`px-4 py-2 border rounded-md w-full ${
                          isDarkMode
                            ? "border-gray-600 bg-gray-800 text-white"
                            : "border-gray-300"
                        }`}
                        placeholder="Telegram аккаунт"
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <button
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800 rounded-full p-2 focus:outline-none"
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(
                                editableData.telegram
                              );
                              alert("Telegram-код скопирован!");
                            }
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
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
                  {/* Предметы ЕГЭ */}
                  <div>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                      Предметы ЕГЭ
                      {isEditing && (
                        <button
                          className="ml-3 bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors"
                          onClick={() => setShowSubjectList(!showSubjectList)}
                        >
                          + Добавить предмет
                        </button>
                      )}
                    </h2>

                    {showSubjectList && (
                      <div className="absolute mt-2 w-64 bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-10">
                        {[
                          "Русский язык",
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

                          // Новая логика отображения
                          if (subject.includes("Математика")) {
                            const currentMath = editableData.subjects.find(
                              (s) => s.subject.includes("Математика")
                            );

                            // Показываем только противоположную математику
                            if (
                              currentMath &&
                              currentMath.subject === subject
                            ) {
                              return null;
                            }
                          }

                          return (
                            <button
                              key={subject}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                  (обязательный)
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <div className="space-y-4">
                      {editableData.subjects.map((subj, index) => {
                        const isRequired = subj.subject === "Русский язык";
                        const isMath = subj.subject.includes("Математика");

                        return (
                          <div
                            key={index}
                            className={`flex items-center justify-between border p-3 rounded-lg ${
                              isRequired
                                ? "border-blue-500 dark:border-blue-600"
                                : isMath
                                ? "border-yellow-500 dark:border-yellow-600"
                                : ""
                            }`}
                          >
                            <div>
                              <p className="font-medium flex items-center">
                                {subj.subject}
                                {isRequired && (
                                  <svg
                                    className="ml-2 w-4 h-4 text-blue-500 dark:text-blue-400"
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
                              </p>
                              <div className="flex space-x-4 mt-2">
                                <input
                                  type="number"
                                  placeholder="Текущий балл"
                                  value={subj.currentScore}
                                  onChange={(e) =>
                                    handleSubjectChange(
                                      index,
                                      "currentScore",
                                      e.target.value
                                    )
                                  }
                                  className={`px-3 py-1 border rounded ${
                                    isDarkMode
                                      ? "bg-gray-800 text-white"
                                      : "bg-white"
                                  }`}
                                  disabled={!isEditing}
                                />
                                <input
                                  type="number"
                                  placeholder="Желаемый балл"
                                  value={subj.desiredScore}
                                  onChange={(e) =>
                                    handleSubjectChange(
                                      index,
                                      "desiredScore",
                                      e.target.value
                                    )
                                  }
                                  className={`px-3 py-1 border rounded ${
                                    isDarkMode
                                      ? "bg-gray-800 text-white"
                                      : "bg-white"
                                  }`}
                                  disabled={!isEditing}
                                />
                              </div>
                            </div>
                            {!isRequired && isEditing && (
                              <button
                                onClick={() => handleDeleteSubject(index)}
                              >
                                <FaTrashAlt className="text-red-500 text-lg" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Кнопка выхода */}
                  <motion.button
                    className={`w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-full font-bold mt-6 shadow-lg ${
                      isDarkMode ? "shadow-red-900/50" : "shadow-red-200"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                  >
                    Выйти
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
