import React from "react";
import { motion } from 'framer-motion';

const DolphinAnimation = () => {
  return (
    <motion.div
      className="absolute w-24 md:w-36 lg:w-48 z-1"
      initial={{ x: '100%', rotate: 0 }} // Начальная позиция за правым краем экрана
      animate={{ 
        x: '-100%', // Конечная позиция за левым краем экрана
        rotate: 360 // Полный оборот вокруг своей оси
      }}
      transition={{
        duration: 8, // Длительность анимации (время прохода через экран)
        repeat: Infinity, // Бесконечное повторение
        ease: 'linear' // Линейное движение
      }}
    >
      {/* Изображение дельфина */}
      <img 
        src="/dolphin.png" // Убедитесь, что файл с изображением дельфина находится в папке public
        alt="Dolphin Animation" 
        className="w-full z-10" 
      />
    </motion.div>
  );
};



export default DolphinAnimation;