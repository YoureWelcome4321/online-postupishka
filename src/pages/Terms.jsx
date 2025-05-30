import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import HeaderNoButton from "../components/MainPageComponents/Header";

const PrivacyPolicy = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <div
      className={`${
        isDarkMode ? "bg-[#0e0e0e] text-white" : "bg-[#f6f6f6] text-gray-800"
      } min-h-screen`}
    >
      <HeaderNoButton />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl p-8 ${
            isDarkMode
              ? "bg-gradient-to-b from-[#1e1e1e] to-[#141414]"
              : "bg-white shadow-lg"
          }`}
        >
          <div className="flex">
            <h2 className="text-2xl font-bold mb-8 ">
              Политика конфиденциальности
            </h2>
            <motion.button
              className="p-2 mb-12 ml-auto rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate("/sign")}
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
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Сбор информации</h2>
            <p
              className={`mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Мы собираем следующую информацию:
            </p>
            <ul
              className={`list-disc list-inside space-y-2 ml-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <li>Имя пользователя (для создания личного профиля)</li>
              <li>Электронная почта (для верификации аккаунта)</li>
              <li>Пароль для безопасности входа</li>
              <li>Данные о классе/курсе (для персонализированной помощи)</li>
              <li>История взаимодействия с сервисом</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. Использование данных
            </h2>
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mb-4`}
            >
              Мы используем ваши данные для:
            </p>
            <ul
              className={`list-disc list-inside space-y-2 ml-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <li>Создания персонализированного рекомендательного алгоритма</li>
              <li>Верификации аккаунта и обеспечения безопасности</li>
              <li>
                Отправки важных уведомлений (подтверждение email, обновления)
              </li>
              <li>Психологической поддержки и рекомендаций</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Ваши права</h2>
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mb-4`}
            >
              Вы имеете право:
            </p>
            <ul
              className={`list-disc list-inside space-y-2 ml-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              <li>На доступ к своим данным</li>
              <li>На исправление информации</li>
              <li>На удаление аккаунта</li>
              <li>На отзыв согласия на обработку данных</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Изменения политики
            </h2>
            <p
              className={`${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mb-4`}
            >
              Мы можем обновлять эту политику конфиденциальности время от
              времени. Мы уведомим вас о любых значительных изменениях,
              разместив уведомление на главной странице или отправив
              email-сообщение.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Контакты</h2>
            <div
              className={`p-4 rounded-xl ${
                isDarkMode ? "bg-[#222]" : "bg-blue-50"
              }`}
            >
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                } mb-2`}
              >
                По вопросам конфиденциальности обращайтесь:
              </p>
              <p className="text-[#6E7BF2] font-medium">
                online-postupishka@gmail.com
              </p>
            </div>
          </section>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.history.back()}
            className={`mt-8 w-full py-3 rounded-xl font-medium ${
              isDarkMode
                ? "bg-gradient-to-r from-[#6E7BF2] to-[#4a90e2] hover:from-[#3d37f0] hover:to-[#2d66d4]"
                : "bg-gradient-to-r from-[#066be7] to-[#4a90e2] hover:from-blue-700 hover:to-blue-500"
            } text-white transition-all`}
          >
            Назад
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
