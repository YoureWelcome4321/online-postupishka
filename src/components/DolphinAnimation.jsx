import React from "react";
import { motion } from 'framer-motion';

const DolphinAnimation = () => {
  return (
    <motion.div
      className="absolute w-18 md:w-36 lg:w-48 z-10"
      initial={{
        x: Math.random() * window.innerWidth - 100, // Случайная начальная позиция по X
        y: Math.random() * window.innerHeight - 100, // Случайная начальная позиция по Y
        rotate: 0,
      }}
      animate={{
        x: Math.random() * window.innerWidth - 100, // Случайная конечная позиция по X
        y: Math.random() * window.innerHeight - 100, // Случайная конечная позиция по Y
        rotate: 360, // Полный оборот вокруг своей оси
      }}
      transition={{
        duration: 5, // Длительность анимации
        repeat: Infinity, // Бесконечное повторение
        ease: 'linear', // Линейное движение
      }}
    >
      {/* Изображение дельфина */}
      <img
        src="/dolphin.png" // Убедитесь, что файл с изображением дельфина находится в папке public
        alt="Flying Dolphin Animation"
        className="w-full"
      />
    </motion.div>
  );
};

export default DolphinAnimation;