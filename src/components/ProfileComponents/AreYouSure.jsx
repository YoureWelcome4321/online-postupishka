import React from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

export default function AreYouSure({
  onClose,
  onConfirm,
  message = "Вы уверены?",
  fullScreen = false,
}) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isDarkMode 
          ? "bg-[rgba(13,13,13,0.8)]" 
          : "bg-[rgba(255,255,255,0.8)]"
      }`}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 15 }}
        className={`relative rounded-2xl shadow-2xl overflow-hidden ${
          isDarkMode 
            ? "bg-[#1a1a1a] text-white" 
            : "bg-white text-gray-900"
        } ${fullScreen ? "w-full max-w-md" : "w-full max-w-md"}`}
      >
        {/* Анимированная полоска сверху */}
        <div className={`absolute top-0 left-0 w-full h-1 ${isDarkMode? 'bg-[#6e7bf2]' : 'bg-blue-500'}`}></div>
        
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 text-center">{message}</h3>
          <p className="text-lg font-md mb-2 text-center">После удаления восстановить профиль не получится</p>
          
          <div className="flex justify-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onConfirm}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isDarkMode 
                  ? "bg-[#6e7bf2] hover:bg-[#5a67d8] text-white" 
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              
              
            >
              Да
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                isDarkMode 
                  ? "bg-red-600 hover:bg-red-700 text-white" 
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              Отмена
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}