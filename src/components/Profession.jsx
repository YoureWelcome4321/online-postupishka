import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ThemeContext } from "../ThemeContext";
import { Result } from "./ProfessionComponents/ResultProfession";
import { Welcome } from "./ProfessionComponents/WelcomeProfession";

export default function Profession({ onClose = () => {} }) {
  const { isDarkMode } = useContext(ThemeContext);
  const [questionsData, setQuestionsData] = useState({
    question: "",
    counts_remaind: 0,
  });

  const [showWelcome, setShowWelcome] = useState(true);
  const [userAnswer, setAnswer] = useState({ answer: "" });
  const [stage, setStage] = useState("welcome");
  const [results, setResults] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("idle"); 
  const [pollingInterval, setPollingInterval] = useState(null);

  const handleAnswerChange = (e) => {
    const { value } = e.target;
    setAnswer((prev) => ({ ...prev, answer: value }));
  };

  const handleGetQuestion = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API}/specialization/question`, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setQuestionsData(response.data);
    } catch (error) {
      if (error.response?.status === 400) {
        setStage("result");
        setLoadingStatus("success");
      }
    }
  };

  const handleSendAnswer = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API}/specialization/answer`, 
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
    setLoadingStatus("loading");

    const interval = setInterval(async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/specialization/result`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.status === "done") {
          clearInterval(interval);
          setResults(res.data.result || []);
          setLoadingStatus("success");
          setPollingInterval(null);
        }
      } catch (error) {
        clearInterval(interval);
        console.error("Ошибка опроса результата:", error);
        setLoadingStatus("error");
        setPollingInterval(null);
      }
    }, 30000);

    setPollingInterval(interval);
  };

  useEffect(() => {
    return () => {
      if (pollingInterval) clearInterval(pollingInterval);
    };
  }, [pollingInterval]);

  const renderResult = () => {
    return (
      <Result
        results={results}
        loadingStatus={loadingStatus}
        onClose={onClose}
      />
    );
  };

  const renderWelcome = () => {
    return (
      showWelcome && (
        <Welcome
          setStage={setStage}
          handleGetQuestion={handleGetQuestion}
          onClose={onClose}
        />
      )
    );
  };

  const renderTest = () => {
    return (
      <motion.div
        className={`min-h-screen absolute sm:pt-0 sm:my-0 my-18 px-8 pt-8 inset-0 sm:relative sm:rounded-xl transition-all duration-300 ${
          isDarkMode ? "bg-[#141414] text-white" : "bg-white text-gray-900"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        

        <div className=" flex mb-2 sm:mb-4">
          <span className="font-medium text-xl sm:text-base">
            Осталось вопросов: {questionsData.counts_remaind}
          </span>

          <motion.button
          className="ml-auto rounded-full transition-colors"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 float-right w-5 sm:h-6 sm:w-6"
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

        <h2 className="text-2xl sm:text-xl font-medium mb-6 sm:mb-4">
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
            onClick={async () => {
              await handleSendAnswer();
              setAnswer({ answer: "" });

              if (questionsData.counts_remaind > 1) {
                handleGetQuestion();
              } else {
                handleEndTest(); 
                setStage("result");
              }
            }}
            className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:shadow-md transform hover:-translate-y-0.5 transition duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {questionsData.counts_remaind <= 1 ? "Завершить" : "Далее"}
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen mx-auto p-4">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <div className="min-h-screen max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl">
        <div
          className={`rounded-2xl overflow-hidden ${
            isDarkMode ? "bg-[#141414]" : "bg-white"
          }`}
        >
          <div className="w-full p-4 sm:p-6">
            {stage === "welcome" && renderWelcome()}
            {stage === "test" && renderTest()}
            {stage === "result" && renderResult()}
          </div>
        </div>
      </div>
    </div>
  );
}