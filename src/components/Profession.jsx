import React, { useState, useContext, useEffect } from "react";
import HeaderNoButton from "./HeaderNoButtons";
import axios from "axios";
import { motion } from "framer-motion";
import { FaGraduationCap, FaRegLightbulb, FaChartLine } from 'react-icons/fa';
import { ThemeContext } from "../ThemeContext";
import UniversityCard from "./UniversityCard";

export default function Profession() {
  const { isDarkMode } = useContext(ThemeContext);
  const [stage, setStage] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [progress, setProgress] = useState(0);
  const [questionsData, setQuestionsData] = useState({
    question: "",
    counts_remaind: 0
  });
  const [userAnswer, setAnswer] = useState({ answer: "" });
  const [results, setResults] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState('idle');

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setAnswer((prev) => ({ ...prev, answer: value }));
  };

  const nextQuestion = () => {
    handleGetQuestion();
  };

  const resetQuestionsData = () => {
    setQuestionsData({
      question: "",
      counts_remaind: 0
    });
  };

  const handleGetQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.online-postupishka.ru/specialization/question ",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestionsData(response.data);
    } catch (error) {
      if (error.response?.status === 400) {
        setStage('result');
        setLoadingStatus('success');
      }
    }
  };

  const handleSendAnswer = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://api.online-postupishka.ru/specialization/answer ",
        userAnswer,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Ошибка отправки ответа:", error);
    }
  };

  const handleEndTest = async () => {
    setLoadingStatus('loading');
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.online-postupishka.ru/specialization/result ",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.status === 'done') {
        setResults(response.data);
        console.log(response.data)
        setLoadingStatus('success');
      }
    } catch (error) {
      console.error("Ошибка получения результатов:", error);
      setResults([{
        information: false,
        university: "Ошибка загрузки",
        directions: ["Нет данных"],
        features: ["Нет информации"],
        scores: { avg: 0, bud: 0, min: 0 }
      }]);
      setLoadingStatus('error');
    }
  };

  const renderResult = () => {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Рекомендуемые вам ВУЗы
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">На основе ваших ответов</p>
        </div>

        {loadingStatus === 'loading' && (
          <div className="flex justify-center items-center h-40">
            <svg className="animate-spin h-8 w-8 text-blue-500" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25"/>
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" className="opacity-75"/>
            </svg>
          </div>
        )}

        {loadingStatus === 'success' && results.length > 0 ? (
          <div className="space-y-4">
            {results.map((university, index) => (
              <UniversityCard key={index} results={university} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Нет рекомендаций по вашему профилю
          </div>
        )}

        {loadingStatus === 'error' && (
          <div className="text-center text-red-500">
            Ошибка загрузки данных. Попробуйте позже.
          </div>
        )}
      </div>
    );
  };

  const renderWelcome = () => {
    return (
      <div 
        className={`
          min-h-screen
          absolute sm:relative inset-0 
          flex flex-col sm:my-0 sm:pt-0 my-16 pt-12
          px-4 sm:px-6 lg:px-8
          transition-all duration-500 ease-in-out
          ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
          ${stage === 'welcome' ? "opacity-100" : "opacity-0"}
        `}
      >
        <motion.div 
          className="flex justify-center mb-6 sm:mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="relative group">
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
            ></motion.div>
            <motion.div 
              className="relative bg-gradient-to-r from-blue-500 to-indigo-600 p-3 sm:p-4 rounded-full text-white z-10"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaGraduationCap 
                size={32} 
                className="transition-transform duration-300 group-hover:rotate-12"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1 
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-4 sm:mb-6 px-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Профориентационный тест
        </motion.h1>

        <motion.div 
          className={`
            ${isDarkMode ? "bg-gray-800" : "bg-white"} 
            rounded-2xl shadow-xl border 
            ${isDarkMode ? "border-gray-700" : "border-gray-100"}
            mx-auto w-full max-w-sm sm:max-w-md
            transform transition-all duration-300 hover:shadow-2xl
          `}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <div className="p-4 sm:p-6">
            <p className={`mb-6 text-sm sm:text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              Этот тест поможет вам лучше понять свои профессиональные склонности и интересы.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
              <motion.div 
                className={`
                  ${isDarkMode ? "bg-blue-900/30" : "bg-blue-50"} 
                  p-2 rounded-xl flex flex-col items-center justify-center
                  transition-all duration-300 hover:scale-105 hover:shadow-md
                `}
                whileHover={{ y: -5 }}
              >
                <div className={`text-blue-500 mb-1 ${isDarkMode ? "text-blue-400" : "text-blue-600"} transition-transform duration-300`}>
                  <FaRegLightbulb size={18} />
                </div>
                <p className="text-xs text-center px-1">Определите свои сильные стороны</p>
              </motion.div>

              <motion.div 
                className={`
                  ${isDarkMode ? "bg-green-900/30" : "bg-green-50"} 
                  p-2 rounded-xl flex flex-col items-center justify-center
                  transition-all duration-300 hover:scale-105 hover:shadow-md
                `}
                whileHover={{ y: -5 }}
              >
                <div className={`text-green-500 mb-1 ${isDarkMode ? "text-green-400" : "text-green-600"} transition-transform duration-300`}>
                  <FaChartLine size={18} />
                </div>
                <p className="text-xs text-center px-1">Оцените свои потенциальные возможности</p>
              </motion.div>

              <motion.div 
                className={`
                  ${isDarkMode ? "bg-purple-900/30" : "bg-purple-50"} 
                  p-2 rounded-xl flex flex-col items-center justify-center
                  transition-all duration-300 hover:scale-105 hover:shadow-md
                `}
                whileHover={{ y: -5 }}
              >
                <div className={`text-purple-500 mb-1 ${isDarkMode ? "text-purple-400" : "text-purple-600"} transition-transform duration-300`}>
                  <FaGraduationCap size={18} />
                </div>
                <p className="text-xs text-center px-1">Выберите подходящую профессиональную траекторию</p>
              </motion.div>
            </div>

            <motion.button 
              onClick={() => {setStage('test'); handleGetQuestion();}}
              className={`
                w-full px-4 py-3 sm:px-6 sm:py-3
                bg-gradient-to-r from-blue-500 to-indigo-600 
                text-white rounded-xl shadow-md
                hover:shadow-xl transform hover:-translate-y-0.5
                transition-all duration-300 text-sm sm:text-base
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                relative overflow-hidden
              `}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Начать тест</span>
              <span className="absolute inset-0 bg-white bg-opacity-20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="hidden sm:block mt-8 text-center text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Пройдите тест за 5-7 минут и получите персонализированные рекомендации
        </motion.div>
      </div>
    );
  };

  const renderTest = () => {
    return (
      <motion.div 
        className={`min-h-screen absolute sm:pt-0 sm:my-0 my-16 px-8 pt-8 inset-0 sm:relative sm:rounded-xl transition-all duration-300 ${
          isDarkMode ? "bg-[#141414] text-white" : "bg-white text-gray-900"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="mb-2 sm:mb-4">
          <span className="font-medium text-xl sm:text-base">
            Осталось вопросов: {questionsData.counts_remaind}
          </span>
        </div>
        <h2 className="text-2xl sm:text-xl font-medium mb-3 sm:mb-4">
          {questionsData.question}
        </h2>
        <textarea
          value={userAnswer.answer}
          onChange={handleAnswerChange}
          className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm sm:text-base"
          placeholder="Введите ваш ответ здесь..."
          rows={4}
        />
        
        <div className="flex justify-between mt-4 sm:mt-8">
          <motion.button 
            onClick={() => {
              handleSendAnswer();
              resetQuestionsData();
              setAnswer({ answer: "" });
              nextQuestion();
              if (questionsData.counts_remaind <= 1) {
                handleEndTest();
                setStage('result');
              }
            }}
            className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:shadow-md transform hover:-translate-y-0.5 transition duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {questionsData.counts_remaind <= 1 ? 'Завершить' : 'Далее'}
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen mx-auto p-4">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
        <div className={`bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 ${
          isDarkMode ? "dark:bg-gray-800 dark:text-white" : ""
        }`}>
          <div className="p-4 sm:p-6">
            {stage === 'welcome' && renderWelcome()}
            {stage === 'test' && renderTest()}
            {stage === 'result' && renderResult()}
          </div>
        </div>
      </div>
    </div>
  );
}