import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  HiOutlineUserCircle,
} from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import { IoAccessibilityOutline } from "react-icons/io5";
import { MdOutlinePsychologyAlt } from "react-icons/md";
import {
  CgSmileMouthOpen,
  CgSmileNeutral,
  CgSmileSad,
} from "react-icons/cg";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { PiSmileyAngry } from "react-icons/pi";
import { ThemeContext } from "../ThemeContext";
import HeaderNoButton from "../components/MainPageComponents/Header";
import Profile from "../components/ProfileComponents/Profile";
import Profession from "../components/Profession";
import Schedule from "../components/Schedule";
import Psychologist from "../components/Psychologist";
import SelectUniversity from "../components/materials/SelectUniversity";

const HomePage = () => {
  const [materials] = useState([
    {
      id: 1,
      title: "Какие документы нужны для поступления ?",
      description: "Расскажем о всех документах, которые могут понадобиться.",
    },
  ]);

  const [showProfile, setShowProfile] = useState(false);
  const [showSpecialties, setShowSpecialties] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showPsychologist, setShowPsychologist] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

  const [profileData, setProfileData] = useState({
    first_name: "",
    email: "",
    class: "",
    username: "",
    subjects: [],
  });

  const [universities, setUniversities] = useState([]);
  const [showAllUniversities, setShowAllUniversities] = useState(false);
  const [allInfo, seeAllInfo] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);

  // Загрузка данных профиля
  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.online-postupishka.ru/profile ",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProfileData(response.data);
    } catch (error) {
      console.error("Ошибка загрузки профиля:", error);
      alert(`Ошибка: ${error.response?.data?.message || error.message}`);
    }
  };

  // Загрузка целей (университетов)
  const getUniversities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        process.env.API + '/university',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUniversities(
        response.data.map((university, index) => ({
          ...university,
          id: index + 1,
        }))
      );
    } catch (error) {
      console.error("Ошибка загрузки целей:", error);
    }
  };

  // Отправка настроения в чат с психологом
  const sendMoodToPsychologist = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.online-postupishka.ru/psychologist ",
        {
          question: `Мое настроение сегодня: ${selectedMood}`,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!showPsychologist) {
        setShowPsychologist(true);
        setShowSchedule(false)
      }

      setSelectedMood(null)

      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Ошибка отправки настроения:", error);
    }

    
    
  };

  // Обработка выбора настроения
  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
  };

  useEffect(() => {
    getUser();
    getUniversities();
    const handleResize = () => {
      if (window.innerWidth >= 1025) {
        setShowSchedule(true);
      } else {
        setShowSchedule(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white"
          : "bg-[#f6f6f6] text-gray-800"
      }`}
    >
      <HeaderNoButton />
      <div
        className={`flex ${
          isDarkMode
            ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a]"
            : "bg-[#f6f6f6]"
        }`}
      >
        <motion.div
          className="min-[1025px]:min-h-screen  max-[1025px]:w-full p-6 bg-[#f6f6f6]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: isDarkMode ? "#141414" : "#fff",
          }}
        >
          <header className="mt-8 max-sm:mt-0 sm:w-full">
            <h1 className="text-2xl pl-2 font-bold">
              Здравствуйте, {profileData.first_name}!
            </h1>
            <p
              className={`text-lg  ${
                isDarkMode ? "text-white" : "text-[#363e45]"
              } pl-2`}
            >
              Как Ваше настроение сегодня?
            </p>

            {/* Кнопки настроения */}
            <div className="flex justify-around mt-4">
              {[
                { emoji: <CgSmileMouthOpen />, label: "Очень хорошо", value: "очень хорошо" },
                { emoji: <CgSmileNeutral />, label: "Нормально", value: "нормально" },
                { emoji: <CgSmileSad />, label: "Плохо", value: "плохо" },
                { emoji: <PiSmileyAngry />, label: "Очень плохо", value: "очень плохо" },
              ].map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelection(mood.value)}
                  className={`bg-gray-200 text-black  text-4xl cursor-pointer rounded-full p-2 transition-all ${
                    selectedMood === mood.value
                      ? "ring-2 ring-blue-500 scale-110"
                      : ""
                  }`}
                  aria-label={mood.label}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>

            {/* Вопрос после выбора настроения */}
            {selectedMood && (
              <div className="mt-6 text-center">
                <p className="text-lg mb-4">Хотите обсудить как проходит ваш день?</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={sendMoodToPsychologist}
                    className={`px-6 py-2 ${isDarkMode ? "bg-[#3d37f0] " : 'bg-blue-600 hover:bg-blue-700'} cursor-pointer text-white rounded-lg  transition`}
                  >
                    Да
                  </button>
                  <button
                    onClick={() => setSelectedMood(null)}
                    className={`px-6  cursor-pointer py-2 rounded-lg transition ${
                      isDarkMode
                        ? "bg-[#222222] hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                    }`}
                  >
                    Нет
                  </button>
                </div>
              </div>
            )}
          </header>

          <nav className="my-8 min-h-1.5 space-y-4 max-[1025px]:hidden">
            <button
              onClick={() => {
                setShowProfile(true);
                setShowSpecialties(false);
                setShowSchedule(false);
                setShowPsychologist(false);
                setShowMaterials(false)
              }}
              className={`flex items-center py-2 w-full cursor-pointer ${
                isDarkMode
                  ? "hover:bg-gray-100 dark:hover:bg-[#6e7bf2]"
                  : "hover:bg-gray-100 dark:hover:bg-[#dbeafe] hover:text-[#193cb8]"
              } p-2 transition-all rounded-lg`}
            >
              <HiOutlineUserCircle onClose={getUser} className="mr-2 text-xl" />
              Личный кабинет
            </button>
            <button
              onClick={() => {
                setShowPsychologist(true);
                setShowProfile(false);
                setShowSpecialties(false);
                setShowSchedule(false);
                setShowMaterials(false)
              }}
              className={`  cursor-pointer flex items-center w-full py-2 p-2 ${
                isDarkMode
                  ? "hover:bg-gray-100 dark:hover:bg-[#6e7bf2]"
                  : "hover:bg-gray-100 dark:hover:bg-[#dbeafe] hover:text-[#193cb8]"
              } transition-all rounded-lg`}
            >
              <MdOutlinePsychologyAlt className="mr-2 text-xl" />
              Психолог
            </button>
            <button
              onClick={() => {
                setShowSpecialties(true);
                setShowProfile(false);
                setShowSchedule(false);
                setShowPsychologist(false);
                setShowMaterials(false)
              }}
              className={`flex items-center py-2 w-full cursor-pointer ${
                isDarkMode
                  ? "hover:bg-gray-100 dark:hover:bg-[#6e7bf2]"
                  : "hover:bg-gray-100 dark:hover:bg-[#dbeafe] hover:text-[#193cb8]"
              } p-2 transition-all rounded-lg`}
            >
              <IoAccessibilityOutline className="mr-2 text-xl" />
              Профориентация
            </button>
          </nav>
        </motion.div>

        {!showProfile && !showSpecialties && !showPsychologist && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl ml-auto p-6 max-[1026px]:hidden min-[1027px]:flex "
          >
            <div
              className={`rounded-xl sm:block p-6 ${
                isDarkMode ? "bg-[#141414]" : "bg-white"
              }`}
            >
              <div className="grid gap-8">
                {/* Цели */}
                <div>
                  <h2
                    className={`text-2xl font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Цели:
                  </h2>
                  {universities.length > 0 ? (
                    <ul className="space-y-4">
                      {universities.slice(0, 2).map((university) => (
                        <React.Fragment key={university.id}>
                          <li
                            onClick={() =>
                              seeAllInfo((prev) =>
                                prev === university.id ? "" : university.id
                              )
                            }
                            className={`cursor-pointer p-4 rounded-lg ${
                              isDarkMode
                                ? "bg-[#222222] text-white"
                                : "bg-gray-50 text-gray-800"
                            } shadow-sm`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <strong>{university.university}</strong>
                                <p className="text-sm">
                                  Напр: {university.direction}
                                </p>
                              </div>
                              <button type="button">
                                {university.id === allInfo ? (
                                  <SlArrowUp />
                                ) : (
                                  <SlArrowDown />
                                )}
                              </button>
                            </div>
                          </li>
                          {university.id === allInfo && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 1 }}
                              className={`p-4 rounded-lg mt-2 ${
                                isDarkMode
                                  ? "bg-[#222222] text-white"
                                  : "bg-white text-gray-800"
                              } shadow-md`}
                            >
                              <h3 className="text-lg font-semibold mb-3">
                                Баллы для направления: {university.direction}
                              </h3>
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div
                                  className={`p-2 rounded-md ${
                                    isDarkMode
                                      ? "bg-[#3d37f0]"
                                      : "bg-[#bedbff]"
                                  }`}
                                >
                                  <p className="text-sm">Мин. Балл</p>
                                  <p className="text-xl font-bold">
                                    {university.scores.min || "—"}
                                  </p>
                                </div>
                                <div
                                  className={`p-2 rounded-md ${
                                    isDarkMode
                                      ? "bg-[#3d37f0]"
                                      : "bg-[#bedbff]"
                                  }`}
                                >
                                  <p className="text-sm">Ср. Балл</p>
                                  <p className="text-xl font-bold">
                                    {university.scores.avg || "—"}
                                  </p>
                                </div>
                                <div
                                  className={`p-2 rounded-md ${
                                    isDarkMode
                                      ? "bg-[#3d37f0]"
                                      : "bg-[#bedbff]"
                                  }`}
                                >
                                  <p className="text-sm">Бюджет</p>
                                  <p className="text-xl font-bold">
                                    {university.scores.bud || "—"}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          setShowSpecialties(true);
                          setShowProfile(false);
                          setShowSchedule(false);
                          setShowPsychologist(false);
                          setShowMaterials(false)
                        }}
                        className={` cursor-pointer w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
                          isDarkMode
                            ? "bg-[#3d37f0] text-white"
                            : "bg-[#1556f5] text-white"
                        } transition-colors`}
                      >
                        <span>Добавить цель (Пройти тест)</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Баллы */}
                <div className="grid gap-1">
                  <h2
                    className={`text-2xl font-semibold mb-3 ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Ваши баллы:
                  </h2>
                  {profileData.subjects.map((subj) => (
                    <div
                      key={subj.subject}
                      className={`p-4 mb-3 rounded-xl shadow-md ${
                        isDarkMode ? "bg-[#222222]" : "bg-[#fff]"
                      }`}
                    >
                      <div className="flex items-center">
                        <p className="font-medium text-lg">{subj.subject}</p>
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
                      </div>
                      <div className="flex justify-center space-x-4 mt-3">
                        <h3>Текущий балл: {subj.current_score}</h3>
                        <h3>Желаемый балл: {subj.desired_score}</h3>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {setShowProfile(true),setShowSchedule(false)}}
                    className={`my-3 flex items-center text-center w-full py-2 justify-center cursor-pointer ${
                      isDarkMode
                        ? "bg-[#3d37f0]"
                        : "bg-[#155dfc] text-white hover:text-[#193cb8]"
                    } p-2 transition-all rounded-lg`}
                  >
                    Добавить/изменить предметы
                  </button>
                </div>

                {/* Полезные материалы */}
                <div>
                  <h2
                    className={`text-2xl font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Полезные материалы:
                  </h2>
                  <div className="space-y-4">
                    {materials.map((material) => (
                      <button
                        key={material.id}
                        onClick={() => {setShowMaterials(true);
                          setShowSpecialties(false);
                          setShowProfile(false);
                          setShowSchedule(false);
                          setShowPsychologist(false);}}
                        className={`cursor-pointer block p-4 rounded-lg ${
                          isDarkMode
                            ? "bg-[#222222] hover:bg-[#3d37f0]"
                            : "bg-white hover:bg-gray-50 shadow"
                        } transition-all`}
                      >
                        <h3 className="text-left text-lg font-medium">
                          {material.title}
                        </h3>
                        <p
                          className={`mt-1  text-left text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {material.description}
                        </p>
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-center my-5">
                      <p className={`mx-0 text-sm ${isDarkMode ? 'text-[#fff]' : "text-[#000]"}`}>Следите за обновлениями, здесь будет много интересного.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {showProfile && (
          <Profile
            onClose={() => {
              setShowProfile(false);
              if (window.innerWidth >= 1025) setShowSchedule(true);
            }}
          />
        )}
        {showSpecialties && (
          <Profession
            onClose={() => {
              setShowSpecialties(false);
              if (window.innerWidth >= 1025) setShowSchedule(true);
              getUniversities();
            }}
          />
        )}
        {showSchedule && (
          <Schedule
            onClose={() => {
              setShowSchedule(false);
              if (window.innerWidth >= 1025) setShowSchedule(true);
            }}
          />
        )}
        {showPsychologist && (
          <Psychologist
            onClose={() => {
              setShowPsychologist(false);
              if (window.innerWidth >= 1025) setShowSchedule(true);
            }}
          />
        )}

        {showMaterials && (
          <SelectUniversity onClose={() => {setShowMaterials(false);if (window.innerWidth >= 1025) setShowSchedule(true);}}/>
        )}
      </div>

      {/*Блок Цели */}
      {!showProfile && !showMaterials &&
        !showSpecialties &&
        !showSchedule &&
        !showPsychologist && (
          <>
            <motion.div
              className="pb-18 "
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className={`text-2xl ml-6 font-semibold my-3 ${
                  isDarkMode ? "text-white" : "text-[#000]"
                }`}
              >
                Цели:
              </h2>
              {universities.length > 0 && !showProfile && !showSpecialties ? (
                <div className="mt-6 ">
                  <ul className="space-y-3  w-[90%] mx-5">
                    {universities
                      .slice(0, showAllUniversities ? universities.length : 2)
                      .map((university) => (
                        <div key={university.id}>
                          <li
                            onClick={() => {
                              seeAllInfo((prev) =>
                                prev === university.id ? "" : university.id
                              );
                            }}
                            className={`flex ${
                              isDarkMode
                                ? "bg-[#222222] text-white"
                                : "bg-[#ffffff] text-gray-800"
                            } p-4 rounded-lg`}
                          >
                            {university.university} <br></br>Напр:{" "}
                            {university.direction}
                            <button className="mr-auto ">
                              {university.id === allInfo ? (
                                <SlArrowUp />
                              ) : (
                                <SlArrowDown />
                              )}
                            </button>
                          </li>
                          {university.id === allInfo && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 1 }}
                              className={`my-3 p-4 rounded-lg  ${
                                isDarkMode
                                  ? "bg-[#222222]  text-white"
                                  : "bg-white text-gray-800"
                              } shadow-md transition-all duration-300`}
                            >
                              <h3 className="text-lg font-semibold mb-3 flex items-center">
                                Баллы для направления: {university.direction}
                              </h3>

                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div
                                  className={`p-3 rounded-md ${
                                    isDarkMode ? "bg-[#3d37f0]" : "bg-[#bedbff]"
                                  }`}
                                >
                                  <p className="text-sm ">Мин. Балл</p>
                                  <p className="text-xl   font-bold">
                                    {university.scores.min || "—"}
                                  </p>
                                </div>

                                <div
                                  className={`p-3 rounded-md ${
                                    isDarkMode ? "bg-[#3d37f0]" : "bg-[#bedbff]"
                                  }`}
                                >
                                  <p className="text-sm ">Ср. Балл</p>
                                  <p className="text-xl  font-bold">
                                    {university.scores.avg || "—"}
                                  </p>
                                </div>

                                <div
                                  className={`p-3 rounded-md ${
                                    isDarkMode ? "bg-[#3d37f0]" : "bg-[#bedbff]"
                                  }`}
                                >
                                  <p className="text-sm ">Бюджет</p>
                                  <p className="text-xl   font-bold">
                                    {university.scores.bud || "—"}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}

                    {universities.length > 2 && (
                      <button
                        onClick={() =>
                          setShowAllUniversities(!showAllUniversities)
                        }
                        className={`mt-3 text-sm text-center font-medium ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        } hover:underline focus:outline-none`}
                      >
                        {showAllUniversities ? "Скрыть" : `Показать все цели`}
                      </button>
                    )}
                  </ul>
                </div>
              ) : (
                <div className=" flex justify-center min-[1025px]:hidden">
                  <button
                    onClick={() => {
                      setShowSpecialties(true), setShowProfile(false), setShowMaterials(false)
                    }}
                    className={`flex items-center mx-6 text-center w-full py-2 justify-center cursor-pointer ${
                      isDarkMode
                        ? "bg-[#3d37f0] "
                        : "bg-[#155dfc] hover:bg-[#200eb2] text-white "
                    } p-2 transition-all rounded-lg`}
                  >
                    Добавить цель (Пройти тест)
                  </button>
                </div>
              )}
              <div className="my-8 px-6   max-[1025px]hidden">
                <h2
                  className={`text-2xl font-semibold mb-4 ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  Ваши баллы:
                </h2>
                {profileData.subjects.map((subj) => {
                  return (
                    <div
                      key={subj.subject}
                      className={` p-4 mb-3  rounded-xl shadow-md ${
                        isDarkMode ? "bg-[#222222]" : "bg-[#fff]"
                      }`}
                    >
                      <div className="flex items-center">
                        <p className="font-medium text-lg">{subj.subject}</p>
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
                      </div>
                      <div className="">
                        <div className="flex justify-center space-x-4 mt-3 ">
                          <h3>Текущий балл: {subj.current_score}</h3>

                          <h3>Желаемый балл: {subj.desired_score}</h3>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={() => {
                    setShowProfile(true),
                    setShowSchedule(false)
                  }}
                  className={`my-3 flex items-center  text-center w-full py-2 justify-center cursor-pointer ${
                    isDarkMode
                      ? "bg-[#3d37f0] "
                      : "bg-[#155dfc] text-white "
                  } p-2 transition-all rounded-lg`}
                >
                  Добавить/изменить предметы
                </button>
              </div>

              <div className="my-8 px-6  mix-[1024px]:hidden">
                <h2
                  className={`text-2xl font-semibold mb-4 ${
                    isDarkMode ? "text-white" : "text-[#000]"
                  }`}
                >
                  Полезные материалы:
                </h2>

                <div className="space-y-4">
                    {materials.map((material) => (
                      <button
                        key={material.id}
                        onClick={() => {setShowMaterials(true);
                          setShowSpecialties(false);
                          setShowProfile(false);
                          setShowSchedule(false);
                          setShowPsychologist(false);}}
                        className={`w-full block p-4 rounded-lg ${
                          isDarkMode
                            ? "bg-[#222222] hover:bg-gray-700"
                            : "bg-white hover:bg-gray-50 shadow"
                        } transition-all`}
                      >
                        <h3 className="text-left text-lg font-medium">
                          {material.title}
                        </h3>
                        <p
                          className={`mt-1  text-left text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {material.description}
                        </p>
                      </button>
                    ))}
                  </div>
                  <div className="flex text-center justify-center my-5">
                      <p className={`mx-0 text-sm ${isDarkMode ? 'text-[#fff]' : "text-[#000]"}`}>Следите за обновлениями, здесь будет много интересного.</p>
                  </div>
              </div>
            </motion.div>
          </>
        )}

      {/* Мобильное меню */}
      <nav
        className={`fixed bottom-0 left-0 w-full z-100 shadow-lg min-[1025px]:hidden ${
          isDarkMode
            ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a]"
            : "bg-white"
        }`}
      >
        <div className="flex justify-around items-center py-4">
          <button
            onClick={() => {
              setShowPsychologist(true);
              setShowSchedule(false);
              setShowProfile(false);
              setShowSpecialties(false);
              setShowMaterials(false)
            }}
            className={`flex flex-col items-center ${
              isDarkMode ? "text-white" : "text-[#363e45]"
            } hover:text-blue-500`}
          >
            <MdOutlinePsychologyAlt size={24} />
            <span className="text-xs mt-1">Психолог</span>
          </button>
          <button
            onClick={() => {
              setShowSchedule(true);
              setShowProfile(false);
              setShowSpecialties(false);
              setShowPsychologist(false);
              setShowMaterials(false)
            }}
            className={`flex flex-col items-center ${
              isDarkMode ? "text-white" : "text-[#363e45]"
            } hover:text-blue-500`}
          >
            <FaTasks size={24} />
            <span className="text-xs mt-1">Расписание</span>
          </button>
          <button
            onClick={() => {
              setShowSpecialties(true);
              setShowProfile(false);
              setShowSchedule(false);
              setShowPsychologist(false);
              setShowMaterials(false)
            }}
            className={`flex flex-col items-center ${
              isDarkMode ? "text-white" : "text-[#363e45]"
            } hover:text-blue-500`}
          >
            <IoAccessibilityOutline size={24} />
            <span className="text-xs mt-1">Профориентация</span>
          </button>
          <button
            onClick={() => {
              setShowProfile(true);
              setShowSpecialties(false);
              setShowSchedule(false);
              setShowPsychologist(false);
              setShowMaterials(false)
            }}
            className={`flex flex-col items-center ${
              isDarkMode ? "text-white" : "text-[#363e45]"
            } hover:text-blue-500`}
          >
            <HiOutlineUserCircle size={24} />
            <span className="text-xs mt-1">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;