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
    const scrollChatToBottom = () => {
      if (chatBoxRef.current) {
        setTimeout(() => {
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }, 50);
      }
    };

    scrollChatToBottom();
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
        `${import.meta.env.VITE_API}/psychologist`,
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
        `${import.meta.env.VITE_API}/psychologist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const chatHistory = response.data.map((msg) => ({
        id: Date.now() + Math.random(),
        text: msg.content,
        sender: msg.role === "assistant" ? "bot" : "user",
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
      className={`sm:min-h-screen min-[1025px]:mb-6 sm:rounded-xl min-[1025px]:w-[100%] absolute ${
        isDarkMode ? "text-white bg-[#141414]" : "text-[#41384b] bg-[#f6f6f6] sm:bg-white"
      } mt-18 min-[1025px]:mt-4 min-[1025px]:max-w-2xl rounded-xl inset-0 min-[1025px]:relative w-full mx-auto h-screen sm:h-auto min-[1025px]:max-h-[90vh] flex flex-col`}
    >
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

      {/* Контейнер с чатом */}
      <div
        ref={chatBoxRef}
        className="flex-1 overflow-y-auto px-4 pb-24 sm:pb-4"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
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
                      } text-white px-4 py-1 rounded-full hover:bg-[#3d37f0] transition-colors`}
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
      <div
        className={`mb-18 min-[1025px]:mb-0 min-[1025px]:static fixed bottom-0 left-0 right-0 p-4 border-t ${
          isDarkMode ? "bg-[#222222] border-gray-700" : "bg-white border-gray-200"
        } z-10 transition-all duration-300`}
      >
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Введите ваше сообщение..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className={`flex-1 p-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isDarkMode
                ? "bg-[#1a1a1a] border-gray-600 text-white"
                : "bg-gray-100 border-gray-300"
            }`}
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
    </motion.div>
  );
};

export default Psychologist;