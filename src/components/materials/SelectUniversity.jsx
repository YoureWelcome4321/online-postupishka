import React, { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import HeaderNoButton from "../HeaderNoButtons";

// Список документов
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

const SelectUniversity = () => {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const [isDarkMode] = useState(false); // Заменить на useContext, если есть темизация

  const toggleSelected = (index) => {
    setSelectedDocs((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      encoding: "Identity-H", 
    });

    doc.setFont("helvetica");

    // Заголовок
    doc.setFontSize(14);
    doc.text("Чек-лист: Документы для поступления", 10, 15);
    doc.text("Выбранные документы:", 10, 25);

    // Таблица
    const tableData = selectedDocs.map((idx) => [
      "✅",
      documentsList[idx].title,
      documentsList[idx].description,
    ]);

    autoTable(doc, {
      head: [["Статус", "Название", "Описание"]],
      body: tableData,
      startY: 30,
      theme: "grid",
      styles: { font: "helvetica", fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 40 },
        2: { cellWidth: 100 },
      },
    });

    // Подпись
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(8);
    doc.text(`Дата: ${new Date().toLocaleDateString()}`, 10, finalY);
    doc.text("Примечание: ✅ — подготовлен", 10, finalY + 5);

    doc.save("checklist_documents.pdf");
  };

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      <HeaderNoButton />

      {/* Компактный контент */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`p-4 sm:p-6 ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } shadow-md rounded-lg max-w-lg sm:max-w-xl mx-2 sm:mx-4 md:mx-auto mt-6 mb-6`}
      >
        {/* Заголовок */}
        <h1
          className={`text-2xl font-bold mb-2 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Какие документы нужны для поступления?
        </h1>
        <p className={`mb-4 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          Выберите документы, которые уже подготовили
        </p>

        {/* Список документов */}
        <div className="space-y-3">
          {documentsList.map((doc, index) => {
            const isSelected = selectedDocs.includes(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`p-3 rounded border-l-4 ${
                  isDarkMode
                    ? "border-blue-500 bg-gray-700 hover:bg-gray-600"
                    : "border-blue-600 bg-blue-50 hover:bg-blue-100"
                } flex items-center justify-between cursor-pointer`}
                onClick={() => toggleSelected(index)}
              >
                <div className="flex-grow">
                  <h2 className="text-lg font-medium">{doc.title}</h2>
                  <p className={`text-xs ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {doc.description}
                  </p>
                </div>
                <div className="ml-2">
                  {isSelected ? (
                    <span className="text-green-500">✅</span>
                  ) : (
                    <span
                      className={`${
                        isDarkMode ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      ❏
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Кнопка скачать чек-лист */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <button
            onClick={generatePDF}
            disabled={selectedDocs.length === 0}
            className={`w-full py-2 rounded font-medium shadow-sm ${
              selectedDocs.length > 0
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            {selectedDocs.length > 0
              ? "Скачать чек-лист PDF"
              : "Выберите хотя бы один документ"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SelectUniversity;