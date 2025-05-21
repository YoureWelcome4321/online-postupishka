import React from "react";
import { motion } from 'framer-motion';

const DolphinAnimationReverse = () => {
  return (
    <motion.div
      className=" mt-2  w-8 sm:w-5 md:w-13 lg:w-14 z-1"
      initial={{ x: '0',rotate: 0 }} 
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
        src="/dolphin.png"
        alt="Dolphin Animation Reverse" 
        className=" sm:w-12" 
      />
    </motion.div>
  );
};

export default DolphinAnimationReverse;