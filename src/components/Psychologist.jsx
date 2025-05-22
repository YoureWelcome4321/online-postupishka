import React, { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import {motion} from "framer-motion"

const Psychologist = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const { isDarkMode } = useContext(ThemeContext);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: "У тебя есть проблема, поговорим об этом, вас встречает лига опасного интернета",
        sender: "bot",
        quickReplies: [
          "Стресс перед экзаменом",
          "Проблемы в школе",
          "Нехватка времени",
          "Выгорание",
        ],
      },
    ]);
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now(),
        text: input,
        sender: "user",
      };
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
      setTimeout(() => handleBotResponse(input), 500);
    }
  };

  const handleQuickReply = (text) => {
    const newMessage = {
      id: Date.now(),
      text: text,
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setTimeout(() => handleBotResponse(text), 500);
  };

  const handleBotResponse = (query) => {
    const botResponse = {
      id: Date.now() + 1,
      text: `cjjcjcjcicji`,
      sender: "bot",
    };
    setMessages((prev) => [...prev, botResponse]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`absolute ${
        isDarkMode ? "text-white bg-[#141414]" : "text-[#41384b] bg-[#f6f6f6]"
      } mt-18 inset-0 sm:relative my-18 w-full max-w-2xl  mx-auto  sm:p-6`}
    >
      <div className="   rounded-xl shadow-lg overflow-hidden">
        <div
          className={`${
            isDarkMode ? " bg-[#141414]" : "bg-[#f6f6f6]"
          } px-6 py-4`}
        >
          <h2 className="text-2xl  font-semibold">Ваш психолог:</h2>
        </div>

        {/* Chat box */}
        <div
          ref={chatBoxRef}
          className="  min-h-[67vh] px-4 pb-4 overflow-y-auto"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`my-4 ${
                msg.sender === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }`}
            >
              <div
                className={` rounded-xl ${
                  msg.sender === "user"
                    ? isDarkMode ? "bg-[#615fff] " : "bg-[#155dfc] text-white"
                    : isDarkMode
                    ? "bg-[#222222] shadow-sm rounded-xl"
                    : "bg-white shadow-sm rounded-xl "
                } max-w-[70%] px-4 py-3`}
              >
                {msg.text}
                {msg.quickReplies && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.quickReplies.map((reply, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(reply)}
                        className={`${isDarkMode ? 'bg-[#615fff]' : 'bg-[#155dfc]'} text-white px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors`}
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

        <div
          className={`p-4 ${
            isDarkMode ? " bg-[#222222]" : "bg-[#fff]"
          } border-t border-gray-200`}
        >
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Введите ваше сообщение..."
              className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              className={`${isDarkMode ? 'bg-[#615fff]' : 'bg-[#155dfc]'} text-white p-3 rounded-full transition-colors`}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22 2L11 13M22 2l-7 21-4-9-9-4 21-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Psychologist;
