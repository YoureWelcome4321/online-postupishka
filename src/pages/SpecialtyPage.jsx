
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import Header from "../components/Header";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SpecialtyPage = () => {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      id: "interest",
      label: "Что вас больше привлекает?",
      options: [
        "Творческие проекты",
        "Аналитические задачи",
        "Помощь людям",
        "Технические устройства",
      ],
    },
    {
      id: "skill",
      label: "Какой навык у вас наиболее развит?",
      options: [
        "Креативность",
        "Логическое мышление",
        "Эмпатия",
        "Техническая грамотность",
      ],
    },
    {
      id: "work",
      label: "Где вы видите себя через 5 лет?",
      options: [
        "В креативной индустрии",
        "В IT-компании",
        "В образовательном учреждении",
        "В инженерной сфере",
      ],
    },
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const calculateResult = () => {
    const categories = {
      creative: 0,
      analytical: 0,
      social: 0,
      technical: 0,
    };

    Object.values(answers).forEach((answer) => {
      switch (answer) {
        case "Творческие проекты":
        case "Креативность":
        case "В креативной индустрии":
          categories.creative += 1;
          break;
        case "Аналитические задачи":
        case "Логическое мышление":
        case "В IT-компании":
          categories.analytical += 1;
          break;
        case "Помощь людям":
        case "Эмпатия":
        case "В образовательном учреждении":
          categories.social += 1;
          break;
        case "Технические устройства":
        case "Техническая грамотность":
        case "В инженерной сфере":
          categories.technical += 1;
          break;
        default:
          break;
      }
    });

    setResult(categories);
    setShowResult(true);
  };

  const data = {
    labels: ["Творчество", "Аналитика", "Социальное", "Техническое"],
    datasets: [
      {
        label: "Ваш потенциал",
        data: [
          result?.creative || 0,
          result?.analytical || 0,
          result?.social || 0,
          result?.technical || 0,
        ],
        backgroundColor: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Ваш профессиональный профиль",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 3,
        ticks: { stepSize: 1 },
      },
    },
  };

  return (
    <div className="bg-gradient-to-b from-[#f6f6f6] to-[#e0e0e0] min-h-screen">
      <Header />

      <div className="container mx-auto px-5 py-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-[#2d2d2d]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Подбор специальности
        </motion.h1>
        {!showResult ? (
          <div className="space-y-8">
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                className="bg-white p-6 rounded-2xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <h3 className="text-lg font-semibold text-[#363e45] mb-4">
                  {question.label}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label
                      key={option}
                      className={`block p-3 rounded-lg transition-colors cursor-pointer ${
                        answers[question.id] === option
                          ? "bg-[#6E7BF2] text-white"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => handleAnswer(question.id, option)}
                        className="hidden"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            ))}

            <motion.button
              className="w-full bg-[#6E7BF2] hover:bg-[#3d37f0] text-white py-4 rounded-full font-bold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={calculateResult}
              disabled={Object.keys(answers).length !== questions.length}
            >
              Показать результат
            </motion.button>
          </div>
        ) : (
          <div className="space-y-8">
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Bar data={data} options={options} />
            </motion.div>

            <div className="space-y-4">
              {Object.entries(result).map(([key, value]) => {
                const labels = {
                  creative: "Творческие специальности",
                  analytical: "Аналитические специальности",
                  social: "Социальные специальности",
                  technical: "Технические специальности",
                };

                return (
                  value > 0 && (
                    <motion.div
                      key={key}
                      className="p-4 bg-white rounded-lg shadow-md"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h4 className="text-lg font-semibold text-[#363e45]">
                        {labels[key]} ({value}/3)
                      </h4>
                      <p className="text-sm text-gray-600 mt-2">
                        {key === "creative" &&
                          "Вы склонны к творчеству. Вам подойдут специальности в области дизайна, искусства и медиа."}
                        {key === "analytical" &&
                          "Ваш профиль — аналитика. Рекомендуем IT, финансы или науку."}
                        {key === "social" &&
                          "Вы ориентированы на помощь людям. Образование, психология или социальная работа."}
                        {key === "technical" &&
                          "Технические навыки — ваш конёк. Инженерия, разработка или производство."}
                      </p>
                    </motion.div>
                  )
                );
              })}
            </div>

            <motion.button
              className="w-full bg-[#FF6B6B] hover:bg-[#e53e3e] text-white py-4 rounded-full font-bold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setAnswers({});
                setResult(null);
                setShowResult(false);
              }}
            >
              Пройти тест заново
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtyPage;
