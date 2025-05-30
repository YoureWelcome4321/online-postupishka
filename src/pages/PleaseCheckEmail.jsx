import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import {motion} from "framer-motion";
import HeaderNoButton from "../components/MainPageComponents/Header";

const PleaseCheckEmail = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const maxAttempts = 15; 

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    let isMounted = true;
    let intervalId;

    const checkProfile = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (isMounted) {
          const userData = response.data;
          
          if (userData.verified) {
            navigate("/main");
          } else if (attemptCount < maxAttempts) {
            setAttemptCount(prev => prev + 1);
            setIsLoading(false);
          }
        }
      } catch (err) {
        console.error("Ошибка получения профиля:", err);
        
        if (isMounted) {
          if (attemptCount < maxAttempts) {
            setAttemptCount(prev => prev + 1);
            setIsLoading(false);
          } else {
            setError("Не удалось проверить статус верификации. Пожалуйста, попробуйте позже.");
          }
        }
      }
    };

    checkProfile();

    intervalId = setInterval(checkProfile, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [navigate]);


  if (isLoading) {
    return (
      <div className={`flex ${isDarkMode ? 'bg-[#0e0e0e]' : 'bg-[#f6f6f6]'} items-center justify-center min-h-screen`}>
        <div className={`text-center  ${isDarkMode ? 'text-[#fff]' : 'text-[#000]'}`}>
          <div className={`w-12 h-12 border-4 border-blue-500  border-t-transparent rounded-full animate-spin mx-auto mb-4`}></div>
          <p>Проверяем статус подтверждения...</p>
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
          className={`max-w-md w-full py-6 px-2 rounded-xl shadow-lg transition-all duration-300 ${
            isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-gray-800"
          }`}
        > 
          
          
        
          <h2 className="text-2xl font-bold mb-6 text-center">Подтвердите вашу почту</h2>



          <p className="mb-4 text-center">
            Мы отправили ссылку для подтверждения на вашу электронную почту.
            (После подтверждения вы будете перенаправлены в личный кабинет.)
            
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
        <div className="text-center">
          <button
            onClick={() => navigate("/sign")}
            className={`mx-auto mt-4  w-full py-2 rounded-lg ${
              isDarkMode
                ? " bg-gray-600 hover:bg-[#6e7bf2]"
                : "  bg-gray-300 hover:bg-[#bedbff]"
            } transition-colors`}
          >
            Назад
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PleaseCheckEmail;