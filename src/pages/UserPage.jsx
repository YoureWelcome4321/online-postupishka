import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { HiOutlineUserCircle } from "react-icons/hi";
import { FaTasks } from "react-icons/fa";
import { IoDocumentOutline, IoAccessibilityOutline } from "react-icons/io5";
import { MdOutlinePsychologyAlt } from "react-icons/md";
import {
  CgSmileMouthOpen,
  CgSmileNeutral,
  CgSmileSad,
  CgGym,
} from "react-icons/cg";
import { SlArrowDown } from "react-icons/sl";
import { PiSmileyAngry } from "react-icons/pi";
import { ThemeContext } from "../ThemeContext";
import HeaderNoButton from "../components/HeaderNoButtons";
import Profile from "../components/Profile";
import Profession from "../components/Profession";

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
  const { isDarkMode } = useContext(ThemeContext);
  const [showAlert, setAlert] = useState(false);
  const [profileData, setProfileData] = useState({
    first_name: "",
    email: "",
    class: "",
    username: "",
    subjects: [],
  });

  const [universities, setUniversities] = useState([
    {
      university: "Московский государственный университет (МГУ)",
      directions: "Прикладная математик",
      scores: { min: 270, avg: 310, bud: 340 },
      id: 1,
    },
    {
      university: "Московский государственный университет (RГУ)",
      directions: "Информтика",
      scores: { min: 27, avg: 31, bud: 34 },
      id: 2,
    },
  ]);
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
      console.log(response.data);
      setUniversities(
        response.data.map((university, index) => ({
          ...university,
          number: index + 1,
        }))
      );
    } catch (error) {
      console.error("Ошибка загрузки целей:", error);
      alert(`Ошибка: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    getUser();
    getUniversities();
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
        {/* Основное содержимое */}
        <motion.div
          className="max-w-full max-md:w-full p-6 bg-[#f6f6f6]"
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
            <Link
              to="/psychologist"
              className={`flex items-center py-2 p-2 ${
                isDarkMode
                  ? "hover:bg-gray-100 dark:hover:bg-[#6e7bf2] "
                  : "hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]"
              } transition-all rounded-lg`}
            >
              <MdOutlinePsychologyAlt className="mr-2 text-xl" />
              Психолог
            </Link>
            <Link
              to="/schedule"
              className={`flex items-center py-2 p-2 ${
                isDarkMode
                  ? "hover:bg-gray-100 dark:hover:bg-[#6e7bf2] "
                  : "hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]"
              } transition-all rounded-lg`}
            >
              <FaTasks className="mr-2 text-xl" />
              Помощь с расписанием
            </Link>
            <button
              onClick={() => {
                setShowSpecialties(true), setShowProfile(false);
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
              to="/materials"
              className={`flex items-center py-2 p-2 ${
                isDarkMode
                  ? "hover:bg-gray-100 dark:hover:bg-[#6e7bf2] "
                  : "hover:bg-gray-100 dark:hover:bg-[#dbeafe]  hover:text-[#193cb8]"
              } transition-all rounded-lg`}
            >
              <IoDocumentOutline className="mr-2 text-xl" />
              Полезные материалы для поступления
            </Link>
          </nav>
        </motion.div>

        {/* Мобильное меню */}
        <nav
          className={`fixed bottom-0 left-0 w-full  z-100 shadow-lg sm:hidden ${
            isDarkMode
              ? "bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] "
              : "bg-[#fff] "
          }`}
        >
          <div className="flex justify-around items-center py-4">
            <Link
              to="/trainers"
              className={`flex flex-col items-center  ${
                isDarkMode ? "text-white" : "text-[#363e45]"
              } hover:text-blue-500`}
            >
              <CgGym size={24} />
              <span className="text-xs mt-1">Тренажёры</span>
            </Link>
            <Link
              to="/schedule"
              className={`flex flex-col items-center  ${
                isDarkMode ? "text-white" : "text-[#363e45]"
              } hover:text-blue-500`}
            >
              <FaTasks size={24} />
              <span className="text-xs mt-1">Расписание</span>
            </Link>
            <button
              onClick={() => setShowSpecialties(true)}
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

        {showProfile && <Profile onClose={() => setShowProfile(false)} />}
        {showSpecialties && (
          <Profession onClose={() => setShowSpecialties(false)} />
        )}
      </div>
 <div className="pb-18">
      {universities.length > 0 && !showProfile && !showSpecialties && (
        <div className="mt-6 sm:hidden">
          <h2
            className={`text-2xl ml-6 font-semibold mb-3 ${
              isDarkMode ? "text-white" : "text-[#000]"
            }`}
          >
            Цели:
          </h2>
          <ul className="space-y-3  w-[90%] mx-5">
            {universities
              .slice(0, showAllUniversities ? universities.length : 2)
              .map((university) => (
                <div>
                  <li
                    key={university.id}
                    onClick={() =>
                      seeAllInfo((prev) =>
                        prev === university.id ? null : university.id
                      )
                    }
                    className={`flex ${
                      isDarkMode
                        ? "bg-[#222222] text-white"
                        : "bg-[#ffffff] text-gray-800"
                    } p-2 rounded-lg`}
                  >
                    {university.university}
                    <button className="mr-auto ">
                      <SlArrowDown />
                    </button>
                  </li>
                  {university.id === allInfo && (
                    <div
                      className={`mt-3 p-4 rounded-lg  ${
                        isDarkMode
                          ? "bg-[#222222]  text-white"
                          : "bg-white text-gray-800"
                      } shadow-md transition-all duration-300`}
                    >
                      <h3 className="text-lg font-semibold mb-3 flex items-center">
                        Направление: {university.directions}
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
                    </div>
                  )}
                </div>
              ))}

            {universities.length > 2 && (
              <button
                onClick={() => setShowAllUniversities(!showAllUniversities)}
                className={`mt-3 text-sm text-center font-medium ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                } hover:underline focus:outline-none`}
              >
                {showAllUniversities ? "Скрыть" : `Показать все цели`}
              </button>
            )}
          </ul>
        </div>
      )}
      {/* Блок "Полезные материалы" */}
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
    </div>
  </div>
  );
};

export default HomePage;
