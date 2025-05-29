import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderNoButton from "../components/MainPageComponents/Header";
import { ThemeContext } from "../ThemeContext";

const EmailVerification = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (!token) {
        setStatus("error");
        return;
      }

      try {
        const response = await axios.get(
          `https://api.online-postupishka.ru/verify-email?token=${token}`
        );

        if (response.status === 200) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [location]);

  return (
    <div className={`${isDarkMode ? "bg-[#141414]" : "bg-[#f6f6f6]"} min-h-screen flex flex-col`}> 
      <HeaderNoButton />
      <div className="flex-grow flex items-center justify-center px-4">
        <div
          className={`max-w-md w-full p-8 rounded-xl shadow-lg text-center ${
            isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-gray-800"
          } transition-all duration-300`}
        >
          {/* Статус: Загрузка */}
          {status === "loading" && (
            <>
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-2">Проверяем ссылку...</h2>
              <p>Ожидайте подтверждения вашей электронной почты.</p>
            </>
          )}

          {/* Статус: Успех */}
          {status === "success" && (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">Ваша почта подтверждена</h2>
              <button
                onClick={() => navigate("/")}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Вернуться на главную
              </button>
            </>
          )}

          {/* Статус: Ошибка */}
          {status === "error" && (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-red-500">Ошибка подтверждения</h2>
              <p className="mb-6">Ссылка недействительна или устарела.</p>

              <button
                onClick={() => navigate("/")}
                className={`px-6 py-2 rounded-lg w-full ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                } transition-colors`}
              >
                Назад
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;