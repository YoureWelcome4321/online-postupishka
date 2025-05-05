import React, { useState } from "react";
import HeaderNoButton from "./HeaderNoButtons";
import { FaGraduationCap, FaRegLightbulb, FaChartLine } from 'react-icons/fa';

export default function Profession() {
  const [stage, setStage] = useState('welcome'); // welcome, test, result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [progress, setProgress] = useState(0);

  // Список вопросов
  const questions = [
    "Какие виды деятельности вызывают у вас интерес?",
    "Какие предметы в школе вам давались легче всего?",
    "Какие качества вы цените в себе больше всего?",
    "Что бы вы хотели изменить в мире вокруг себя?",
    "Какие профессии ваших родственников/друзей вызывают у вас уважение?",
    "Какие у вас есть хобби и чем они вам нравятся?",
    "Какой тип работы вы представляете для себя в будущем?",
    "Какие навыки вы хотели бы развить в ближайшие 5 лет?",
    "Как вы представляете свой идеальный рабочий день?",
    "Что для вас важнее всего в профессиональной деятельности?"
  ];

  // Обработчик ввода ответа
  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentQuestion]: e.target.value
    });
    
    // Обновляем прогресс
    const filledAnswers = Object.values(answers).filter(answer => answer.trim()).length;
    setProgress(Math.round((filledAnswers / questions.length) * 100));
  };

  // Переход к следующему вопросу
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage('result');
    }
  };

  // Переход к предыдущему вопросу
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Отображение результата
  const renderResult = () => {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Ваш профориентационный портрет</h2>
          <p className="text-gray-600">На основе ваших ответов</p>
        </div>

        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <p className="font-medium text-gray-800">Вопрос {index + 1}:</p>
              <p className="text-gray-700 mt-1 italic">"{q}"</p>
              <p className="text-gray-900 mt-2 font-medium">Ваш ответ: {answers[index] || "Не отвечено"}</p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
          <h3 className="text-xl font-semibold text-blue-800 mb-3">Анализ вашего потенциала</h3>
          <p className="text-gray-700 mb-4">
            На основе ваших ответов можно сделать вывод, что вы склонны к профессиям, 
            связанным с вашими интересами и сильными сторонами. Ваши ключевые склонности:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Любовь к знаниям и обучению</li>
            <li>Склонность к аналитической деятельности</li>
            <li>Творческий подход к решению задач</li>
            <li>Стремление к социальному взаимодействию</li>
          </ul>
          <p className="text-gray-700 mt-4">
            Рекомендуется обсудить полученные результаты с профессиональным психологом для более точной 
            интерпретации и составления индивидуального плана развития.
          </p>
        </div>
      </div>
    );
  };

  // Приветственный экран
  const renderWelcome = () => {
    return (
      <div className="text-center space-y-6 py-8">
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-full text-white">
            <FaGraduationCap size={40} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800">Профориентационный тест</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <p className="text-gray-700 mb-4">
            Этот тест поможет вам лучше понять свои профессиональные склонности и интересы.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 flex justify-center mb-2">
                <FaRegLightbulb size={24} />
              </div>
              <p className="text-sm text-center">Определите свои сильные стороны</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 flex justify-center mb-2">
                <FaChartLine size={24} />
              </div>
              <p className="text-sm text-center">Оцените свои потенциальные возможности</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-purple-600 flex justify-center mb-2">
                <FaGraduationCap size={24} />
              </div>
              <p className="text-sm text-center">Выберите подходящую профессиональную траекторию</p>
            </div>
          </div>
          
          <button 
            onClick={() => setStage('test')}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-300"
          >
            Начать тест
          </button>
        </div>
      </div>
    );
  };

  // Экран тестирования
  const renderTest = () => {
    return (
      <div className="space-y-6">
        {/* Прогресс */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="mb-4">
          <span className="font-medium text-gray-700">Вопрос {currentQuestion + 1} из {questions.length}</span>
        </div>
        
        <h2 className="text-xl font-medium text-gray-800 mb-4">{questions[currentQuestion]}</h2>
        
        <textarea
          value={answers[currentQuestion] || ""}
          onChange={handleAnswerChange}
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder="Введите ваш ответ здесь..."
        ></textarea>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className={`px-4 py-2 rounded-lg ${
              currentQuestion === 0 
                ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition duration-200`}
          >
            Назад
          </button>
          
          <button
            onClick={nextQuestion}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow hover:shadow-md transform hover:-translate-y-0.5 transition duration-300"
          >
            {currentQuestion === questions.length - 1 ? "Завершить" : "Далее"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-8">
            {stage === 'welcome' && renderWelcome()}
            {stage === 'test' && renderTest()}
            {stage === 'result' && renderResult()}
          </div>
        </div>
      </div>
    </div>
  );
}