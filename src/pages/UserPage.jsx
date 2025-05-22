import React, { useState, useEffect, useContext, use } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import { IoAccessibilityOutline } from "react-icons/io5";
import { MdOutlinePsychologyAlt } from "react-icons/md";
import {
  CgSmileMouthOpen,
  CgSmileNeutral,
  CgSmileSad,
  CgGym,
} from "react-icons/cg";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { PiSmileyAngry } from "react-icons/pi";
import { ThemeContext } from "../ThemeContext";
import HeaderNoButton from "../components/HeaderNoButtons";
import Profile from "../components/Profile";
import Profession from "../components/Profession";
import Schedule from "../components/Schedule";
import Chat from "../components/Psychologist";
import Psychologist from "../components/Psychologist";

const HomePage = () => {
  const [materials] = useState([
    {
      id: 1,
      title: "Какие документы нужны для поступления",
      description: "Расскажем о всех документах, которые могут понадобиться.",
      link: "/materials/select-university",
    },
    {
      id: 2,
      title: "Эссе для поступления",
      description: "Советы по написанию мотивационного письма.",
      link: "/materials/essay",
    },
  ]);

  const [showProfile, setShowProfile] = useState(false);
  const [showSpecialties, setShowSpecialties] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showPsychologist, setShowPsychologist] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const [showAlert, setAlert] = useState(false);
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

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.online-postupishka.ru/profile",
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

  const getUniversities = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.online-postupishka.ru/university",
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

  useEffect(() => {
    getUser();
    getUniversities();
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
      {showAlert && <AreYouSure onClose={() => setAlert(false)} />}
      <div
        className={`flex ${
          isDarkMode
            ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a]"
            : "bg-[#f6f6f6]"
        }`}
      >
        <motion.div
          className="max-w-full sm:w-[35%] max-md:w-full p-6 bg-[#f6f6f6]"
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
            <div className="flex justify-around mt-4 ">
              <button
                className={`bg-gray-200  text-4xl cursor-pointer rounded-full p-2`}
              >
                <CgSmileMouthOpen className={`text-[#363e45]`} />
              </button>
              <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                <CgSmileNeutral className={`text-[#363e45]`} />
              </button>
              <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                <CgSmileSad className={`text-[#363e45]`} />
              </button>
              <button className="bg-gray-200 text-4xl cursor-pointer rounded-full p-2">
                <PiSmileyAngry className={`text-[#363e45]`} />
              </button>
            </div>
          </header>

          <nav className="my-8 min-h-1.5 space-y-4  max-sm:hidden">
            <button
              onClick={() => {
                setShowProfile(true);
                setShowSpecialties(false);
                setShowSchedule(false);
                setShowPsychologist(false)
              }}
              className={`flex items-center py-2 w-full cursor-pointer ${
                isDarkMode
                  ? "hover:bg-gray-100 dark:hover:bg-[#6e7bf2] "
                  : "hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]"
              } p-2 transition-all rounded-lg`}
            >
              <HiOutlineUserCircle className="mr-2 text-xl" />
              Личный кабинет
            </button>
            <button
              onClick={() => {
                setShowPsychologist(true)
                setShowProfile(false);
                setShowSpecialties(false);
                setShowSchedule(false);
              }}
              className={`flex items-center w-full py-2 p-2 ${
                isDarkMode
                  ? "hover:bg-gray-100 dark:hover:bg-[#6e7bf2] "
                  : "hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]"
              } transition-all rounded-lg`}
            >
              <MdOutlinePsychologyAlt className="mr-2 text-xl" />
              Психолог
            </button>
            <button
              onClick={() => {
                setShowSpecialties(true),
                setShowProfile(false),
                setShowSchedule(false);
                setShowPsychologist(false)
              }}
              className={`flex items-center py-2 w-full cursor-pointer ${
                isDarkMode
                  ? "hover:bg-gray-100 dark:hover:bg-[#6e7bf2] "
                  : "hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]"
              } p-2 transition-all rounded-lg`}
            >
              <IoAccessibilityOutline className="mr-2 text-xl" />
              Профориентация
            </button>
            <Link
              to="/trainers"
              className={`flex items-center py-2 p-2 ${
                isDarkMode
                  ? "hover:bg-gray-100 dark:hover:bg-[#6e7bf2] "
                  : "hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]"
              } transition-all rounded-lg`}
            >
              <CgGym className="mr-2 text-xl" />
              Тренажёры
            </Link>
          </nav>
        </motion.div>
        {!showProfile && !showSpecialties && !showPsychologist &&  (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-[50%] mx-6 p-6  hidden sm:flex "
          >
            <div
              className={`rounded-xl sm:block  p-6 ${
                isDarkMode ? "bg-[#141414]" : "bg-white"
              }`}
            >
              <div className="grid  gap-8">
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

                          {/* Раскрытая информация */}
                          {university.id === allInfo && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
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
                                    isDarkMode ? "bg-[#6e7bf2]" : "bg-[#bedbff]"
                                  }`}
                                >
                                  <p className="text-sm">Мин. Балл</p>
                                  <p className="text-xl font-bold">
                                    {university.scores.min || "—"}
                                  </p>
                                </div>
                                <div
                                  className={`p-2 rounded-md ${
                                    isDarkMode ? "bg-[#6e7bf2]" : "bg-[#bedbff]"
                                  }`}
                                >
                                  <p className="text-sm">Ср. Балл</p>
                                  <p className="text-xl font-bold">
                                    {university.scores.avg || "—"}
                                  </p>
                                </div>
                                <div
                                  className={`p-2 rounded-md ${
                                    isDarkMode ? "bg-[#6e7bf2]" : "bg-[#bedbff]"
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
                          setShowPsychologist(false)
                        }}
                        className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 ${
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
                      <Link
                        key={material.id}
                        to={material.link}
                        className={`block p-4 rounded-lg ${
                          isDarkMode
                            ? "bg-[#222222] hover:bg-gray-700"
                            : "bg-white hover:bg-gray-50 shadow"
                        } transition-all`}
                      >
                        <h3 className="text-lg font-medium">
                          {material.title}
                        </h3>
                        <p
                          className={`mt-1 text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {material.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Мобильное меню */}
        <nav
          className={`fixed bottom-0 left-0 w-full  z-100 shadow-lg sm:hidden ${
            isDarkMode
              ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] "
              : "bg-[#fff] "
          }`}
        >
          <div className="flex justify-around items-center py-4">
            <button
              onClick={() => {
                setShowPsychologist(true),
                setShowSchedule(false),
                setShowProfile(false),
                setShowSpecialties(false);
              }}
              className={`flex flex-col items-center  ${
                isDarkMode ? "text-white" : "text-[#363e45]"
              } hover:text-blue-500`}
            >
              <MdOutlinePsychologyAlt  size={24} />
              <span className="text-xs mt-1">Психолог</span>
            </button>
            <button
              onClick={() => {
                setShowSchedule(true),
                setShowProfile(false),
                setShowSpecialties(false);
                setShowPsychologist(false)
              }}
              className={`flex flex-col items-center  ${
                isDarkMode ? "text-white" : "text-[#363e45]"
              } hover:text-blue-500`}
            >
              <FaTasks size={24} />
              <span className="text-xs mt-1">Расписание</span>
            </button>
            <button
              onClick={() => {
                setShowSpecialties(true),
                setShowProfile(false),
                setShowSchedule(false);
                setShowPsychologist(false)
              }}
              className={`flex flex-col items-center  ${
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
              }}
              className={`flex flex-col items-center  ${
                isDarkMode ? "text-white" : "text-[#363e45]"
              } hover:text-blue-500`}
            >
              <HiOutlineUserCircle size={24} />
              <span className="text-xs mt-1">Профиль</span>
            </button>
          </div>
        </nav>

        {showProfile && <Profile onClose={() => {setShowProfile(false)} }/>}
        {showSpecialties && (
          <Profession
            onClose={() => {
              setShowSpecialties(false);
              setShowPsychologist(false)
              getUniversities();
            }}
          />
        )}
        {showSchedule && <Schedule onClose={() => setShowSchedule(false)} />}
        {showPsychologist && <Psychologist onClose={() => setShowPsychologist(false)} />}
      </div>

      {/*Блок Цели */}
      {!showProfile && !showSpecialties && !showSchedule && !showPsychologist && (
        <>
          <motion.div
            className="pb-18 sm:hidden"
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
              <div className="mt-6 sm:hidden">
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
                                  isDarkMode ? "bg-[#6e7bf2]" : "bg-[#bedbff]"
                                }`}
                              >
                                <p className="text-sm ">Мин. Балл</p>
                                <p className="text-xl   font-bold">
                                  {university.scores.min || "—"}
                                </p>
                              </div>

                              <div
                                className={`p-3 rounded-md ${
                                  isDarkMode ? "bg-[#6e7bf2]" : "bg-[#bedbff]"
                                }`}
                              >
                                <p className="text-sm ">Ср. Балл</p>
                                <p className="text-xl  font-bold">
                                  {university.scores.avg || "—"}
                                </p>
                              </div>

                              <div
                                className={`p-3 rounded-md ${
                                  isDarkMode ? "bg-[#6e7bf2]" : "bg-[#bedbff]"
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
              <div className="sm:hidden">
                <button
                  onClick={() => {
                    setShowSpecialties(true), setShowProfile(false);
                  }}
                  className={`flex items-center mx-6 text-center w-[87%] py-2 justify-center cursor-pointer ${
                    isDarkMode
                      ? "bg-[#3d37f0] "
                      : "bg-[#155dfc] text-white hover:text-[#193cb8]"
                  } p-2 transition-all rounded-lg`}
                >
                  Добавить цель (Пройти тест)
                </button>
              </div>
            )}
            <div className="my-8 px-6 sm:hidden">
              <h2
                className={`text-2xl font-semibold mb-4 ${
                  isDarkMode ? "text-white" : "text-[#000]"
                }`}
              >
                Полезные материалы:
              </h2>

              <div className="space-y-4 ">
                {materials.map((material) => (
                  <Link
                    key={material.id}
                    to={material.link}
                    className={`block p-4 rounded-lg transition-all ${
                      isDarkMode
                        ? "bg-[#222222] hover:bg-gray-700"
                        : "bg-white hover:bg-gray-50 shadow-md"
                    }`}
                  >
                    <h3 className="text-lg font-medium">{material.title}</h3>
                    <p
                      className={`mt-1 text-sm ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {material.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default HomePage;
