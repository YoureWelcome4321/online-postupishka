// pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { CgSmileMouthOpen , CgSmileNeutral  , CgSmileSad} from "react-icons/cg";
import { PiSmileyAngry } from "react-icons/pi";

const HomePage = () => {
  return (

    <div className="bg-[#f6f6f6] h-screen">
      <Header/>
      <header className="p-4 bg-[#fff] ">
        <h1 className="text-2xl font-bold">Здравствуйте, Анна!</h1>
        <p className="text-lg">Как Ваше настроение сегодня?</p>
        <div className="flex justify-around mt-4">
          {/* Эмодзи для выбора настроения */}
          <button className="bg-gray-200  text-5xl cursor-pointer rounded-full p-2">
            <CgSmileMouthOpen />
          </button>
          <button className="bg-gray-200  text-5xl cursor-pointer rounded-full p-2">
            <CgSmileNeutral />
          </button>
          <button className="bg-gray-200  text-5xl cursor-pointer rounded-full p-2">
            <CgSmileSad />
          </button>
          <button className="bg-gray-200  text-5xl cursor-pointer rounded-full p-2">
            <PiSmileyAngry />
          </button>
        </div>
      </header>

      {/* Основное содержимое */}
      <main className="p-4 flex flex-col gap-4">
        {/* Кнопка "Пройти быстрый тест" */}
        <Link to="/test" className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Пройти быстрый тест</h2>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75S6.615 21.75 12 21.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 9a3 3 0 100 6 3 3 0 000-6zm0 8.25a.75.75 0 01.75.75h5.659l-2.33-2.329a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 01-1.06 1.06l-4.5-4.5A.75.75 0 0112 17.25z" clip-rule="evenodd" />
          </svg>
        </Link>

        {/* Кнопка "Задать вопрос" */}
        <Link to="/ask-question" className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Задать вопрос</h2>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75S6.615 21.75 12 21.75s9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12 9a3 3 0 100 6 3 3 0 000-6zm0 8.25a.75.75 0 01.75.75h5.659l-2.33-2.329a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 01-1.06 1.06l-4.5-4.5A.75.75 0 0112 17.25z" clip-rule="evenodd" />
          </svg>
        </Link>
      </main>
      </div>
  );
}

export default HomePage