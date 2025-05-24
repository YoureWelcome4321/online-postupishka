import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { ThemeContext } from "../ThemeContext";
import { IoIosSend } from "react-icons/io";
import { motion } from "framer-motion";

const Psychologist = ({ onClose = () => {} }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    handleGetChat();
  }, []);


  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => handleBotResponse(input), 300);
  };

 
  const handleQuickReply = (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setTimeout(() => handleBotResponse(text), 300);
  };

 
  const handleBotResponse = async (query) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://api.online-postupishka.ru/psychologist ",
        { question: query },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const botMessage = {
        id: Date.now(),
        text: response.data.answer || "Извините, не удалось получить ответ.",
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Ошибка получения ответа от психолога:", error);
      const errorMessage = {
        id: Date.now(),
        text: "Ошибка сети. Попробуйте позже.",
        sender: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };


  const handleGetChat = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://api.online-postupishka.ru/psychologist ",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const chatHistory = response.data.map((msg) => ({
        id: Date.now() + Math.random(), 
        text: msg.content,
        sender: msg.role === "assistant" ? "assistant" : "user",
      }));

      if (chatHistory.length === 0) {
        chatHistory.push({
          id: Date.now(),
          text: "Здравствуй, я твой персональный психолог. Расскажи, что тебя тревожит?",
          sender: "bot",
          quickReplies: ["Стресс", "Проблемы в школе", "Нехватка времени", "Выгорание"],
        });
      }

      setMessages(chatHistory);
    } catch (error) {
      console.error("Ошибка загрузки истории чата:", error);
      setMessages([
        {
          id: Date.now(),
          text: "Не удалось загрузить историю. Попробуйте позже.",
          sender: "bot",
        },
      ]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`absolute ${
        isDarkMode ? "text-white bg-[#141414]" : "text-[#41384b] bg-[#f6f6f6] sm:bg-white"
      } mt-18 sm:mt-4 rounded-xl inset-0 sm:relative w-full max-w-2xl mx-auto sm:p-6`}
    >
      <div className={`rounded-xl ${isDarkMode ? "bg-[#141414]" : "bg-[#f6f6f6]"} overflow-hidden`}>
        <div className="flex px-6 py-4">
          <h2 className="text-2xl font-semibold">Ваш психолог:</h2>
          <motion.button
            className="p-2 ml-auto rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
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

        {/* Чат */}
        <div ref={chatBoxRef} className="min-h-[57vh] px-4 pb-4 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 ${
                msg.sender === "user" ? "flex justify-end" : "flex justify-start"
              }`}
            >
              <div
                className={`rounded-xl ${
                  msg.sender === "user"
                    ? isDarkMode
                      ? "bg-[#615fff] text-white"
                      : "bg-[#155dfc] text-white"
                    : isDarkMode
                    ? "bg-[#222222] shadow-sm"
                    : "bg-white shadow-sm"
                } max-w-[70%] px-4 py-3`}
              >
                {msg.text}
                {msg.quickReplies && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className={`${
                          isDarkMode ? "bg-[#615fff]" : "bg-[#155dfc]"
                        } text-white px-4 py-1 rounded-full hover:bg-indigo-100 transition-colors`}
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Поле ввода */}
        <div className="mb-18">
          <div
            className={`p-4 ${
              isDarkMode ? "bg-[#222222] text-white" : "bg-white text-[#363e45]"
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите ваше сообщение..."
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSendMessage}
                className={`${
                  isDarkMode ? "bg-[#615fff]" : "bg-[#155dfc]"
                } text-white p-3 rounded-full transition-colors`}
              >
                <IoIosSend className="text-3xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Psychologist;