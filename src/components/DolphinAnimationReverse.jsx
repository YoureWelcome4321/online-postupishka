import React from "react";
import { motion } from 'framer-motion';

const DolphinAnimationReverse = () => {
  return (
    <motion.div
      className=" mt-2  w-7 md:w-13 lg:w-14 z-1"
      initial={{ x: '0',rotate: 0 }} // Начальная позиция за левым краем экрана
      animate={{ 
        rotate: -360 // Полный оборот вокруг своей оси в обратную сторону
      }}
      transition={{
        duration: 8, // Длительность анимации (время прохода через экран)
        repeat: Infinity, // Бесконечное повторение
        ease: 'linear' // Линейное движение
      }}
    >
      {/* Изображение дельфина */}
      <img 
        src="/logo1.png" // Убедитесь, что файл с изображением дельфина находится в папке public
        alt="Dolphin Animation Reverse" 
        className="w-full" 
      />
    </motion.div>
  );
};

export default DolphinAnimationReverse;