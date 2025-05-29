import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import HeaderNoButton from "../components/MainPageComponents/Header";

const PleaseCheckEmail = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true); // Состояние загрузки
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  // Функция отправки письма подтверждения
  const sendVerificationEmail = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API}/email`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (err) {
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // Если нет токена — редирект
      return;
    }

    // Первый запрос: отправка письма
    sendVerificationEmail().then(() => setIsLoading(false));

    // Функция проверки профиля
    const checkProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;

        if (userData.email_verified) {
          clearInterval(intervalId); 
          navigate("/main");
        }
      } catch (err) {
        console.error("Ошибка получения профиля:", err);
      }
    };

    
    const intervalId = setInterval(checkProfile, 15000);
    checkProfile(); // Проверяем сразу

    
    return () => clearInterval(intervalId);
  }, [navigate]);

 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Отправляем письмо для подтверждения...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNoButton />

      <div
        className={`flex-grow flex items-center justify-center px-4 py-8 ${
          isDarkMode ? "bg-[#141414]" : "bg-[#f6f6f6]"
        }`}
      >
        <div
          className={`max-w-md w-full p-8 rounded-xl shadow-lg transition-all duration-300 ${
            isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-gray-800"
          }`}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Подтвердите вашу почту</h2>

          <p className="mb-6 ">
            Мы отправили ссылку для подтверждения на вашу электронную почту.
            Если вы не получили письмо, нажмите кнопку ниже.
          </p>


          {/* Кнопка "Назад" */}
          <button
            onClick={() => navigate("/")}
            className={`mt-4 w-full py-2 rounded-lg ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors`}
          >
            Назад
          </button>
        </div>
      </div>

      {showSuccess && (
        <div
          className="fixed top-25 right-5 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out"
          style={{ animation: "fadeInOut 3s ease forwards" }}
        >
          Письмо успешно отправлено!
        </div>
      )}


      {showError && (
        <div
          className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-out"
          style={{ animation: "fadeInOut 3s ease forwards" }}
        >
          Не удалось отправить письмо. Попробуйте позже.
        </div>
      )}
    </div>
  );
};

export default PleaseCheckEmail;