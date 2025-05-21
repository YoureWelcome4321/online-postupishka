import React, { useState, useEffect, useRef } from 'react';

const Psychologist = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: 'Здравствуйте! Я ваш виртуальный психолог. Вот популярные темы для обсуждения:',
        sender: 'bot',
        quickReplies: ['Стресс перед экзаменом', 'Проблемы в школе', 'Нехватка времени', 'Выгорание']
      }
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
        sender: 'user'
      };
      setMessages(prev => [...prev, newMessage]);
      setInput('');
      setTimeout(() => handleBotResponse(input), 500);
    }
  };

  const handleQuickReply = (text) => {
    const newMessage = {
      id: Date.now(),
      text: text,
      sender: 'user'
    };
    setMessages(prev => [...prev, newMessage]);
    setTimeout(() => handleBotResponse(text), 500);
  };

  const handleBotResponse = (query) => {
    const botResponse = {
      id: Date.now() + 1,
      text: `Спасибо, что поделились. Давайте разберемся с вашим запросом: "${query}". Как вы оцениваете текущую ситуацию?`,
      sender: 'bot'
    };
    setMessages(prev => [...prev, botResponse]);
  };

  return (
    <div className=" text-black absolute my-18 inset-0 sm:relative sm:mx-auto sm:my-4 sm:w-[50%]  flex items-center">
      <div className="w-full max-w-2xl mx-auto  sm:p-6">
        <div className="bg-[#f6f6f6] rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className=" text-black bg-white px-6 py-4">
            <h2 className="text-2xl font-semibold">Ваш психолог:</h2>
          </div>

          {/* Chat box */}
          <div 
            ref={chatBoxRef}
            className="h-[60vh] sm:h-[70vh] px-6 pb-4 overflow-y-auto"
          >
            {messages.map(msg => (
              <div 
                key={msg.id}
                className={`my-2 ${
                  msg.sender === 'user' ? 'flex justify-end' : 'flex justify-start'
                }`}
              >
                <div 
                  className={`${
                    msg.sender === 'user' 
                      ? 'bg-indigo-100 text-indigo-800 rounded-tl-3xl rounded-bl-3xl' 
                      : 'bg-white shadow-sm rounded-tr-3xl rounded-br-3xl'
                  } max-w-[70%] px-4 py-3`}
                >
                  {msg.text}
                  {msg.quickReplies && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.quickReplies.map((reply, index) => (
                        <button 
                          key={index}
                          onClick={() => handleQuickReply(reply)}
                          className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors"
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

          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Введите ваше сообщение..."
                className="flex-1 p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button 
                onClick={handleSendMessage}
                className="bg-indigo-500 text-white p-3 rounded-full hover:bg-indigo-600 transition-colors"
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
      </div>
    </div>
  );
};

export default Psychologist;