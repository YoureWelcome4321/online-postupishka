import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../../ThemeContext";

const documentsList = [
  {
    title: "Паспорт",
    description: "Оригинал и копия паспорта или иного документа, удостоверяющего личность.",
  },
  {
    title: "Аттестат об окончании школы",
    description: "Оригинал и копия аттестата об окончании 9 или 11 класса.",
  },
  {
    title: "Итоговые сертификаты ЕГЭ/ОГЭ",
    description: "Результаты государственной итоговой аттестации (ЕГЭ/ОГЭ), соответствующие профильным предметам выбранной специальности.",
  },
  {
    title: "Фотографии",
    description: "Цветные или черно-белые фотографии 3x4 см (обычно требуется 6–10 штук).",
  },
  {
    title: "ИНН",
    description: "Копия ИНН не обязательна, но желательна для заполнения анкеты.",
  },
  {
    title: "СНИЛС",
    description: "Можно предоставить страховой номер индивидуального лицевого счёта.",
  },
  {
    title: "Медицинская карта и справка",
    description: "Требуется при поступлении на некоторые специальности или при заселении в общежитие.",
  },
  {
    title: "Заявление о приёме",
    description: "Заполняется лично абитуриентом или представителем при подаче заявки в университет.",
  },
  {
    title: "Договор о целевом обучении (если применимо)",
    description: "Предоставляется при поступлении на целевое направление.",
  },
];

const SelectUniversity = ({ onClose = () => {} }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`flex sm:my-6 sm:mr-auto rounded-xl justify-center p-4 ${
      isDarkMode ? "bg-[#141414]" : "bg-gray-100"
    }`}>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute mt-18 min-[1025px]:mt-0 inset-0 min-[1025px]:relative  sm:mx-auto  w-full max-[1025px]:max-w-full max-w-lg ${
          isDarkMode ? "bg-[#141414] text-white" : "bg-white text-[#363e45]"
        } shadow-xl rounded-xl overflow-hidden flex flex-col`}
      >
        <div className={`p-4 sm:p-6 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">
              Какие документы нужны для поступления?
            </h2>
            <motion.button
              className={`p-2 mt-2 rounded-full ${
                isDarkMode ? "hover:bg-[#222222]" : "hover:bg-gray-100"
              }`}
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke={isDarkMode ? "#fff" : "#334155"}
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

        {/* Список документов */}
        <div className="flex-grow overflow-y-auto sm:max-h-[110vh] max-h-[70vh] p-4 sm:p-6">
          <div className="space-y-3">
            {documentsList.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`p-4 rounded border-l-4 ${
                  isDarkMode
                    ? "border-[#6e7bf2] bg-[#222222]"
                    : "border-blue-600 bg-blue-50 hover:bg-blue-100"
                }`}
              >
                <h2 className="text-lg font-medium mb-2">{doc.title}</h2>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {doc.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Футер с кнопкой закрытия (для мобильных) */}
        <div className={`p-4 sm:hidden ${
          isDarkMode ? "bg-[#1e1e1e]" : "bg-white"
        } border-t ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className={`w-full py-2 rounded-lg ${
              isDarkMode 
                ? "bg-[#3d37f0] hover:bg-[#2a25b0]" 
                : "bg-blue-600 hover:bg-blue-700"
            } text-white transition-colors`}
          >
            Закрыть
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default SelectUniversity;