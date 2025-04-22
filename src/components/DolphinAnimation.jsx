import React from "react";
import { motion } from "framer-motion";

function DolphinAnimation() {
  return (
    <div
      style={{

        top: 0,
        left: 0,
        width: "100vw", // 100% ширины viewport
        height: "100vh", // 100% высоты viewport
        overflow: "hidden", // Скрываем всё, что выходит за пределы экрана
        display: "flex",
        justifyContent: "center", // Центрируем по горизонтали
        alignItems: "center", // Центрируем по вертикали
      }}
    >
      <motion.img
        src="/dolphin.png"
        initial={{ x: "-100%", rotate: 0 }} // Начинаем с левой стороны экрана
        animate={{ x: "100%", rotate: 0 }} // Двигаемся к правой стороне экрана
        transition={{
          duration: 5, // Увеличиваем длительность для более плавного движения
          repeat: Infinity,
          repeatType: "loop",
        }}
        style={{
          maxWidth: "100%", // Изображение не будет выходить за пределы экрана
          maxHeight: "100%",
          width: "auto", // Сохраняем пропорции изображения
          height: "auto",
        }}
      />
    </div>
  );
}

export default DolphinAnimation;