import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import axios from "axios";
import { ThemeContext } from "../../ThemeContext";
import AreYouSure from "./AreYouSure";

export default function Profile({ onClose = () => {} }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [showSubjectList, setShowSubjectList] = useState(false);
  const [changePassword, setNewPassword] = useState(false);
  const [validate, setValidate] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [profileData, setProfileData] = useState({
    first_name: "",
    email: "",
    class_number: 0,
    username: "",
    subjects: [
      {
        subject: "Русский язык",
        current_score: 0,
        desired_score: 100,
      },
    ],
  });

  const [editableData, setEditableData] = useState({
    first_name: "",
    email: "",
    password_old: "",
    password_new: "",
    class_number: 0,
    telegram: "",
    subjects: [{ subject: "", current_score: "", desired_score: "" }],
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API}/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
      }
    };
    fetchProfile();
  }, []);

  const sendEditedProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${import.meta.env.VITE_API}/profile`,
        editableData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsEditing(false);
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          setPasswordError("Введен неверный пароль, смена пароля отменена");
        }
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      window.location.href = "/sign";
    } catch (error) {
      console.error("Ошибка удаления профиля:", error);
      alert(`Ошибка: ${error.response?.data?.message || error.message}`);
    }
  };

  useEffect(() => {
    const initialData = {
      first_name: profileData.first_name || "",
      email: profileData.email || "",
      class_number: profileData.class_number || "",
      password_old: editableData.password_old || "",
      password_new: editableData.password_new || "",
      telegram: profileData.username || "",
      subjects: profileData.subjects?.length
        ? profileData.subjects.map((s) => ({
            ...s,
            current_score: s.current_score,
            desired_score: s.desired_score,
          }))
        : [{ subject: "Русский язык", current_score: "", desired_score: "" }],
    };
    setEditableData(initialData);
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "class_number") {
      setEditableData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setEditableData((prev) => ({ ...prev, [name]: value }));
    }
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
          { subject, current_score: "0", desired_score: "100" },
        ],
      }));
    } else {
      if (!editableData.subjects.some((s) => s.subject === subject)) {
        setEditableData((prev) => ({
          ...prev,
          subjects: [
            ...prev.subjects,
            { subject, current_score: "0", desired_score: "100" },
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
      className={`absolute mt-18 inset-0 min-[1025px]:relative sm:mx-auto  min-[1025px]:my-4  min-[1025px]:w-[50%] sm:rounded-2xl transition-all  ${
        isDarkMode
          ? "bg-[#141414] text-white"
          : "bg-[#f6f6f6] sm:bg-white text-gray-900"
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <div className="p-4 sm:p-6 flex justify-between items-center ">
        <h1
          className={`text-2xl sm:text-2xl font-bold ${
            isDarkMode ? " text-[#fff]" : "text-[#363e45]"
          }`}
        >
          Профиль
        </h1>
        <div className="flex space-x-3 sm:space-x-5 text-blue-600">
          {/* Кнопка редактирования */}
          {isEditing ? (
            <motion.button
              className={`flex items-center p-2 ${
                isDarkMode ? "text-[#6e7bf2]" : "text-blue-600"
              } rounded-lg transition-all hover:bg-opacity-80`}
              onClick={() => {
                setIsEditing(false);
                sendEditedProfile();
                setPasswordError("");
                setNewPassword(false);
                setValidate(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke={isDarkMode ? "#6e7bf2" : "#3371fc"}
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
              onClick={() => {
                setIsEditing(true);
                setPasswordError("");
              }}
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

      <div className="p-4 max-sm:pb-20  sm:p-6 space-y-6 overflow-y-auto max-h-[80vh] sm:max-h-none ">
        <div className="space-y-4">
          {/* Имя */}
          <div>
            <label
              htmlFor="first_name"
              className="text-base sm:text-lg font-medium block mb-2"
            >
              Логин
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={editableData.first_name}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode
                  ? "bg-[#222222] border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Логин пользователя"
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
              className={`w-full px-3 py-2 rounded-md border ${
                isDarkMode
                  ? "bg-[#222222] border-gray-600 text-white"
                  : "bg-white border-gray-300"
              }`}
              placeholder="Email"
              disabled
            />
          </div>
          {/* Пароль */}
          <div>
            <label
              htmlFor="password"
              className="text-base sm:text-lg font-medium block mb-2"
            >
              Пароль
            </label>
            {isEditing ? (
              <div className="flex flex-col">
                {changePassword && (
                  <div className="mt-2 space-y-4">
                    <input
                      type="password"
                      id="current-password"
                      name="password_old"
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-md border ${
                        isDarkMode
                          ? "bg-[#222222] border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="Текущий пароль"
                      disabled={!isEditing}
                    />
                    <input
                      type="password"
                      id="new-password"
                      name="password_new"
                      onChange={handleChange}
                      className={`mb-5 w-full px-3 py-2 rounded-md border ${
                        isDarkMode
                          ? "bg-[#222222] border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="Новый пароль"
                      disabled={!isEditing}
                    />
                  </div>
                )}
                <button
                  className={`text-sm sm:text-base ${
                    isDarkMode
                      ? "bg-[#6e7bf2] hover:bg-[#3d37f0]"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white px-4 py-2 rounded-lg transition-colors`}
                  onClick={() => {
                    if (changePassword) {
                      setValidate(false);

                      if (
                        editableData.password_old === "" &&
                        editableData.password_new === ""
                      ) {
                        setNewPassword(false);
                        setValidate(false);
                      } else if (
                        !editableData.password_old ||
                        !editableData.password_new
                      ) {
                        setValidate(true);
                        return;
                      } else if (editableData.password_new.length < 6) {
                        setValidate(true);
                        return;
                      }

                      setIsEditing(false);
                      sendEditedProfile();
                    } else {
                      setNewPassword(true);
                    }
                  }}
                >
                  {changePassword ? "Сохранить новый пароль" : "Сменить пароль"}
                </button>

                {validate && (
                  <p className="my-2 ml-2 flex items-center space-x-2 text-red-500 text-sm w-full">
                    {editableData.password_new?.length < 6
                      ? "Пароль должен быть не менее 6 символов"
                      : "Заполните все поля"}
                  </p>
                )}
              </div>
            ) : (
              <input
                type="password"
                id="password"
                name="password"
                value="Online-Postupishka"
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode
                    ? "bg-[#222222] border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                placeholder="Пароль"
                disabled={!isEditing}
              />
            )}
            {passwordError && (
              <p className="my-2 ml-2 flex items-center space-x-2 text-red-500 text-sm w-full">
                {passwordError}
              </p>
            )}
          </div>

          {/* Класс */}
          <div>
            <label
              htmlFor="class_number"
              className="text-base sm:text-lg font-medium block mb-2"
            >
              Класс
            </label>
            {!isEditing ? (
              <input
                type="text"
                name="class_number"
                placeholder="Класс"
                className={`w-full px-3 py-2 rounded-md border ${
                  isDarkMode
                    ? "bg-[#222222] border-gray-600 text-white"
                    : "bg-white border-gray-300"
                }`}
                value={editableData.class_number}
                disabled={!isEditing}
              />
            ) : (
              <div className="flex space-x-4">
                <div>
                  <input
                    type="radio"
                    id="class9"
                    name="class_number"
                    className="peer hidden"
                    value="9"
                    onChange={handleChange}
                  />
                  <label
                    className={`ml-1  ${
                      isDarkMode
                        ? "bg-[#222222] peer-checked:bg-[#6e7bf2]"
                        : "bg-[#f6f6f6]  peer-checked:bg-[#2b7fff] peer-checked:text-white"
                    }  px-2 py-1 rounded-lg `}
                    htmlFor="class9"
                  >
                    9 класс
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="class10"
                    name="class_number"
                    className="peer hidden"
                    value="10"
                    onChange={handleChange}
                  />
                  <label
                    className={`ml-1   ${
                      isDarkMode
                        ? "bg-[#222222] peer-checked:bg-[#6e7bf2]"
                        : "bg-[#f6f6f6]  peer-checked:bg-[#2b7fff] peer-checked:text-white"
                    } px-2 py-1 rounded-lg `}
                    htmlFor="class10"
                  >
                    10 класс
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="class11"
                    className="peer hidden"
                    name="class_number"
                    value="11"
                    onChange={handleChange}
                  />
                  <label
                    className={`ml-1  ${
                      isDarkMode
                        ? "bg-[#222222] peer-checked:bg-[#6e7bf2]"
                        : "bg-[#f6f6f6]  peer-checked:bg-[#2b7fff] peer-checked:text-white"
                    }  px-2 py-1 rounded-lg `}
                    htmlFor="class11"
                  >
                    11 класс
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Предметы ЕГЭ */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold">Предметы ЕГЭ</h2>
            {isEditing && (
              <button
                className={`text-sm sm:text-base ${
                  isDarkMode ? "bg-[#6e7bf2]" : "bg-blue-500"
                } text-white px-3 py-1 rounded-full hover:bg-blue-600 transition-colors`}
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
                if (subject.includes("Математика")) {
                  const currentMath = editableData.subjects.find((s) =>
                    s.subject.includes("Математика")
                  );
                  if (currentMath && currentMath.subject === subject)
                    return null;
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
                      ? "border-[#3f4753] bg-[#222222]"
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
                    <div className="flex space-x-4 mt-2 ">
                      <div>
                        <h3 className="mb-2">Текущий балл:</h3>
                        <input
                          type="text"
                          placeholder="Текущий балл"
                          value={subj.current_score}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (
                              value === "" ||
                              (Number(value) >= 0 && Number(value) <= 100)
                            ) {
                              handleSubjectChange(
                                index,
                                "current_score",
                                Number(value)
                              );
                            }
                          }}
                          className={`w-40 max-sm:w-32 px-3 py-1 rounded border ${
                            isDarkMode
                              ? "text-white border-[#3f4753]"
                              : "border-[#d1d5dc] bg-white text-black"
                          }`}
                          disabled={!isEditing}
                          min="0"
                          max="100"
                        />
                      </div>
                      <div>
                        <h3 className="mb-2">Желаемый балл:</h3>
                        <input
                          type="text"
                          placeholder="Желаемый балл"
                          value={subj.desired_score}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (
                              value === "" ||
                              (Number(value) >= 0 && Number(value) <= 100)
                            ) {
                              handleSubjectChange(
                                index,
                                "desired_score",
                                Number(value)
                              );
                            }
                          }}
                          className={`w-40 max-sm:w-32 px-3 py-1 rounded border ${
                            isDarkMode
                              ? " border-[#3f4753] text-white"
                              : "border-[#d1d5dc] bg-white text-black"
                          }`}
                          disabled={!isEditing}
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>
                  </div>
                  {!isRequired && isEditing && (
                    <button onClick={() => handleDeleteSubject(index)}>
                      <FaTrashAlt
                        className={`text-lg sm:text-xl ${
                          isDarkMode ? "text-[#6e7bf2]" : "text-blue-600"
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
          className="float-right flex max-sm:w-[47%] items-center justify-center p-3 sm:p-2 rounded-lg transition-colors mb-4 sm:mb-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          style={{
            background: isDarkMode ? "#222222" : "#e5e7eb",
          }}
        >
          <IoIosLogOut className="mr-2 text-md max-sm:text-4xl sm:text-md" />
          <span className="text-md sm:text-md font-medium">
            Выйти из аккаунта
          </span>
        </motion.button>
        <motion.button
          className="float-right max-sm:float-start max-sm:w-[47%] flex items-center justify-center mr-4 p-3 sm:p-2 rounded-lg transition-colors mb-4 sm:mb-0"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setAlert(true)}
          style={{
            background: isDarkMode ? "#222222" : "#e5e7eb",
          }}
        >
          <TiDeleteOutline className="mr-2 text-md max-sm:text-4xl sm:text-md" />
          <span className="text-md sm:text-md font-medium">
            Удалить профиль
          </span>
        </motion.button>
      </div>
      {showAlert && (
        <AreYouSure
          onClose={() => setAlert(false)}
          onConfirm={handleDeleteAccount}
          message="Вы уверены?"
          fullScreen
        />
      )}
    </motion.div>
  );
}
